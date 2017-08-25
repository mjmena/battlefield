import React from 'react';
import {connect} from 'react-redux';
import { CirclePicker } from 'react-color';
import {selectColor} from './../actions/PlayerActions';

const ColorPicker = ({playerId, color, onSelectColor}) => {
	return <CirclePicker color={color} onChange={(color) => onSelectColor(playerId, color.hex)} />
}

const mapStateToProps = (state) => {
	const playerId = state.getIn(["local", "playerId"])
	return{
		playerId,
		color: state.getIn(["players", playerId, "color"])
	}
}

export default connect(mapStateToProps, {onSelectColor: selectColor})(ColorPicker);