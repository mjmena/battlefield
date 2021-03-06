const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/socket.io',
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: 'ggp-socket'
});

server.listen(4000, () => {
  "listening"
});

const Immutable = require('immutable');
const createStore = require('redux').createStore;

function getLocalAction(action) {
  if (action.type) {
    return Object.assign(action, {
      type: action.type.slice(7)
    })
  }
}

const addPlayer = require('./src/actions/PlayerActions').addPlayer;
const combineReducers = require('redux-immutable').combineReducers;
const EntityReducer = require('./src/reducers/EntityReducer');
const BattlefieldReducer = require('./src/reducers/BattlefieldReducer');
const PlayerReducer = require('./src/reducers/PlayerReducer');
const DrawingReducer = require('./src/reducers/DrawingReducer');

const store = createStore(combineReducers({
  entities: EntityReducer,
  grid: BattlefieldReducer,
  players: PlayerReducer,
  drawings: DrawingReducer
}), Immutable.Map());

let players = Immutable.Map();

io.on('connection', function(socket) {
  let playerId = null;
  let cookie = socket.client.request.headers.cookie;
  if (cookie) {
    cookie = require('cookie').parse(cookie);
    playerId = players.find((value, key) => cookie['ggp-socket'] === key);
    players = players.remove(socket.id);
  }

  if (!playerId) {
    playerId = require('uuid/v4')();
    store.dispatch(addPlayer(playerId, playerId.slice(0,8)));
    socket.broadcast.emit("action", addPlayer(playerId, playerId.slice(0,8)));
  }

  players = players.set(socket.id, playerId);

  const localState = store.getState().mergeIn(['local'], {playerId, tool:"SELECT"});
  socket.emit('hydrate', localState.toJS());

  socket.on('action', function(action) {
    store.dispatch(action);
    socket.broadcast.emit("action", getLocalAction(action));
  });

  socket.on("disconnect", () => {});
});
