import Immutable from 'immutable';
import {LOCAL_SAVE_DRAWING, SAVE_DRAWING} from '../actions/DrawingActions';
const initialState = Immutable.List();

export default function reducer(state = initialState, action){
	console.log(action);
	switch(action.type){
		case SAVE_DRAWING:
		case LOCAL_SAVE_DRAWING: {
			return state.push(action.drawing)
		}

	}
	return state;
}