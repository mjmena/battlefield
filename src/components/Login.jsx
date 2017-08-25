import React from 'react';

export default class Login extends React.Component {
	
	render(){
		return <form onSubmit={this.props.onSubmit}>
			<input 
				type='text' 
				value={this.props.name} 
				onChange={this.props.onChange} 
				placeholder='Enter Name'>
			</input>
			<button type='submit'>Submit</button>
		</form>
	}
}