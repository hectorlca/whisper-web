# Whisper WebGPU

**Whisper WebGPU** is a powerful, ML-powered speech recognition tool that leverages WebGPU for high-performance transcription directly in your browser. This project automates transcription processes with features such as directory watching, batch processing, enhanced output formats, and robust logging, while maintaining existing functionalities like manual file uploads and WebGPU acceleration for AMD GPUs.

## Features

- **Automated Directory Watching and Processing:** Automatically monitor specified directories for new media files and process them for transcription.
- **Manual File Upload:** Retain the ability for users to manually upload files for transcription.
- **WebGPU Acceleration:** Utilize WebGPU for accelerated transcription on AMD GPUs.
- **Batch Processing:** Process multiple files in batches for efficiency.
- **Enhanced Output Formats and Logging:** Generate transcriptions in various formats with detailed logging for tracking and debugging.
- **Real-time Progress Tracking:** Monitor the status of directory watching, processing queues, and batch progress.
- **Robust Error Handling:** Implement retry mechanisms and fallback processing to ensure reliability.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **FFmpeg** installed on your system. You can download it from [FFmpeg Downloads](https://ffmpeg.org/download.html).

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/whisper-webgpu.git
   cd whisper-webgpu
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Build the Project**

   ```bash
   npm run build
   # or
   yarn build
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be accessible at `http://localhost:3000` (default Vite port).

## Configuration

Configuration settings are managed via the `config` module and environment variables.

### Configuration File

The default configurations are located in `config/default.json`. You can modify this file to change default settings.

```json
{
  "WATCH_DIRECTORIES": "dir1,dir2",
  "OUTPUT_DIRECTORY": "output",
  "ALLOWED_EXTENSIONS": "mp4,avi,mov,mp3,wav",
  "GPU_MEMORY_LIMIT": 4096
  // ... other default configurations ...
}
```

### Environment Variables

You can override configurations using environment variables. Create a `.env` file in the root directory and define the variables as needed:

```env
WATCH_DIRECTORIES=dir1,dir2
OUTPUT_DIRECTORY=output
ALLOWED_EXTENSIONS=mp4,avi,mov,mp3,wav
GPU_MEMORY_LIMIT=4096
```

**Available Environment Variables:**

- `WATCH_DIRECTORIES`: Comma-separated list of directories to watch for new files.
- `OUTPUT_DIRECTORY`: Directory where transcribed files will be saved.
- `ALLOWED_EXTENSIONS`: Comma-separated list of file extensions to process.
- `GPU_MEMORY_LIMIT`: Maximum GPU memory allocation in MB.

## Usage

### Automated Directory Watching

The application monitors specified directories for new media files and automatically processes them for transcription.

1. **Specify Watch Directories:** Update the `WATCH_DIRECTORIES` in `config/default.json` or via environment variables with the paths you want to monitor.

2. **Start the Server:**

   The directory watcher runs as part of the server. Ensure that the server is running.

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Add Files to Watched Directories:**

   Place your media files (e.g., `.mp4`, `.avi`, `.mov`, `.mp3`, `.wav`) into the monitored directories. The application will automatically detect and process them.

### Manual File Upload

Users can manually upload files through the web interface for transcription.

1. **Access the Application:**

   Open `http://localhost:3000` in your browser.

2. **Upload Files:**

   Use the file upload interface to select and upload files for transcription.

### Batch Processing

The application supports batch processing of multiple files, enhancing efficiency and throughput.

### Real-time Progress Tracking

Monitor the status of directory watching, processing queues, and batch progress through the user interface.

## Project Structure

```plaintext
whisper-web/
├── src/
│   ├── worker.js               # Core WebGPU transcription logic
│   ├── App.tsx                 # Main application component
│   ├── components/
│   │   ├── AudioManager.tsx    # Audio processing component
│   │   ├── Transcript.tsx      # Transcription display/export
│   │   ├── Config.tsx          # Configuration interface
│   │   ├── DirectoryStatus.tsx # Directory watching status display
│   │   ├── QueueStatus.tsx     # File processing queue status display
│   │   └── BatchProgress.tsx   # Batch processing progress indicators
│   └── hooks/
│       └── useTranscriber.ts   # Transcription hook
├── server/
│   ├── watcher.js              # Directory monitoring service
│   ├── queue.js                # File processing queue
│   ├── ffmpeg.js               # Audio extraction utilities
│   └── config.js               # Service configuration
├── shared/
│   └── types.ts                # Shared type definitions
├── config/
│   └── default.json            # Default configuration file
├── package.json
├── vite.config.ts
└── README.md
```

## Dependencies

The project relies on several dependencies to enable its functionalities:

- **Core Dependencies:**
  - `@huggingface/transformers`: For the transcription pipeline.
  - `react`, `react-dom`: For the frontend UI.
  - `chokidar`: Directory watching.
  - `fluent-ffmpeg`: Audio extraction.
  - `ws`: WebSocket communication.
  - `config`: Configuration management.

- **Dev Dependencies:**
  - `typescript`: TypeScript support.
  - `vite`: Development server and build tool.
  - `eslint`, `prettier`: Linting and formatting.
  - `tailwindcss`: CSS framework.

Ensure all dependencies are installed via `npm install` or `yarn install`.

## Environment Variables

Configure the application using the following environment variables. Create a `.env` file in the root directory if you wish to override default settings.

```env
WATCH_DIRECTORIES=dir1,dir2
OUTPUT_DIRECTORY=output
ALLOWED_EXTENSIONS=mp4,avi,mov,mp3,wav
GPU_MEMORY_LIMIT=4096
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

   Click the "Fork" button at the top of the repository page to create a personal copy.

2. **Clone the Forked Repository**

   ```bash
   git clone https://github.com/yourusername/whisper-webgpu.git
   cd whisper-webgpu
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Commit Your Changes**

   ```bash
   git commit -m "Add your detailed description of changes"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**

   Go to the original repository and create a pull request from your fork.

## License

This project is licensed under the [MIT License](LICENSE).
