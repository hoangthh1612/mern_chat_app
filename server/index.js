const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 9090;

const authRoute = require('./routes/authRoute');
const conversationRoute = require('./routes/conversationRoute');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const helmet = require('helmet');

// middleware
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended: true}));

// const CLIENT_URL='http://localhost:5173'
// app.use(cors({
//     credentials: true,
//     origin: CLIENT_URL
// }));

app.use(cors());
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const conversationModel = require('./models/conversationModel');
const io = new Server(server, {
    cors: 'http://localhost:5173',
    methods: ['GET', 'POST']

})
// const io = require('socket.io')(server, {
//     cors: 'http://localhost:5173'
// })

require('./db/connection');

app.use('/apis/auth', authRoute);
app.use('/apis/conversation', conversationRoute);
app.use('/apis/user', userRoute);
app.use('/apis/message', messageRoute);

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
    users.push({userId, socketId});
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on('connection', (socket) => {
    socket.on('add-user', (userId) => {
        addUser(userId, socket.id);
        io.emit('get-users', users);
    })

    
    // send and get message
    socket.on('send-message', ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        })
    })
    socket.on('add-conversation', async (data) => {
        const {firstUserId, secondUserId} = data;
        try {
            await conversationModel.create({
                members: [firstUserId, secondUserId]
            })
            const conversation = await conversationModel.findOne({
                members: {$all: [firstUserId, secondUserId]}
            })
            socket.emit('get-conversation', conversation);
        } catch (error) {
            
        }
    })

    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log('a user disconnect');
        io.emit("get-users", users);
    })
})



server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})