// ... existing imports ...
const chokidar = require('chokidar');
const queue = require('./queue');
const config = require('../config/config');

// Initialize watcher
const watcher = chokidar.watch(config.WATCH_DIRECTORIES.split(','), {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

// Add event listeners
watcher.on('add', filePath => {
  if (config.ALLOWED_EXTENSIONS.includes(filePath.split('.').pop())) {
    queue.add(filePath);
  }
});

// Handle errors
watcher.on('error', error => {
  console.error('Watcher error:', error);
});

// ... additional watcher logic ...
