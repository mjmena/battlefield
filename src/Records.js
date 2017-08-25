import Immutable from 'immutable';

export const PlayerRecord = new Immutable.Record({
  id: null,
  name: null,
  selectedEntity: null, 
  color: null
}, "Player")