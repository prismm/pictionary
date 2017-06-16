import React from 'react';
import Header from './components/Header.jsx'
import Room from './components/Room.jsx'
import { buildPlayerList } from './socket/app'

export default class AppContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            playerList: buildPlayerList()
        }
        console.log(this.state.playerList)
    }
    
    render(){
        return (
            <div className="AppContainer">
                <Header />
                <Room yourTurn={false} playerList={this.state.playerList} />
            </div>
        )
    }
}