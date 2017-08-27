import React from 'react';
import {connect} from 'react-redux';

import {Tool} from '../Enums';
import {selectTool} from './../actions/LocalActions';

const Toolbar = ({tool, selectTool}) => {
	const tools = Tool.map((val, key) => <div key={key} style={key === tool ? {fontWeight:'bold'} : {fontWeight:'normal'}} onClick={()=>selectTool(key)}>{val}</div>).toList()

	return (
		<div>
			{tools}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		tool: state.getIn(["local", "tool"])
	}
}

export default connect(mapStateToProps, {selectTool})(Toolbar);