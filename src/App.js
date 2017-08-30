import React from 'react';

import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import Battlefield from './containers/Battlefield';
import ColorPicker from './containers/ColorPicker';
import PlayerList from './containers/PlayerList';
import State from './containers/State';
import Toolbar from './containers/Toolbar';
import {DragDropContext} from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';


const PlayerApp = ({store}) => {
  const pane = {
    position: "fixed",
    top: 0,
    right: 0,
    backgroundColor: "rgba(242,242,242,.5)",
    borderRadius: 25,
    padding: 25,
    zIndex:10,
    height:'100%',
    overflow:'scroll',
    width:"250px"
  }

  return (
    <Provider store={store}>
      <div>
        <div style={{
          vh: '100%',
          vw: '100%',
          margin: 0,
          padding: 0
        }}>
          <Battlefield/>
        </div>
        <div style={pane}>
          <PlayerList/>
          <Toolbar/>
          <ColorPicker/>
          <State/>
        </div>
      </div>
    </Provider>
  )
}

PlayerApp.propTypes = {
  store: PropTypes.object
}

export default DragDropContext(TouchBackend({enableMouseEvents:true}))(PlayerApp)
