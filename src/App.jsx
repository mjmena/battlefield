import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import createSocketIoMiddleware from 'redux-socket.io';

import EntityReducer from './reducers/EntityReducer';
import BattlefieldReducer from './reducers/BattlefieldReducer';
import PlayerReducer from './reducers/PlayerReducer';
import LocalReducer from './reducers/LocalReducer';
import DrawingReducer from './reducers/DrawingReducer';

import Login from './components/Login';
import PlayerApp from './PlayerApp';

import io from 'socket.io-client';
import Immutable from 'immutable';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }

  changeUserName(event) {
    this.setState({userName: event.target.value});
  }

  submitUserName(event) {
    event.preventDefault();

    const socket = io('http://localhost', {
      query: "user_name=" + this.state.userName
    });

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
        <PlayerApp store={store}/>, document.getElementById('root'));
    });
  }

  render() {
    return <Login userName={this.state.userName} onChange={this.changeUserName.bind(this)} onSubmit={this.submitUserName.bind(this)}/>
  }
}

ReactDOM.render(
  <App/>, document.getElementById('root'));
