export const SAVE_DRAWING = "server/SAVE_DRAWING"
export const LOCAL_SAVE_DRAWING = "SAVE_DRAWING"

export const saveDrawing = (drawing) => {
	return {
		type:SAVE_DRAWING,
		drawing
	}
}