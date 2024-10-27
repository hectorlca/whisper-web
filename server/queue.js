import ffmpeg from './ffmpeg.js';
import { broadcastMessage } from './websocket.js';
import Queue from 'bull';
import { transcribeAudio } from './transcription.js';  // Make sure this import matches the export

const transcriptionQueue = new Queue('transcription', {
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

// Process queue items
transcriptionQueue.process(async (job) => {
    try {
        const { filePath } = job.data;
        
        // Update status
        broadcastMessage({
            type: 'TRANSCRIPTION_STATUS',
            payload: {
                filePath,
                status: 'processing'
            }
        });

        // Perform transcription
        const result = await transcribeAudio(filePath);

        // Broadcast success
        broadcastMessage({
            type: 'TRANSCRIPTION_COMPLETE',
            payload: {
                filePath,
                transcript: result
            }
        });

        return result;
    } catch (error) {
        console.error('Transcription error:', error);
        broadcastMessage({
            type: 'TRANSCRIPTION_ERROR',
            payload: {
                filePath: job.data.filePath,
                error: error.message
            }
        });
        throw error;
    }
});

export const addToQueue = async (data) => {
    return await transcriptionQueue.add(data);
};

export const queue = transcriptionQueue;
