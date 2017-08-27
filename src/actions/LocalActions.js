import Immutable from 'immutable';

export const SELECT_TOOL = "SELECT_TOOL";
export const START_DRAWING = "START_DRAWING";
export const UPDATE_DRAWING = "UPDATE_DRAWING";
export const STOP_DRAWING = "STOP_DRAWING";

export function selectTool(tool){
	return {
		type:SELECT_TOOL,
		tool
	}
}

export const startDrawing = (x, y) => {
	return{
		type: START_DRAWING,
		x,
		y
	}
}

export const updateDrawing = (x, y) => {
	return{
		type: UPDATE_DRAWING,
		x,
		y
	}
}

export const stopDrawing = () => {
	return{
		type: STOP_DRAWING
	} 
}