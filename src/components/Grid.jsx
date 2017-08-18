import React from 'react'

const Grid = ({columns, rows, cellSize}) => {
	const style = {
		backgroundSize: cellSize + 'px ' + cellSize +'px',
		backgroundImage: 'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)',
		// width: cellSize * columns + 1,
		// height: cellSize * rows + 1,
		width: '100%',
		height: '100%',
		margin: 0,
		padding: 0
	}
	return (
		<div style={style}></div>
	)
}

export default Grid;