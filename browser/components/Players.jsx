import React, { Component } from 'react';

export default class Players extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
                <div className="player-list"> 
                    <h3>PLAYERS</h3>
                    <ul>
                    {this.props.players && this.props.players.length ? 
                    this.props.players.map((player, index) => {
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
}