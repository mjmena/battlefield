import React from 'react';
import PropTypes from 'prop-types';

import ColorPicker from '../containers/ColorPicker';
import PlayerList from '../containers/PlayerList';
import State from '../containers/State';
import Toolbar from '../containers/Toolbar';

class Pane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hidden: false
    }

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay(){
      this.setState({hidden:!this.state.hidden});
  }

  render() {
    let defaultPane = {
      position: "fixed",
      top: 0,
      right: 0,
      backgroundColor: "rgba(242,242,242,.5)",
      padding: 25,
      zIndex: 100,
      height: '100%',
      width:  250,
      overflow: "auto",
    }

    const hiddenPane = {
      right: 175,
      backgroundColor: null,
      padding: 0,
      height: 0,
      width: 0,
      overflow: 'visible',
    }

    let paneStyle = defaultPane;
    if(this.state.hidden){
        paneStyle = Object.assign({}, defaultPane, hiddenPane);
    }

    const toggleDisplayButtonStyle = {
      position: 'absolute',
      left: this.state.hidden ? 0 : 125,
      top: 0,
      width:50,
      height: 25,
    }

    return (
      <div style={paneStyle}>
        <button style={toggleDisplayButtonStyle} onClick={this.toggleDisplay}>{this.state.hidden ? "Show" : "Hide"}</button>
        {this.state.hidden ? null : <span>
          <PlayerList/>
          <Toolbar/>
          <ColorPicker/>
          <State/>
        </span>}
      </div>
    )
  }

}

export default Pane
