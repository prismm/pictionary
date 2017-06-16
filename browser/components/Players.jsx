import React from 'react';
import { fetchPlayers } from '../stateActions';
import { connect } from 'react-redux';

const Players = (props) => {
    return (
        <div className="player-list"> 
            <h3>PLAYERS</h3>
            <ul>
                {props.players && props.players.length ? 
                props.players.map((player, index) => {
                    if (player.yourTurn){
                        return <li key={ index } className="your-turn">{ player.name }</li> 
                    }
                    else {
                        return <li key={ index }>{ player.name }</li>
                    }
                    }) :
                    <li>NO PLAYERS CONNECTED</li>
                }
            </ul>
            </div>
        )
}

const mapStateToProps = ({ players }) => ({ players })

// function mapDispatchToProps(dispatch){
//     return dispatch;
// }

export default connect(mapStateToProps)(Players)