import React from 'react';
import {connect} from 'react-redux';

const StateTree = ({state}) => {
	return (<div>
		<pre>{JSON.stringify(state.toJS(), null, 2)}</pre>
	</div>)
}

const mapStateToProps = (state) => {
	return {
		state
	}
}

export default connect(mapStateToProps)(StateTree);
