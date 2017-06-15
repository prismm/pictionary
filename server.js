const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const socketio = require('socket.io');
const db = require('./models').db;
const Stroke = require('./models').Stroke;

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
db.sync({ force: true })
    .then(() => {
        const server = app.listen(1337, () => {
            console.log('The server is listening on port 1337!');
        });

        const io = socketio(server);

        io.on('connection', socket => {
            console.log('A new client has connected');
            console.log(socket.id);
            Stroke.findAll()
                .then(strokes => {
                    socket.emit('strokes', strokes);
                });
            socket.on('disconnect', () => {
                console.log('disconnected ', socket.id);
            });
            socket.on('draw', (start, end, strokeColor) => {
                console.log(typeof start.x, typeof end.y, strokeColor);
                Stroke.create({
                        startX: +start.x,
                        startY: +start.y,
                        endX: +end.x,
                        endY: +end.y,
                        strokeColor,
                    })
                    .then(() => {
                        socket.broadcast.emit('draw', start, end, strokeColor);
                    });
            });
        });

    });

app.use(express.static(path.join(__dirname, 'browser')));

// sessions

// the session store will save current sessions in the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });

// creates session table
dbStore.sync({ force: true });

app.use(session({
    secret: process.env.SESSION_SECRET || 'parrot',
    store: dbStore,
    resave: false,
    saveUninitialized: false
}));

//sends index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});