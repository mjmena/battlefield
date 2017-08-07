var express = require("express");
var app = express();
var hostname = process.env.HOSTNAME || 'localhost';
var port = parseInt(process.env.PORT, 10) || 80;
var publicDir = process.argv[2] || __dirname + '/dist';
var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);
import Immutable from 'immutable';

import {createStore} from 'redux';
import {getLocalAction} from './src/actions/EntityActions';
import {ADD_PLAYER, removePlayer} from './src/actions/PlayerActions';
import {combineReducers} from 'redux-immutable';
import EntityReducer from './src/reducers/EntityReducer';
import BattlefieldReducer from './src/reducers/BattlefieldReducer';
import PlayerReducer from './src/reducers/PlayerReducer';

let players = Immutable.Map();

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/index.html"));
});

http.listen(80, function(){
  console.log('listening on *:80');
});

app.use(express.static(publicDir));

const store = createStore(combineReducers({
			entities: EntityReducer,
			grid: BattlefieldReducer,
			players: PlayerReducer
		}), Immutable.Map());

io.on('connection', function(socket){
	socket.emit('hydrate', store.getState().toJS());

	socket.on('action', function(action) {
		store.dispatch(action);
		if(action.type == ADD_PLAYER){
			players = players.set(socket.id, action.player);
		}
		socket.broadcast.emit("action", getLocalAction(action));
	});

	socket.on("disconnect", ()=>{
		const player = players.get(socket.id);
		store.dispatch(removePlayer(player));
		io.emit("action", removePlayer(player));
		players = players.remove(socket.id);
	});
});