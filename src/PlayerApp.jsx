import React from 'react';
import {Provider} from 'react-redux';

import Battlefield from './containers/Battlefield';
import ColorPicker from './containers/ColorPicker';
import EntityList from './containers/EntityList';
import PlayerList from './containers/PlayerList';
import State from './containers/State';
import Toolbar from './containers/Toolbar';

export default ({store}) => {
  const pane = {
    position: "fixed",
    top: 0,
    right: 0,
    backgroundColor: "rgba(60,60,60,.2)",
    borderRadius: 25,
    padding: 25,
    overflow: scroll
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
          <EntityList/>
          <State/>
        </div>
      </div>
    </Provider>
  )
}
