export const UPDATE_ID = "UPDATE_ID";
export const UPDATE_TOOL = "UPDATE_TOOL";

export function updateID(id){
	console.log(id);
	return {
		type: UPDATE_ID,
		id
	}
}