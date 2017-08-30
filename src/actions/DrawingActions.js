const SAVE_DRAWING = "server/SAVE_DRAWING"
const LOCAL_SAVE_DRAWING = "SAVE_DRAWING"

const saveDrawing = (drawing) => {
	return {
		type:SAVE_DRAWING,
		drawing
	}
}

module.exports = {
	SAVE_DRAWING,
	LOCAL_SAVE_DRAWING,
	saveDrawing
}
