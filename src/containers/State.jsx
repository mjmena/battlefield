import React from 'react';
import {connect} from 'react-redux';

const StateTree = ({state}) => {
	return (<div style={{width:'500px'}}>
		{JSON.stringify(state.toJS())}
	</div>)
}

const mapStateToProps = (state) => {
	return {
		state
	}
}

export default connect(mapStateToProps)(StateTree);