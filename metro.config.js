const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Добавляем поддержку алиасов для модулей и изображений
config.resolver = {
  ...config.resolver,
  alias: {
    '@': path.resolve(__dirname),
  },
  // Кастомный резолвер для алиасов в require()
  resolveRequest: (context, moduleName, platform) => {
    // Если модуль начинается с @/, заменяем на абсолютный путь
    if (moduleName.startsWith('@/')) {
      const filePath = moduleName.replace('@/', path.resolve(__dirname) + '/');
      return context.resolveRequest(context, filePath, platform);
    }
    // Иначе используем стандартный резолвер
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;
