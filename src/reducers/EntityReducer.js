const Immutable = require('immutable');
const Actions = require('../actions/EntityActions');

const initialState = Immutable.Map();

function reducer(state = initialState, action) {
  switch(action.type){
    case Actions.ADD_ENTITY:
    case Actions.ADD_LOCAL_ENTITY:{
      return state.set(action.id, Immutable.Map({
        id: action.id,
        transform: Immutable.Map({
          x: action.x,
          y: action.y
        })
      }));
    }
    case Actions.MOVE_ENTITY:
    case Actions.MOVE_LOCAL_ENTITY:{
      return state.mergeIn([action.id, "transform"], {
        x: action.x,
        y: action.y
      })
    }
    case Actions.DELETE_ENTITY:
    case Actions.LOCAL_DELETE_ENTITY:{
      return state.remove(action.id);
    }
    default: return state;

  }
}

module.exports = reducer;
