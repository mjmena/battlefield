const ADD_ENTITY = "server/ADD_ENTITY";
const ADD_LOCAL_ENTITY = "ADD_ENTITY";

const MOVE_ENTITY = "server/MOVE_ENTITY";
const MOVE_LOCAL_ENTITY = "MOVE_ENTITY";

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

module.exports = {
	ADD_ENTITY,
	ADD_LOCAL_ENTITY,
	MOVE_ENTITY,
	MOVE_LOCAL_ENTITY,
	addEntity,
	moveEntity
}
