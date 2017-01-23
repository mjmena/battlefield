import ReactDOM from'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import {Provider} from 'react-redux';
import Cookies from 'js-cookie';
import createSocketIoMiddleware from 'redux-socket.io';
import createLogger from 'redux-logger';

import EntityReducer from './reducers/EntityReducer';
import BattlefieldReducer from './reducers/BattlefieldReducer';
import PlayerReducer from './reducers/PlayerReducer';
import LocalReducer from './reducers/LocalReducer';

import Login from './components/Login';
import EntityList from './containers/EntityList';
import PlayerList from './containers/PlayerList';
import Battlefield from './containers/Battlefield';
import ColorPicker from './containers/ColorPicker';

import io from 'socket.io-client';
import Immutable from 'immutable';

import {addPlayer} from './actions/PlayerActions';
import {updateID} from './actions/LocalActions';
const store = {};

const key = Cookies.get('name') 
if(key){
	const App = () => {
		return (<Provider store={store}>
			<div>
				<div style={{float:"left"}}>
					<Battlefield />
				</div> 
				<div style={{float:"right", clear:"right"}}>
					<PlayerList />
					<ColorPicker />
				</div>
				<div style={{float:"left"}}>
					<EntityList />
				</div> 
	        </div>
		</Provider>)
	}

	const socket = io();

	socket.on("hydrate", (state) => {
		const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

		store = createStore(combineReducers({
			entities: EntityReducer,
			grid: BattlefieldReducer,
			players: PlayerReducer,
			local: LocalReducer
		}), Immutable.fromJS(state), applyMiddleware(socketIoMiddleware, createLogger()));
		
		store.dispatch(addPlayer(key));
		store.dispatch(updateID(key));

		const unsubscribe = store.subscribe(()=>console.log(JSON.stringify(store.getState().toJS())))

		ReactDOM.render(<App />, document.getElementById("root"))
	});

}else{
	ReactDOM.render(<Login />, document.getElementById("root"))
}