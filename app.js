/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || config.get('port'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.on('createNote', function(data) {
    socket.broadcast.emit('onNoteCreated', data);
  });

  socket.on('updateNote', function(data) {
    socket.broadcast.emit('onNoteUpdated', data);
  });

  socket.on('moveNote', function(data){
    socket.broadcast.emit('onNoteMoved', data);
  });

  socket.on('deleteNote', function(data){
    socket.broadcast.emit('onNoteDeleted', data);
  });
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
