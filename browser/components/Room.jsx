import React, { Component } from 'react';
import {connect} from 'react-redux';
//import * as actions from '../stateActions';
import Header from './Header'
import Whiteboard from './Whiteboard';
import ColorSelector from './ColorSelector';
import Card from './Card';
import YourGuess from './YourGuess';
import Guesses from './Guesses';
import Timer from './Timer';
import Players from './Players';
import { addPlayer, removePlayer, playerList } from '../stateActions'
const socket = io(window.location.origin);

class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: [],
            yourTurn: props.yourTurn,
            timeRemaining: 60,
        }
        this.startTurn = this.startTurn.bind(this);
        this.tick = this.tick.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.updatePlayersFromSockets = this.updatePlayersFromSockets.bind(this);
        
        socket.on('addPlayer', (playerlist) => {  
            console.log("HOW MANY TIMES IS THIS HAPPENING?") 
            this.updatePlayersFromSockets(playerlist);
        })

        // socket.on('receiveGuess', (guess) => {   
        //     this.updateGuessFromSockets(guess)
        // }
        
    }

    componentDidMount(){
        socket.emit('joinRoom', true)
        socket.on('addPlayer', (playerlist) => {
            console.log("HOW MANY TIMES IS this HAPPENING?") 
            this.props.dispatchPlayerList(playerlist);
            this.setState({players: playerlist})
            this.updatePlayersFromSockets(playerlist);
        })
    }

    updatePlayersFromSockets(playerlist){
        console.log("IS THIS EVERY HAPPENING AT ALL??????")
        this.setState({players: playerlist})
        console.log(this.state.players)
    }

    // updateGuessFromSockets(guess){
        //
    // }

    // componentWillReceiveProps(nextProps) {  
    //     socket.emit('joinRoom', true)
    // }

    // componentWillUnmount() {  
    //     socket.emit('leaveRoom', true);
    //     this.props.dispatchRemovePlayer()
    // }
    tick(){
        this.setState({timeRemaining: this.state.timeRemaining - 1});
        if (this.state.timeRemaining < 0) {
            clearInterval(this.interval);
            this.setState({yourTurn: false, timeRemaining: false})
        }
    }

    startTurn(){
        this.setState({yourTurn: true, timeRemaining: 60});
        this.interval = setInterval(this.tick, 1000)
    }

    nextTurn(){
        //switch yourTurn to next player
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        console.log("PROPS ON ROOM", this.props)
        return (
            <div className="Room">
                <Whiteboard />
                {this.state.yourTurn ? 
                    (
                        <div className="your-turn-elements">
                            <Card />
                            <ColorSelector />
                            <button className="pure-button" onClick={this.startTurn}>START</button>
                        </div>
                    ) 
                    : <div className="clear-both"></div>
                }
                <Players players={this.props.players}/>
                <Guesses />
                
                <Timer timeRemaining={this.state.timeRemaining} />
                <YourGuess />
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


export default connect(mapStateToProps, mapDispatchToProps)(Room)