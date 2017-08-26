export const SELECT_TOOL = "SELECT_TOOL";

export function selectTool(tool){
	return {
		type:SELECT_TOOL,
		tool
	}
}