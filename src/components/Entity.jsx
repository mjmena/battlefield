import React from 'react';
import Immutable from 'immutable';

export default class Entity extends React.Component {
	render(){
    	return (
			<div 
				style={this.props.isSelected ? {textDecoration:"underline overline"} : {}} 
				onClick={this.props.handleSelectClick.bind(this, this.props.entity.id)}
			>
				{JSON.stringify(this.props.entity, undefined, 2)}
	    	</div>
		)
	}
}
