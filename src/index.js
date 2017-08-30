import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';


import io from 'socket.io-client';
import Immutable from 'immutable';

import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import createSocketIoMiddleware from 'redux-socket.io';

import EntityReducer from './reducers/EntityReducer';
import BattlefieldReducer from './reducers/BattlefieldReducer';
import PlayerReducer from './reducers/PlayerReducer';
import LocalReducer from './reducers/LocalReducer';
import DrawingReducer from './reducers/DrawingReducer';

const socket = io('http://localhost:4000');

socket.on("hydrate", (state) => {
  const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
  const fromJSGreedy = (js) => {
    return typeof js !== 'object' || js === null
      ? js
      : Array.isArray(js)
        ? Immutable.Seq(js).map(fromJSGreedy).toList()
        : Immutable.Seq(js).map(fromJSGreedy).toMap();
  }
  const store = createStore(combineReducers({local: LocalReducer, players: PlayerReducer, entities: EntityReducer, grid: BattlefieldReducer, drawings: DrawingReducer}), fromJSGreedy(state), applyMiddleware(socketIoMiddleware));

  ReactDOM.render(
    <App store={store}/>, document.getElementById('root'));
});


// registerServiceWorker();
