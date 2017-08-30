const Immutable = require('immutable');
const Actions = require('../actions/DrawingActions');

const initialState = Immutable.List();

function reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.SAVE_DRAWING:
    case Actions.LOCAL_SAVE_DRAWING:
      {
        return state.push(Immutable.fromJS(action.drawing))
      }
    default: return state;

  }
}

module.exports = reducer;
