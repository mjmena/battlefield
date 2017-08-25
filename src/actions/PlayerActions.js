export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_LOCAL_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const SELECT_ENTITY = "server/SELECT_ENTITY";
export const SELECT_LOCAL_ENTITY = "SELECT_ENTITY";
export const SELECT_COLOR = "server/SELECT_COLOR";
export const SELECT_LOCAL_COLOR = "SELECT_COLOR";
export const GO_ONLINE = "GO_ONLINE";
export const GO_OFFLINE = "GO_OFFLINE";


export function addPlayer(playerId, playerName){
	return {
		type: ADD_PLAYER,
		playerId,
		playerName
	}
}

export function removePlayer(id){
	return {
		type: REMOVE_PLAYER,
		id
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

export function goOnline(playerId){
	return {
		type: GO_ONLINE,
		playerId
	}
}

export function goOffline(playerId){
	return {
		type: GO_OFFLINE,
		playerId
	}
}