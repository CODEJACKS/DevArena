const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let chatHistory = [];

function filterMessage(message) {
  const bannedWords = ['badword1', 'badword2', 'badword3'];
  let filteredMessage = message;
  bannedWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredMessage = filteredMessage.replace(regex, '****');
  });
  return filteredMessage;
}

app.get('/recent-chats', (req, res) => {
  res.json(chatHistory);
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    const filteredMessage = filterMessage(message);
    chatHistory.push(filteredMessage);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(filteredMessage);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
