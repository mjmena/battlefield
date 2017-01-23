import React from 'react';
import Cookies from 'js-cookie';

export default class Login extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			name:""
		}
	}

	handleSubmit(event){
		this.setState({name: event.target.value})
		Cookies.set("name", this.state.name);
	}

	handleChange(event){
		this.setState({name: event.target.value})
	}

	render(){
		return <form onSubmit={this.handleSubmit.bind(this)}>
			<input 
				type='text' 
				value={this.state.name} 
				onChange={this.handleChange.bind(this)} 
				placeholder=' Enter Name'>
			</input>
			<button type='submit'/>
		</form>
	}
}