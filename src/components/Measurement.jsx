import React from 'react';

const Measurement = ({startX, startY, endX, endY, cellSize, color}) => {

	const delta ={
		x: Math.abs(startX - endX),
		y: Math.abs(startY - endY)
	}
	const distance = Math.floor(Math.max(delta.x,delta.y) + Math.floor(Math.min(delta.x, delta.y)) / 2);

	return <g>
		<defs>
	    	<marker id="arrow" markerWidth={cellSize/8} markerHeight={cellSize/8} refX={cellSize/8} refY={cellSize/16} orient="auto" overflow="visible">
	        	<polygon points={"0,0 0,"+cellSize/8+" "+cellSize/8+","+cellSize/16} style={{fill:color}} />
							<text x={cellSize/4} y={cellSize/4}>{distance * 5}</text>
	    	</marker>
	    </defs>
		<line x1={startX*cellSize + cellSize/2} y1={startY*cellSize + cellSize/2} x2={endX*cellSize + cellSize/2} y2={endY*cellSize + cellSize/2} style={{stroke:color, strokeWidth:2, markerEnd:"url(#arrow)"}} />
	</g>
}

export default Measurement;
