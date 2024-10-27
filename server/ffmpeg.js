import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractAudio(filePath) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, '../output', `${path.basename(filePath, path.extname(filePath))}.wav`);
    ffmpeg(filePath)
      .noVideo()
      .audioCodec('pcm_s16le')
      .format('wav')
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', err => reject(err));
  });
}

export default { extractAudio };
