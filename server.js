var express = require("express");
var app = express();
var hostname = process.env.HOSTNAME || '10.0.0.109';
var port = parseInt(process.env.PORT, 10) || 80;
var publicDir = process.argv[2] || __dirname + '/dist';
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var Immutable = require('immutable');
var Records = require('./src/Records.js');
var Entity = Records.Entity;
var characters = new Immutable.OrderedMap();

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

io.on('connection', function(socket){
	console.log(socket.id);
	socket.emit('update_entities', characters);

	socket.on('create_character', function(){
    var character = create_character(10,10);
    characters = characters.set(character.id, character);
		io.emit('update_entities', characters);
  });

	socket.on('move_entity', function(entity){
		characters = characters.set(entity.id, characters.get(entity.id).move(entity.transform));
  		io.emit('update_entities', characters);
	});

  	socket.on('move_entity_exact', function(entity){
		characters = characters.set(entity.id, new Entity(entity));
  		io.emit('update_entities', characters);
	});
});

http.listen(80, function(){
  console.log('listening on *:80');
});

app.use(express.static(publicDir));

console.log("Server showing %s listening at http://%s:%s", publicDir, hostname, port);

function create_character(x,y){
	var id = 0;
	if(characters.size > 0){
		id = characters.last().id + 1;
	}

	return new Entity({id: id, transform: {x: x, y: y}});
}
