export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_LOCAL_PLAYER = "ADD_PLAYER";

export const SELECT_ENTITY = "server/SELECT_ENTITY";
export const SELECT_LOCAL_ENTITY = "SELECT_ENTITY";

export const SELECT_COLOR = "server/SELECT_COLOR";
export const SELECT_LOCAL_COLOR = "SELECT_COLOR";

export const START_MEASUREMENT = 'server/START_MEASUREMENT';
export const START_LOCAL_MEASUREMENT = 'START_MEASUREMENT';

export const UPDATE_MEASUREMENT = 'server/UPDATE_MEASUREMENT';
export const UPDATE_LOCAL_MEASUREMENT = 'UPDATE_MEASUREMENT';

export const STOP_MEASUREMENT = 'server/STOP_MEASUREMENT';
export const STOP_LOCAL_MEASUREMENT = 'STOP_MEASUREMENT';

export function addPlayer(playerId, playerName){
	return {
		type: ADD_PLAYER,
		playerId,
		playerName
	}
}

export function selectColor(playerId, color){
	return {
		type: SELECT_COLOR,
		playerId,
		color
	}
}

export function selectEntity(playerId, entityId){
	return {
		type: SELECT_ENTITY,
		playerId,
		entityId
	}
}

export function startMeasurement(playerId, x, y){
	return {
		type:START_MEASUREMENT,
		playerId,
		x,
		y
	}
}

export function updateMeasurement(playerId, x, y){
	return {
		type:UPDATE_MEASUREMENT,
		playerId,
		x,
		y
	}
}

export function stopMeasurement(playerId){
	return {
		type:STOP_MEASUREMENT,
		playerId
	}	
}
