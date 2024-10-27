export interface Config {
  watchDirectories: string[];
  outputDirectory: string;
  allowedExtensions: string[];
  gpuMemoryLimit: number;
  // ... other shared types ...
}

export interface TranscriptionStatus {
  filePath: string;
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  // ... other status fields ...
}
