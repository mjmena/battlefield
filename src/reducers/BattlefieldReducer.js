import Immutable from 'immutable';

const initialState = Immutable.Map({
  columns: 15,
  rows: 15,
  cellSize: 50
});

export default function reducer(state = initialState, action) {
  return state;
}
