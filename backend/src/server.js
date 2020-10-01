const express = require('express');
const routes = require('./routes');
const mongoose = require ('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://djenoleReis:djenole123456@cluster0.m4p4y.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => {
 //   console.log(socket.handshake.query);
//    console.log('conectado', socket.id);
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();

})

//GET, POST, PUT, DELETE

//req.query = acessar query params (criação de filtro)
//req.params = acessar riyte params (edicao e delete)
//req.body = acessar corpo da requisiçao( criação e edição de registros)

app.use(cors());
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);

