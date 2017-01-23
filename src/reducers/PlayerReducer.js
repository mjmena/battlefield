import Immutable from 'immutable';
import {ADD_PLAYER, ADD_LOCAL_PLAYER, REMOVE_PLAYER, SELECT_COLOR, SELECT_LOCAL_COLOR, SELECT_ENTITY, SELECT_LOCAL_ENTITY} from '../actions/PlayerActions';

const initialState = Immutable.Map({});

export default function reducer(state = initialState, action){
	switch(action.type){
		case SELECT_LOCAL_COLOR:
		case SELECT_COLOR: {
			return state.setIn([action.playerID, "selectedColor"], action.color);
		}
		case SELECT_LOCAL_ENTITY: 
		case SELECT_ENTITY: {
			return state.setIn([action.playerID, "selectedEntityID"], action.entityID);
		}
	}

	if(action.type === ADD_PLAYER || action.type === ADD_LOCAL_PLAYER){
		return state.set(action.player, Immutable.fromJS({name: action.player, selectedColor: "#000000"}));
	}else if(action.type == REMOVE_PLAYER){
		return state.remove(action.id);
	}

	return state;
}