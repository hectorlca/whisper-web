import ffmpeg from './ffmpeg.js';
import { pipeline } from '@huggingface/transformers';

// Cache for the transcription pipeline
let transcriptionPipeline = null;

async function initializeTranscriptionPipeline() {
    if (!transcriptionPipeline) {
        transcriptionPipeline = await pipeline('automatic-speech-recognition', 'openai/whisper-small', {
            // Use CPU for server-side transcription
            device: 'cpu',
            // You can adjust model parameters here
            chunk_length_s: 30,
            stride_length_s: 5,
            return_timestamps: true
        });
    }
    return transcriptionPipeline;
}

export async function transcribeAudio(filePath) {
    try {
        // Extract audio to WAV format if needed
        const audioPath = await ffmpeg.extractAudio(filePath);
        
        // Initialize the pipeline
        const pipeline = await initializeTranscriptionPipeline();
        
        // Perform transcription
        const result = await pipeline(audioPath, {
            task: 'transcribe',
            return_timestamps: true
        });

        return {
            text: result.text,
            chunks: result.chunks,
            timestamps: result.timestamps
        };
    } catch (error) {
        console.error('Transcription error:', error);
        throw error;
    }
}
