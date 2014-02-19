// Server.js file for nodejs/socketio/express 
// simple chat server

var appPort = 3000;

var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var jade = require('jade');

app.set('title', 'T3A:O Webchat');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false} );
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req,res){
    res.render('home.jade');
});
server.listen(appPort);
console.log('Server listening on Port ' + appPort);

io.sockets.on('connection', function(socket) {
    // other events
    socket.on('setPseudo', function(data) {
        socket.set('pseudo', data)
    });
    
    socket.on('message', function(message) {
        socket.get('pseudo', function(error, name) {
            var data = { 'message': message, pseudo: name };
            socket.broadcast.emit('message', data);
            console.log('user ' + name + ' send this: ' + message);
        })
    });
});