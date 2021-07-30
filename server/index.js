const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const http = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(http);
const PORT = process.env.PORT || 5000;
const { addUser, getUser, removeUser } = require('./helper');
const mongoose = require('mongoose');
const Room = require('./models/Room');
const Message = require('./models/Message');
const cookieParser = require('cookie-parser');

const mongoDB = "mongodb+srv://first-user:mongodb@cluster0.t01a9.mongodb.net/chat-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB CONNECTED')).catch((err) => console.log(err));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRoutes);
app.use(cookieParser());

io.on('connection', (socket) => {
    console.log(socket.id);
    Room.find().then((result) => {
        socket.emit('output-rooms', result);
    })
    socket.on('create-room', name => {
        //console.log('The room name received is ', name);
        const room = new Room({ name });
        room.save().then((result) => {
            io.emit('room-created', result);
        })
    });
    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name: name,
            room_id: room_id,
            user_id: user_id
        });
        socket.join(room_id);
        if (error) {
            console.log('join error ', error);
        } else {
            console.log('join user ', user);
        }
    });
    socket.on('sendMessage', (message, room_id, callback) => {
        const user = getUser(socket.id);
        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id: room_id,
            text: message
        };
        console.log('message, received', msgToStore);
        const msg = new Message(msgToStore);
        msg.save().then((result) => {
            io.to(room_id).emit('message', result);
            callback();
        })
    });
    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result);
        })
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});

http.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
})