import Immutable from 'immutable';
import * as Actions from '../actions/PlayerActions';

const initialState = Immutable.Map({});

export default function reducer(state = initialState, action){
	switch(action.type){
		case Actions.SELECT_LOCAL_COLOR:
		case Actions.SELECT_COLOR: {
			return state.setIn([action.playerId, "color"], action.color);
		}
		case Actions.SELECT_LOCAL_ENTITY: 
		case Actions.SELECT_ENTITY: {
			return state.setIn([action.playerId, "selectedEntityId"], action.entityId);
		}
		case Actions.ADD_PLAYER:
			return state.set(action.playerId, Immutable.Map({id: action.playerId, name: action.playerName, color: '', selectedEntityId:-1}))
		case Actions.START_MEASUREMENT:
		case Actions.START_LOCAL_MEASUREMENT:
			return state.setIn([action.playerId, 'measurement'], Immutable.Map({
				startX:action.x, 
				startY:action.y,
				endX:action.x,
				endY:action.y
			}))
		case Actions.UPDATE_MEASUREMENT:
		case Actions.UPDATE_LOCAL_MEASUREMENT:
			return state.mergeIn([action.playerId, 'measurement'], Immutable.Map({
				endX:action.x,
				endY:action.y
			}))
		case Actions.STOP_MEASUREMENT:
		case Actions.STOP_LOCAL_MEASUREMENT:
			return state.removeIn([action.playerId, 'measurement'])
	}
	return state;
}