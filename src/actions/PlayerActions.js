export const ADD_PLAYER = "server/ADD_PLAYER";
export const ADD_LOCAL_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const SELECT_ENTITY = "server/SELECT_ENTITY";
export const SELECT_LOCAL_ENTITY = "SELECT_ENTITY";
export const SELECT_COLOR = "server/SELECT_COLOR";
export const SELECT_LOCAL_COLOR = "SELECT_COLOR";



export function addPlayer(player){
	return {
		type: ADD_PLAYER,
		player
	}
}

export function removePlayer(id){
	return {
		type: REMOVE_PLAYER,
		id
	}
}
export function selectColor(playerID, color){
	return {
		type: SELECT_COLOR,
		playerID,
		color
	}
}
export function selectEntity(playerID, entityID){
	return {
		type: SELECT_ENTITY,
		playerID,
		entityID
	}
}