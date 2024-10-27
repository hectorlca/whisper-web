const ffmpeg = require('./ffmpeg');

class Queue {
  constructor() {
    this.queue = [];
    this.processing = false;
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
      const audio = await ffmpeg.extractAudio(filePath);
      // Add transcription logic here
      // Notify via WebSocket
    } catch (error) {
      console.error('Processing error:', error);
      // Retry mechanism or fallback processing
    } finally {
      this.processing = false;
      this.processQueue();
    }
  }
}

module.exports = new Queue();
