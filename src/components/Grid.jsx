import React from 'react'

const Grid = ({columns, rows, cellSize, children}) => {
  const style = {
    backgroundSize: cellSize + 'px ' + cellSize + 'px',
    backgroundImage: 'linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    zIndex:-100,
  }

  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Grid;
