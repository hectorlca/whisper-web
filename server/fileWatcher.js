import chokidar from 'chokidar';
import path from 'path';
import { addToQueue } from './queue.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure the watch path - we'll get this from environment variables
const WATCH_FOLDER = process.env.WATCH_FOLDER || path.join(__dirname, '../uploads');

// Initialize watcher
const watcher = chokidar.watch(WATCH_FOLDER, {
    ignored: /(^|[\/\\])\../, // ignore hidden files
    persistent: true,
    awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
    }
});

// Add event listeners
watcher
    .on('add', async filePath => {
        const extension = path.extname(filePath).toLowerCase();
        const allowedExtensions = ['.mp3', '.wav', '.m4a', '.ogg'];
        
        if (allowedExtensions.includes(extension)) {
            console.log(`New audio file detected: ${filePath}`);
            await addToQueue({
                filePath,
                type: 'transcription',
                status: 'pending'
            });
        }
    })
    .on('error', error => console.error(`Watcher error: ${error}`));

export default watcher;
