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
        const server = app.listen(3000, () => {
            console.log('The server is listening on port 3000!');
        });

        //initializing playerList as an empty array
        let playerList = [];
        let playerNumber = 1;
        let player = {}
        const io = socketio(server);

        io.on('connection', socket => {
            //adding new client to playerList
            console.log('A new client has connected');
            player = {
                name: "Player" + playerNumber,
                id: socket.id,
                yourTurn: false
            };
            playerList.push(player);
            playerNumber++;
            console.log("PLAYER LIST:", playerList);
            console.log("PLAYER:", player);
            //broadcasting playerList
            socket.on('appContainerMounted', () => {
                    socket.emit('players', playerList, player);
                })
                // socket.on('connection', () => {

            // })

            //emitting all strokes from database
            Stroke.findAll()
                .then(strokes => {
                    socket.emit('strokes', strokes);
                });

            //on disconnect, filtering playerList to remove the disconnected player 
            //and broadcasting updated playerList
            socket.on('disconnect', () => {
                console.log('disconnected ', socket.id);
                let leavingPlayer = {};
                playerList = playerList.filter(player => {
                    if (player.id === socket.id) {
                        leavingPlayer = player;
                        return false
                    } else {
                        return true
                    }
                })
                console.log("PLAYER LIST UPON DISCONNECT:", playerList);
                console.log("PLAYER WHO LEFT", leavingPlayer)
                socket.emit('players', playerList, player);
            });

            //creates stroke on draw and broadcasts to other players
            socket.on('draw', (start, end, strokeColor) => {
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

app.get('/api/clear', function(req, res, next) {
    Stroke.destroy({ where: {} })
        .then(() => {
            console.log("nice! cleared all strokes")
        })
        .catch(console.error)
})