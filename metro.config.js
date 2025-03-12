// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS support
  isCSSEnabled: true,
});

// Reduce memory usage by adjusting the max workers
config.maxWorkers = 2;

// Increase the heap size for worker processes
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Add custom resolver options
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
  assetExts: ['ttf', 'otf', 'png', 'jpg', 'jpeg', 'gif', 'webp'],
};

// Optimize caching
config.cacheStores = [];

module.exports = config;