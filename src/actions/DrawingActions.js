import Immutable from 'immutable';

export const DRAWING_ACTIONS = new Immutable.Record({
	START: "START_DRAWING",
	UPDATE: "UPDATE_DRAWING",
	STOP: "STOP_DRAWING"
});
