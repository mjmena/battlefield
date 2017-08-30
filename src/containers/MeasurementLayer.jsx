import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import Measurement from '../components/Measurement';

class MeasurementLayer extends React.Component {
  render() {
    const measurements = this.props.players.map((player) => {
      const measurement = player.get('measurement');
      if (measurement) {
        return <Measurement key={player.get('id')} {...measurement.toJSON()} cellSize={this.props.cellSize} color={player.get('color')}></Measurement>
      } else return null;
    }).toList();

    return <g>{measurements}</g>
  }
}

MeasurementLayer.propTypes = {
  players: PropTypes.instanceOf(Immutable.Map),
  cellSize: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    players: state.get("players"),
    cellSize: state.getIn(["grid", "cellSize"]),
  }
}

export default connect(mapStateToProps)(MeasurementLayer);
