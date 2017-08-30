const ADD_PLAYER = "ADD_PLAYER";

const SELECT_ENTITY = "server/SELECT_ENTITY";
const SELECT_LOCAL_ENTITY = "SELECT_ENTITY";

const SELECT_COLOR = "server/SELECT_COLOR";
const SELECT_LOCAL_COLOR = "SELECT_COLOR";

const START_MEASUREMENT = 'server/START_MEASUREMENT';
const START_LOCAL_MEASUREMENT = 'START_MEASUREMENT';

const UPDATE_MEASUREMENT = 'server/UPDATE_MEASUREMENT';
const UPDATE_LOCAL_MEASUREMENT = 'UPDATE_MEASUREMENT';

const STOP_MEASUREMENT = 'server/STOP_MEASUREMENT';
const STOP_LOCAL_MEASUREMENT = 'STOP_MEASUREMENT';

function addPlayer(playerId, playerName) {
  return {
    type: ADD_PLAYER,
    playerId,
    playerName
  }
}

function selectColor(playerId, color) {
  return {
    type: SELECT_COLOR,
    playerId,
    color
  }
}

function selectEntity(playerId, entityId) {
  return {
    type: SELECT_ENTITY,
    playerId,
    entityId
  }
}

function startMeasurement(playerId, x, y) {
  return {
    type: START_MEASUREMENT,
    playerId,
    x,
    y
  }
}

function updateMeasurement(playerId, x, y) {
  return {
    type: UPDATE_MEASUREMENT,
    playerId,
    x,
    y
  }
}

function stopMeasurement(playerId) {
  return {
    type: STOP_MEASUREMENT,
    playerId
  }
}

module.exports = {
	ADD_PLAYER,
	SELECT_ENTITY,
	SELECT_LOCAL_ENTITY,
	SELECT_COLOR,
	SELECT_LOCAL_COLOR,
	START_MEASUREMENT,
	START_LOCAL_MEASUREMENT,
	UPDATE_MEASUREMENT,
	UPDATE_LOCAL_MEASUREMENT,
	STOP_MEASUREMENT,
	STOP_LOCAL_MEASUREMENT,
	addPlayer,
	selectColor,
	selectEntity,
	startMeasurement,
	updateMeasurement,
	stopMeasurement
}
