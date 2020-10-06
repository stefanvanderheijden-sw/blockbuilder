// List all requires modules using const <name> = require('')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log('Serving static from ${clientPath}');
app.use(express.static(clientPath));

// Create the server from http object
const server = http.createServer(app);


// Create socketio server
const io = socketio(server);

io.on('connection', (sock) => { 
    
    });


// Output error message if server crashes
server.on('error', (err) =>{
    console.error('Server error:', err);
})

// Start listening to this port
server.listen(5000, () => {
    console.log('RPG Started')
})