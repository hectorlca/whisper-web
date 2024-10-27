const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function extractAudio(filePath) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join('output', `${path.basename(filePath, path.extname(filePath))}.wav`);
    ffmpeg(filePath)
      .noVideo()
      .audioCodec('pcm_s16le')
      .format('wav')
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', err => reject(err));
  });
}

module.exports = { extractAudio };
