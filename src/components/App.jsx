import React from 'react';
import EntityList from './EntityList';
import Battlefield from './Battlefield';

export default class App extends React.Component {
	render(){
		const entity_list = this.props.entities.toList();
		return (
			<div>
				<div style={{float:'left', paddingRight:20}}>
					<pre>{JSON.stringify(this.props.current, undefined, "\t")}</pre>
					<EntityList entities={entity_list} current_entity_id={this.props.current_entity_id} handleSelectClick={this.props.handleSelectClick}></EntityList>
				</div>
				<div style={{float:"left"}}>
					<Battlefield
						entities={entity_list}
						current_entity_id={this.props.current_entity_id}
						columns={this.props.columns}
						rows={this.props.rows}
						cell={this.props.cell}
						handleSelectClick={this.props.handleSelectClick}
						handleDragEnd={this.props.handleDragEnd}
						rulerEvents={this.props.rulerEvents}
						current={this.props.current}
					></Battlefield>
				</div>
			</div>
		);
	}
}