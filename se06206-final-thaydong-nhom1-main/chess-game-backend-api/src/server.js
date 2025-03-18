const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Chess } = require('chess.js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });const socket = new WebSocket('ws://localhost:4000');

socket.onopen = () => {
    console.log('Connected to server');
    // Gửi yêu cầu tạo phòng
    socket.send(JSON.stringify({ type: 'create-game' }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Xử lý các thông điệp từ server
    console.log(data);
};

let games = {}; // Lưu trữ thông tin các trò chơi

// Xử lý kết nối WebSocket
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'create-game':
                createGame(ws);
                break;
            case 'join-game':
                joinGame(ws, data.gameId);
                break;
            case 'move':
                makeMove(ws, data.gameId, data.move);
                break;
            default:
                break;
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Hàm tạo phòng
function createGame(ws) {
    const gameId = generateGameId();
    games[gameId] = new Chess();
    ws.send(JSON.stringify({ type: 'game-created', gameId }));
}

// Hàm tham gia phòng
function joinGame(ws, gameId) {
    if (games[gameId]) {
        ws.send(JSON.stringify({ type: 'joined-game', gameId }));
    } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
    }
}

// Hàm thực hiện nước đi
function makeMove(ws, gameId, move) {
    const game = games[gameId];
    if (game) {
        const result = game.move(move);
        if (result) {
            ws.send(JSON.stringify({ type: 'move-made', move: result }));
        } else {
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid move' }));
        }
    } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
    }
}

// Hàm tạo ID phòng ngẫu nhiên
function generateGameId() {
    return Math.random().toString(36).substring(2, 15);
}

// Khởi động server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});function botMove(gameId) {
    const game = games[gameId];
    if (game) {
        const moves = game.ugly_moves();
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        // Gửi thông điệp đến client về nước đi của bot
        wss.clients.forEach(client => {
            client.send(JSON.stringify({ type: 'move-made', move: randomMove }));
        });
    }
}