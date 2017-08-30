import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {ContextMenu, Item, Separator, IconFont} from 'react-contexify';
import {addEntity} from '../actions/EntityActions';

const uuid = require('uuid/v4')

class BattlefieldContextMenu extends React.Component {
  addEntity(parent, event, data) {
    console.log(event);
    this.props.addEntity(uuid(), data.coordinate.get('x'), data.coordinate.get('y'));
  }

  render() {
    return (
      <ContextMenu id="battlefield_contextmenu">
        <Item onClick={this.addEntity}>
          Add Entity
        </Item>
      </ContextMenu>
    )
  }
}

BattlefieldContextMenu.propTypes = {
  addEntity: PropTypes.func
}

export default connect(null, {
  addEntity
})(BattlefieldContextMenu);
