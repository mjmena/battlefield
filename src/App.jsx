import ReactDOM from'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger'
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
  
	constructor(props){
		super(props);
		this.state ={
			userName: '',
		}
	}

	changeUserName(event){
	  	this.setState({userName:event.target.value});
	}

  	submitUserName(event){
	 	event.preventDefault();

		const logger = createLogger({
		  stateTransformer: (state) => {
		    let newState = {};

		    for (var i of Object.keys(state)) {
		      if (Immutable.Iterable.isIterable(state[i])) {
		        newState[i] = state[i].toJS();
		      } else {
		        newState[i] = state[i];
		      }
		    };

		    return JSON.stringify(newState, null, 2);
		  }
		});

	  	console.log("username:" + this.state.userName);
	 	const socket = io('http://localhost', {query:"user_name="+this.state.userName});

		socket.on("hydrate", (state) => {
			const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
			const store = createStore(combineReducers({
				entities: EntityReducer,
				grid: BattlefieldReducer,
				players: PlayerReducer,
				local: LocalReducer,
				drawings: DrawingReducer
			}), Immutable.fromJS(state), applyMiddleware(socketIoMiddleware));
		    ReactDOM.render(<PlayerApp store={store} />, document.getElementById('root'));
		});
	}

render() {
    return <Login userName={this.state.userName} onChange={this.changeUserName.bind(this)} onSubmit={this.submitUserName.bind(this)} />
  }
}

ReactDOM.render(<App s/>, document.getElementById('root'));
