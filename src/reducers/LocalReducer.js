import Immutable from 'immutable';
import {
  SELECT_TOOL,
  START_DRAWING,
  UPDATE_DRAWING,
  STOP_DRAWING,
  SAVE_COORDINATE
} from '../actions/LocalActions';
const initialState = Immutable.Map();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_TOOL:
      return state.set("tool", action.tool);
    case START_DRAWING:
      {
        return state.set("drawing", Immutable.List([Immutable.Map({
          x: action.x,
          y: action.y
        })]));
      }
    case UPDATE_DRAWING:
      {
        return state.update("drawing", (drawing) => drawing.push(Immutable.Map({
          x: action.x,
          y: action.y
        })))
      }
    case STOP_DRAWING:
      {
        return state.remove("drawing");
      }
    case SAVE_COORDINATE:{
      return state.set('coordinate', Immutable.Map({x:action.x, y:action.y}))
    }
    default:return state;
  }
}
