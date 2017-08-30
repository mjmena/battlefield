const Immutable = require('immutable');
const Actions = require('../actions/EntityActions');

const initialState = Immutable.Map();

function reducer(state = initialState, action) {
  console.log(action)
  if (action.type === Actions.MOVE_ENTITY || action.type === Actions.MOVE_LOCAL_ENTITY) {
    return state.mergeIn([action.id, "transform"], {
      x: action.x,
      y: action.y
    })
  } else if (action.type === Actions.ADD_ENTITY || action.type === Actions.ADD_LOCAL_ENTITY) {
    return state.set(action.id, Immutable.Map({
      id: action.id,
      transform: Immutable.Map({
        x: action.x,
        y: action.y
      })
    }));
  }

  return state;
}

module.exports = reducer;
