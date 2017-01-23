import React from 'react';
import {connect} from 'react-redux';
import { CirclePicker } from 'react-color';
import {selectColor} from './../actions/PlayerActions';

const ColorPicker = ({playerID, selectedColor, onSelectColor}) => {
	return <CirclePicker color={selectedColor} onChange={(color) => onSelectColor(playerID, color.hex)} />
}

const mapStateToProps = (state) => {
	return{
		playerID: state.getIn(["local", "id"]),
		selectedColor: state.getIn(["players", state.getIn(["local", "id"]), "color"])
	}
}

export default connect(mapStateToProps, {onSelectColor: selectColor})(ColorPicker);