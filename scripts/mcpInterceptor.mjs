#!/usr/bin/env node

/**
 * MCP Interceptor - перехватывает export_node_as_image и качает через API
 * Работает как прозрачный proxy между Cursor и Talk to Figma MCP
 */

import { spawn } from 'child_process';
import { createInterface } from 'readline';
import https from 'https';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANNEL = process.argv[2] || 's1wpbs9l';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;


// Трекинг запросов export_node_as_image
const pendingExports = new Map();

/**
 * Скачивает изображение через Figma API
 */
async function downloadViаAPI(nodeId, format = 'PNG', scale = 2) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(nodeId)}&format=${format.toLowerCase()}&scale=${scale}`;
    
    console.error(`[INTERCEPTOR] 📡 Запрос к Figma API для ${nodeId}...`);
    
    https.get(apiUrl, {
      headers: { 'X-Figma-Token': FIGMA_TOKEN }
    }, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', async () => {
        try {
          const json = JSON.parse(data);
          
          if (json.err) {
            console.error(`[INTERCEPTOR] ❌ API ошибка: ${json.err}`);
            reject(new Error(json.err));
            return;
          }
          
          if (!json.images || !json.images[nodeId]) {
            console.error(`[INTERCEPTOR] ❌ Изображение не найдено`);
            reject(new Error('Image URL not found'));
            return;
          }
          
          const imageUrl = json.images[nodeId];
          console.error(`[INTERCEPTOR] 📥 Скачиваю изображение...`);
          
          // Скачиваем изображение
          https.get(imageUrl, (imgResponse) => {
            const chunks = [];
            imgResponse.on('data', chunk => chunks.push(chunk));
            imgResponse.on('end', () => {
              const buffer = Buffer.concat(chunks);
              resolve(buffer);
            });
          }).on('error', reject);
          
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Сохраняет изображение на диск
 */
async function saveImage(nodeId, buffer, format = 'png') {
  // Генерируем имя файла из nodeId
  const sanitized = nodeId.replace(/[^a-zA-Z0-9]/g, '-');
  const timestamp = Date.now();
  const filename = `export-${sanitized}-${timestamp}.${format}`;
  
  // Определяем папку (можно улучшить логику)
  const folder = 'exports';
  
  const targetDir = path.join(__dirname, '../assets', folder);
  await mkdir(targetDir, { recursive: true });
  
  const filepath = path.join(targetDir, filename);
  await writeFile(filepath, buffer);
  
  const size = Math.round(buffer.length / 1024);
  console.error(`[INTERCEPTOR] ✅ Сохранено: ${filename} (${size} KB)`);
  
  return filepath;
}

/**
 * Запускаем MCP сервер и перехватываем его I/O
 */
function startInterceptor() {
  console.error(`[INTERCEPTOR] 🚀 Запуск MCP Interceptor для канала ${CHANNEL}...`);
  console.error(`[INTERCEPTOR] 📋 Figma File Key: ${FIGMA_FILE_KEY}`);
  
  // Запускаем оригинальный MCP сервер
  const mcp = spawn('bunx', ['cursor-talk-to-figma-mcp', CHANNEL], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  // Читаем вывод MCP (stdout)
  const rl = createInterface({
    input: mcp.stdout,
    crlfDelay: Infinity
  });
  
  rl.on('line', async (line) => {
    try {
      const message = JSON.parse(line);
      
      // Проверяем ответ на export_node_as_image
      if (message.id && message.result && pendingExports.has(message.id)) {
        const { nodeId, format, scale } = pendingExports.get(message.id);
        pendingExports.delete(message.id);
        
        console.error(`[INTERCEPTOR] 🎯 Перехвачен export для nodeId: ${nodeId}`);
        
        // Качаем через API в фоне (не блокируем ответ)
        downloadViаAPI(nodeId, format, scale)
          .then(buffer => saveImage(nodeId, buffer, format.toLowerCase()))
          .catch(err => console.error(`[INTERCEPTOR] ❌ Ошибка скачивания: ${err.message}`));
      }
    } catch (e) {
      // Не JSON, игнорируем
    }
    
    // Проксируем дальше в Cursor
    console.log(line);
  });
  
  // Проксируем stderr MCP
  mcp.stderr.on('data', (data) => {
    process.stderr.write(data);
  });
  
  // Читаем ввод от Cursor (stdin)
  const stdinRl = createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  });
  
  stdinRl.on('line', (line) => {
    try {
      const message = JSON.parse(line);
      
      // Перехватываем запросы export_node_as_image
      if (message.method === 'tools/call' &&
          message.params &&
          message.params.name === 'export_node_as_image') {
        
        const args = message.params.arguments || {};
        const nodeId = args.nodeId;
        const format = args.format || 'PNG';
        const scale = args.scale || 2;
        
        if (nodeId) {
          console.error(`[INTERCEPTOR] 📌 Отслеживаю экспорт nodeId: ${nodeId}`);
          pendingExports.set(message.id, { nodeId, format, scale });
        }
      }
    } catch (e) {
      // Не JSON, игнорируем
    }
    
    // Проксируем дальше в MCP
    mcp.stdin.write(line + '\n');
  });
  
  // Обработка закрытия
  mcp.on('close', (code) => {
    console.error(`[INTERCEPTOR] MCP server closed with code ${code}`);
    process.exit(code);
  });
  
  process.on('SIGINT', () => {
    mcp.kill();
    process.exit();
  });
  
  console.error(`[INTERCEPTOR] ✅ Interceptor готов!\n`);
}

startInterceptor();

