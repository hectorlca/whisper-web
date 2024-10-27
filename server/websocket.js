import { WebSocketServer } from 'ws';
import { queue } from './queue.js';  // Note: Make sure queue.js is also using ES modules

const wss = new WebSocketServer({ 
  port: 8080,
  clientTracking: true,
  handleProtocols: () => 'json',
  // Add WebSocket server options
  verifyClient: (info, callback) => {
    // Allow all origins in development
    callback(true);
  }
});

// Handle server errors
wss.on('error', function error(error) {
  console.error('WebSocket Server Error:', error);
});

wss.on('connection', function connection(ws, request) {
  console.log('New client connected from:', request.socket.remoteAddress);
  
  try {
    // Send initial state
    ws.send(JSON.stringify({
      type: 'QUEUE_STATUS',
      data: queue.getStatus()
    }));
  } catch (error) {
    console.error('Error sending initial state:', error);
  }

  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      console.log('Received message:', data);
      
      switch (data.type) {
        case 'PROCESS_FILE':
          queue.add(data.filePath);
          break;
        default:
          console.warn('Unknown message type:', data.type);
      }
      
      // Broadcast updates to all clients
      broadcastStatus();
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('error', function error(err) {
    console.error('WebSocket Client Error:', err);
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

function broadcastStatus() {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocketServer.OPEN) {
      try {
        client.send(JSON.stringify({
          type: 'QUEUE_STATUS',
          data: queue.getStatus()
        }));
      } catch (error) {
        console.error('Error broadcasting status:', error);
      }
    }
  });
}

export { wss, broadcastStatus };
