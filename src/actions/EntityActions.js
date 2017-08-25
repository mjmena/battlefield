export const ADD_ENTITY = "server/ADD_ENTITY";
export const ADD_LOCAL_ENTITY = "ADD_ENTITY";
export const SELECT_ENTITY = "server/SELECT_ENTITY";
export const UPDATE_ENTITIES = "UPDATE_ENTITIES";
export const UPDATE_ENTITY = "server/UPDATE_ENTITY";
export const UPDATE_LOCAL_ENTITY = "UPDATE_ENTITY";
export const MOVE_ENTITY = "server/MOVE_ENTITY";
export const MOVE_LOCAL_ENTITY = "MOVE_ENTITY";
export function getLocalAction(action){
	if(action.type){
		return {...action, type:action.type.slice(7)}
	}
}

export function addEntity(x,y){
	return {
		type:ADD_ENTITY,
		x,
		y
	}
}

export function moveEntity(id, x, y){
	return {
		type: MOVE_ENTITY,
		id,
		x,
		y
	}
}