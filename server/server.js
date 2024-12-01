const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });

// Monitor the Graphs folder for changes
const graphsFolder = '/Graphs/';
fs.watch(graphsFolder, (eventType, filename) => {
  // Send updated image list to all connected clients
  const images = fs.readdirSync(graphsFolder)
    .filter(file => file.endsWith('.png'));
  
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ images }));
  });
});