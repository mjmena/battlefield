export const SET_PLAYER_ID = "SET_PLAYER_ID";
export const UPDATE_TOOL = "UPDATE_TOOL";

export function setPlayerId(playerId){
	return {
		type: SET_PLAYER_ID,
		playerId
	}
}