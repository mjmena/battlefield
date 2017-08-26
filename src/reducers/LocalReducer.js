import Immutable from 'immutable';
import {SELECT_TOOL} from '../actions/LocalActions';

const initialState = Immutable.Map();

export default function reducer(state = initialState, action){
	switch(action.type){
		case SELECT_TOOL: return state.set("tool", action.tool);
	}
	return state;
}