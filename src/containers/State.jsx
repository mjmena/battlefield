import React from 'react';
import {connect} from 'react-redux';

const StateTree = ({state}) => {
	return (<div style={{overflow:'scroll'}}>
		<pre>{JSON.stringify(state.toJS(), null, '\t')}</pre>
	</div>)
}

const mapStateToProps = (state) => {
	return {
		state
	}
}

export default connect(mapStateToProps)(StateTree);