import Immutable from 'immutable';
import {UPDATE_ID, UPDATE_TOOL} from '../actions/LocalActions';
import {Tool} from '../Enums.js';

const initialState = Immutable.Map({
	id: -1,
	tool: Tool.SELECT 
});

export default function reducer(state = initialState, action){
	switch(action.type){
		case UPDATE_ID: {
			console.log(state.set("id", action.id).toJS())
			return state.set("id", action.id);
		}
		case UPDATE_TOOL: return state.set("tool", action.tool);
	}
	return state;
}