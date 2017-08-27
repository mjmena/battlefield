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
import {addPlayer, removePlayer} from './src/actions/PlayerActions';
import {combineReducers} from 'redux-immutable';
import EntityReducer from './src/reducers/EntityReducer';
import BattlefieldReducer from './src/reducers/BattlefieldReducer';
import PlayerReducer from './src/reducers/PlayerReducer';
import DrawingReducer from './src/reducers/DrawingReducer';

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
	players: PlayerReducer,
  drawings: DrawingReducer
}), Immutable.Map());

io.on('connection', function(socket){
  const playerName = socket.handshake.query.user_name;

  //TODO add better state management
  const player = store.getState().get('players').find((player, index)=>{
    console.log(player);
    return player.get('name') === playerName
  })

  let playerId = null;
  if(player){
    playerId = player.get('id')
  }else{
    playerId = "" + store.getState().get('players').size;
  
    store.dispatch(addPlayer(playerId, playerName));
    socket.broadcast.emit("action", addPlayer(playerId, playerName));  
  }

  const localState = store.getState().setIn(['local','playerId'], playerId);

  socket.emit('hydrate', localState.toJS());
  
  socket.on('action', function(action) {
		console.log(action);
		store.dispatch(action);
		socket.broadcast.emit("action", getLocalAction(action));
	});

	socket.on("disconnect", ()=>{
	});
});