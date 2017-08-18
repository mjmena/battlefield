import React from 'react';
import {connect} from 'react-redux';

const PlayerList = ({players, localPlayer}) => {
	return (<div>
      {players.map((player) => {
		return (<Player key={player.get("id")} player={player} selected={player === localPlayer} />)
      }).toList()}
 	</div>)
}

const Player = ({player, selected}) => {
	return (
		<div style={selected ? {fontWeight:"bold"} : {}}>
			<span style={{color: player.get("selectedColor")}}>{player.get("name")}</span>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		players: state.get("players"),
		localPlayer: state.get("players").get(state.getIn(["local", "id"]))
	}
}

export default connect(mapStateToProps)(PlayerList);