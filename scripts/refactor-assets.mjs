#!/usr/bin/env node

/**
 * Скрипт для рефакторинга изображений из exports в структурированные папки
 */

import { mkdir, copyFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const exportsDir = path.join(rootDir, 'assets', 'exports');

// Маппинг файлов на новые пути
const fileMapping = {
  // Онбординг - стили
  'export-I28-1690-28-1680-1762619687795.png': 'assets/onboarding/styles/realistic.png',
  'export-I28-1695-28-1684-1762619688776.png': 'assets/onboarding/styles/anime.png',
  
  // Онбординг - национальности
  'export-I30-2077-30-1948-1762619702781.png': 'assets/onboarding/ethnicity/caucasian.png',
  'export-I30-2078-30-1958-1762619703491.png': 'assets/onboarding/ethnicity/asian.png',
  'export-I30-2079-30-1958-1762619703772.png': 'assets/onboarding/ethnicity/arab.png',
  'export-I30-2080-30-1958-1762619704286.png': 'assets/onboarding/ethnicity/african.png',
  'export-I30-2081-30-1958-1762619704787.png': 'assets/onboarding/ethnicity/latina.png',
  
  // Онбординг - типы тела
  'export-I30-2820-30-2558-1762619705109.png': 'assets/onboarding/body/slim.png',
  'export-I30-2821-30-2553-1762619706736.png': 'assets/onboarding/body/athletic.png',
  'export-I30-2822-30-2553-1762619705830.png': 'assets/onboarding/body/curvy.png',
  'export-I30-2823-30-2553-1762619713299.png': 'assets/onboarding/body/thicc.png',
  
  // Онбординг - размер груди
  'export-I30-2798-30-2563-1762619713880.png': 'assets/onboarding/breast/small.png',
  'export-I30-2799-30-2563-1762619714801.png': 'assets/onboarding/breast/medium.png',
  'export-I30-2800-30-2563-1762619715845.png': 'assets/onboarding/breast/large.png',
  'export-I30-2801-30-2563-1762619715171.png': 'assets/onboarding/breast/huge.png',
  
  // Онбординг - размер попы
  'export-I30-2776-30-2563-1762619716539.png': 'assets/onboarding/booty/small.png',
  'export-I30-2777-30-2563-1762619717487.png': 'assets/onboarding/booty/medium.png',
  'export-I30-2778-30-2563-1762619717457.png': 'assets/onboarding/booty/athletic.png',
  'export-I30-2779-30-2563-1762619718208.png': 'assets/onboarding/booty/large.png',
  
  // Онбординг - стили волос
  'export-I30-3344-30-3134-1762619738429.png': 'assets/onboarding/hair-style/straight.png',
  'export-I30-3345-30-3134-1762619739278.png': 'assets/onboarding/hair-style/wavy.png',
  'export-I30-3346-30-3134-1762619738684.png': 'assets/onboarding/hair-style/braids.png',
  'export-I30-3348-30-3134-1762619739326.png': 'assets/onboarding/hair-style/bun.png',
  'export-I30-3349-30-3134-1762619740358.png': 'assets/onboarding/hair-style/curly.png',
  'export-I30-3350-30-3134-1762619740430.png': 'assets/onboarding/hair-style/ponytail.png',
  
  // Онбординг - цвета волос
  'export-I30-3379-30-3134-1762619747713.png': 'assets/onboarding/hair-color/black.png',
  'export-I30-3380-30-3134-1762619748682.png': 'assets/onboarding/hair-color/brunette.png',
  'export-I30-3381-30-3134-1762619749210.png': 'assets/onboarding/hair-color/blonde.png',
  'export-I30-3383-30-3134-1762619750685.png': 'assets/onboarding/hair-color/pink.png',
  'export-I30-3384-30-3134-1762619750042.png': 'assets/onboarding/hair-color/redhead.png',
  
  // Онбординг - цвета глаз
  'export-I30-3407-30-3134-1762619751569.png': 'assets/onboarding/eye-color/brown.png',
  'export-I30-3408-30-3134-1762619751561.png': 'assets/onboarding/eye-color/blue.png',
  'export-I30-3409-30-3134-1762619752169.png': 'assets/onboarding/eye-color/green.png',
  
  // Онбординг - превью
  'export-30-4178-1762619753139.png': 'assets/onboarding/preview/realistic-preview.png',
  'export-25-1010-1762619754145.png': 'assets/onboarding/preview/ethnicity-preview.png',
  
  // Фон
  'bg.png': 'assets/onboarding/bg.png',
  
  // Иконки
  'export-15-242-1762542927731.png': 'assets/icons/phone.png',
  'export-15-282-1762542928511.png': 'assets/icons/fire.png',
  'export-58-1451-1762542938494.png': 'assets/icons/clock.png',
  'export-I15-289-15-871-1762542929617.png': 'assets/icons/send.png',
  'export-15-265-1762542939637.png': 'assets/icons/ai.png',
  'export-I15-285-15-869-1762542928704.png': 'assets/icons/image-add.png',
  'export-58-1456-1762542938656.png': 'assets/icons/picture.png',
  'export-I59-4863-59-4413-1762544040925.png': 'assets/icons/mic-off.png',
  'export-I59-4879-59-4413-1762544041934.png': 'assets/icons/decline.png',
  'export-59-5105-1762544042161.png': 'assets/icons/lock.png',
  'export-I57-1242-59-4204-1762544484401.png': 'assets/icons/gift.png',
  'export-I57-1245-59-5630-1762544484932.png': 'assets/icons/star.png',
  'export-I15-347-5-870-5-852-1762544484975.png': 'assets/icons/home.png',
  'export-I15-347-5-875-5-852-1762544485513.png': 'assets/icons/explore.png',
  'export-I15-347-5-865-5-855-1762544484727.png': 'assets/icons/chat.png',
  
  // Профили
  'export-I4-108-4-179-1762536492757.png': 'assets/profiles/profile-1.png',
  'export-I4-109-4-179-1762536494636.png': 'assets/profiles/profile-2.png',
  'export-I4-110-4-179-1762536496568.png': 'assets/profiles/profile-3.png',
  'export-I4-111-4-179-1762536497433.png': 'assets/profiles/profile-4.png',
  'export-4-59-1762536492131.png': 'assets/profiles/banner.png',
  
  // Explore
  'export-I4-141-4-149-1762536511287.png': 'assets/explore/explore-1.png',
  
  // Chats
  'export-15-356-1762536514267.png': 'assets/chats/chat-1.png',
  'export-15-372-1762536514696.png': 'assets/chats/chat-2.png',
  'export-15-388-1762536515140.png': 'assets/chats/chat-3.png',
};

async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

async function refactorAssets() {
  console.log('🚀 Начинаю рефакторинг ассетов...\n');
  
  let copied = 0;
  let skipped = 0;
  
  for (const [oldFile, newPath] of Object.entries(fileMapping)) {
    const oldPath = path.join(exportsDir, oldFile);
    const newFullPath = path.join(rootDir, newPath);
    const newDir = path.dirname(newFullPath);
    
    if (!existsSync(oldPath)) {
      console.log(`⚠️  Файл не найден: ${oldFile}`);
      skipped++;
      continue;
    }
    
    try {
      await ensureDir(newDir);
      await copyFile(oldPath, newFullPath);
      console.log(`✅ ${oldFile} → ${newPath}`);
      copied++;
    } catch (error) {
      console.error(`❌ Ошибка при копировании ${oldFile}:`, error.message);
      skipped++;
    }
  }
  
  console.log(`\n✨ Готово! Скопировано: ${copied}, Пропущено: ${skipped}`);
  console.log('\n📝 Теперь нужно обновить пути в коде.');
}

refactorAssets().catch(console.error);

