const ADD_ENTITY = "server/ADD_ENTITY";
const ADD_LOCAL_ENTITY = "ADD_ENTITY";

const MOVE_ENTITY = "server/MOVE_ENTITY";
const MOVE_LOCAL_ENTITY = "MOVE_ENTITY";

const DELETE_ENTITY = "server/DELETE_ENTITY";
const LOCAL_DELETE_ENTITY = "DELETE_ENTITY";

function addEntity(id, x, y){
	return {
		type:ADD_ENTITY,
		id,
		x,
		y
	}
}

function moveEntity(id, x, y){
	return {
		type: MOVE_ENTITY,
		id,
		x,
		y
	}
}

function deleteEntity(id){
	return {
		type:DELETE_ENTITY,
		id,
	}
}

module.exports = {
	ADD_ENTITY,
	ADD_LOCAL_ENTITY,
	MOVE_ENTITY,
	MOVE_LOCAL_ENTITY,
	DELETE_ENTITY,
	LOCAL_DELETE_ENTITY,
	addEntity,
	moveEntity,
	deleteEntity,
}
