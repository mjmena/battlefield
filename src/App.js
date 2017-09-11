import React from 'react';

import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import Battlefield from './containers/Battlefield';
import Pane from './components/Pane'
import { DragDropContextProvider } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend'
import DragPreviewLayer from './components/DragPreviewLayer';

const PlayerApp = ({store}) => {
  return (
    <Provider store={store}>
      <span>
        <DragDropContextProvider backend={MouseBackEnd}>
          <span>
            <Battlefield/>
            <DragPreviewLayer />
          </span>
        </DragDropContextProvider>
        <Pane></Pane>
      </span>
    </Provider>
  )
}

PlayerApp.propTypes = {
  store: PropTypes.object
}

export default PlayerApp
