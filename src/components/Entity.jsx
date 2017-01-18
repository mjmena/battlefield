import React from 'react';
import Immutable from 'immutable';

export default class Entity extends React.Component {
	render(){
    return (<div style={this.props.isSelected ? {fontWeight:'bold'} : {}}>{JSON.stringify(this.props.entity)}</div>)
	}
}
