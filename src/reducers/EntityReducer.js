import Immutable from 'immutable';
import {
	ADD_ENTITY,
  ADD_LOCAL_ENTITY,
  MOVE_ENTITY,
  MOVE_LOCAL_ENTITY
} from '../actions/EntityActions';

const initialState = Immutable.List();

export default function reducer(state = initialState, action) {
  if (action.type === MOVE_ENTITY || action.type === MOVE_LOCAL_ENTITY) {
    return state.mergeIn([action.id, "transform"], {
      x: action.x,
      y: action.y
    })
  } else if (action.type === ADD_ENTITY || action.type === ADD_LOCAL_ENTITY) {
    return state.push(Immutable.fromJS({
      id: ""+state.size,
      transform: {
        x: action.x,
        y: action.y
      }
    }));
  }

  return state;
}
