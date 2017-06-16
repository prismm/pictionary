var socket = io(window.location.origin);
// const buildWhiteboard = require('./whiteboard')
import buildWhiteboard from './whiteboard';

export function runSocket(canvasElement) {
    const whiteboard = buildWhiteboard(canvasElement);

    socket.on('connect', function() {
        console.log('I have made a persistent two-way connection to the server!');
    });

    whiteboard.on('draw', (start, end, strokeColor) => {
        socket.emit('draw', start, end, strokeColor);
    });

    socket.on('draw', (start, end, strokeColor) => {
        whiteboard.draw(start, end, strokeColor);
    });

    socket.on('strokes', strokes => {
        strokes.forEach(stroke => {
            whiteboard.draw(stroke.start, stroke.end, stroke.strokeColor);
        });
    });
}

export function buildPlayerList() {
    socket.on('connect', function() {
        console.log('I have made a persistent two-way connection to the server!');
    });

    socket.on('players', playerList => {
        console.log(playerList);
        return playerList
    })
}