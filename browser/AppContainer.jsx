import React from 'react';
import Header from './components/Header.jsx'
import Room from './components/Room.jsx'
import { buildPlayerList } from './socket/app'
const socket = io(window.location.origin);

export default class AppContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            playerList: []
        }
        console.log("PLAYER LIST PRINTING FROM APP CONTAINER", this.state.playerList)
    }

    componentDidMount(){
        socket.emit('appContainerMounted', true)
        socket.on('players', playerList => {
            console.log("RECEIVING PLAYER LIST", playerList);
            this.setState({playerList})
        })
    }

    // (){
    //     socket.emit('appContainerMounted', true)
    //     socket.on('players', playerList => {
    //         console.log("RECEIVING PLAYER LIST", playerList);
    //         this.setState({playerList})
    //     })
    // }
    
    render(){
        return (
            <div className="AppContainer">
                <Header />
                <Room yourTurn={false} playerList={this.state.playerList} />
            </div>
        )
    }
}

