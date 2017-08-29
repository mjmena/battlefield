import React from 'react';

const Drawing = ({coordinates, color}) => {

  let path = ""
  if (coordinates) {
    console.log(coordinates);
    path = coordinates.reduce((accum, coordinate) => {
        if (accum !== "M") {
          accum += " L"
        }
        return accum + coordinate.get("x") + " " + coordinate.get("y")
    }, "M")
  }

	return <path d={path} stroke={color} strokeWidth="3" fill="none"/>
}

export default Drawing;
