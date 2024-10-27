import ffmpeg from './ffmpeg.js';

class Queue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  getStatus() {
    return {
      queueLength: this.queue.length,
      isProcessing: this.processing,
      currentQueue: this.queue
    };
  }

  add(filePath) {
    this.queue.push(filePath);
    this.processQueue();
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    const filePath = this.queue.shift();
    try {
      // Add processing logic here
      console.log('Processing:', filePath);
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      this.processing = false;
      this.processQueue();
    }
  }
}

export const queue = new Queue();
