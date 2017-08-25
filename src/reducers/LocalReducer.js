import Immutable from 'immutable';
import {SET_PLAYER_ID, UPDATE_TOOL} from '../actions/LocalActions';
import {Tool} from '../Enums.js';

const initialState = Immutable.Map({
	playerId: -1,
	tool: Tool.SELECT 
});

export default function reducer(state = initialState, action){
	switch(action.type){
		case SET_PLAYER_ID: {
			console.log(state.set("playerId", action.id).toJS())
			return state.set("playerId", action.id);
		}
		case UPDATE_TOOL: return state.set("tool", action.tool);
	}
	return state;
}