const Immutable = require('immutable');

const initialState = Immutable.Map({
  columns: 15,
  rows: 15,
  cellSize: 50
});

function reducer(state = initialState, action) {
  return state;
}

module.exports = reducer;
