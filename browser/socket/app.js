var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', (start, end, strokeColor) => {
  socket.emit('draw', start, end, strokeColor);
});

socket.on('draw', (start, end, strokeColor) => {
  window.whiteboard.draw(start, end, strokeColor);
});

socket.on('strokes', strokes => {
  console.log(strokes[0]);
  strokes.forEach( stroke => {
    window.whiteboard.draw(stroke.start, stroke.end, stroke.strokeColor);
  });
});
