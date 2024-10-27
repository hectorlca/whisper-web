const config = require('config');

module.exports = {
  WATCH_DIRECTORIES: config.get('WATCH_DIRECTORIES'),
  OUTPUT_DIRECTORY: config.get('OUTPUT_DIRECTORY'),
  ALLOWED_EXTENSIONS: config.get('ALLOWED_EXTENSIONS').split(','),
  GPU_MEMORY_LIMIT: config.get('GPU_MEMORY_LIMIT'),
  // ... other configurations ...
};
