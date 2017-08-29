import React from 'react';
import PropTypes from 'prop-types';
class Login extends React.Component {
  render() {
    return <form onSubmit={this.props.onSubmit}>
      <input type='text' value={this.props.name} onChange={this.props.onChange} placeholder='Enter Name'></input>
      <button type='submit'>Submit</button>
    </form>
  }
}

Login.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default Login;
