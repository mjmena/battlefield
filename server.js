var express = require("express");
var app = express();
var hostname = process.env.HOSTNAME || '10.0.0.109';
var port = parseInt(process.env.PORT, 10) || 80;
var publicDir = process.argv[2] || __dirname + '/dist';
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var Immutable = require('immutable');

var characters = new Immutable.Map();

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

io.on('connection', function(socket){
  	socket.on('create_character', function(){
  		var character = {id: characters.size, x: 10, y: 10}
  		characters = characters.set(character.id, character);
  		io.emit('create_character', character);
	});

	socket.on('move_character', function(moved_character){
		characters = characters.set(moved_character.id, moved_character);
  		io.emit('move_character', moved_character);
	});
});


http.listen(80, function(){
  console.log('listening on *:80');
});

app.use(express.static(publicDir));

console.log("Server showing %s listening at http://%s:%s", publicDir, hostname, port);