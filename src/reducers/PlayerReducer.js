import Immutable from 'immutable';
import {ADD_PLAYER, ADD_LOCAL_PLAYER, REMOVE_PLAYER, SELECT_COLOR, SELECT_LOCAL_COLOR, SELECT_ENTITY, SELECT_LOCAL_ENTITY} from '../actions/PlayerActions';

const initialState = Immutable.Map({});

export default function reducer(state = initialState, action){
	switch(action.type){
		case SELECT_LOCAL_COLOR:
		case SELECT_COLOR: {
			return state.setIn([action.playerId, "color"], action.color);
		}
		case SELECT_LOCAL_ENTITY: 
		case SELECT_ENTITY: {
			return state.setIn([action.playerId, "selectedEntityId"], action.entityId);
		}
		case ADD_PLAYER:
			return state.set(action.playerId, Immutable.Map({id: action.playerId, name: action.playerName, color: '', selectedEntityId:-1}))
	}
	return state;
}