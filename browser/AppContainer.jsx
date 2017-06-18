import React from 'react';
import Header from './components/Header.jsx'
import Room from './components/Room.jsx'
import { buildPlayerList } from './socket/app'
const socket = io(window.location.origin);
import { addPlayer, removePlayer, playerList } from './stateActions'
import { connect } from 'react-redux';

class AppContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inRoom: false,
            playerlist: []
        }
        this.joinRoom = this.joinRoom.bind(this);
    }

    componentDidMount(){
        socket.on('addPlayer', (playerlist, player) => {
            this.setState({playerlist: playerlist});
            console.log("PLAYERLIST ON STATE", this.state.playerlist)
            this.props.dispatchPlayerList(playerlist);
        })
    }

    joinRoom(){
        socket.emit('joinRoom', true)
        this.setState({inRoom: true})


        // socket.on('removePlayer', (playerlist, player) => {
        //     this.props.dispatchRemovePlayer(player);
        // })
    }
    
    render(){
        return (
            <div className="AppContainer">
                <Header />
                {this.state.inRoom ? 
                    <Room players={this.state.playerlist} yourTurn={false} /> 
                    : 
                    <button className="pure-button" onClick={this.joinRoom}>JOIN GAME</button>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ players }) => ({ players })
const mapDispatchToProps = dispatch => ({ 
    dispatchAddPlayer: (player) => dispatch(addPlayer(player)),
    dispatchRemovePlayer: (player) => dispatch(removePlayer(player)),
    dispatchPlayerList: (listOfPlayers) => dispatch(playerList(listOfPlayers))
 })


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)