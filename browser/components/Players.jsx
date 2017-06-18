import React from 'react';
import { fetchPlayers } from '../stateActions';
import { connect } from 'react-redux';
import { addPlayer, removePlayer } from '../stateActions'
// const socket = io(window.location.origin);
import { buildPlayerList } from '../socket/app'


export default function Players(props){

        return (
            <div className="player-list"> 
                <h3>PLAYERS</h3>
                <ul>
                    {props.players && props.players.length ? 
                    props.players.map((player) => {
                        if (player.yourTurn){
                            return <li key={ player.id } className="your-turn">{ player.name }</li> 
                        }
                        else {
                            return <li key={ player.id }>{ player.name }</li>
                        }
                        }) :
                        <li>NO PLAYERS CONNECTED</li>
                    }
                </ul>
                </div>
            )

}



// const mapDispatchToProps = dispatch => ({ 
//     dispatchAddPlayer: (player) => dispatch(addPlayer(player)),
//     dispatchRemovePlayer: (player) => dispatch(removePlayer(player))
//  })

// export default connect(mapStateToProps)(Players)

//how to dispatch an action to the store: invoke dispatch on action creator
//dispatch(actionCreator(payload))