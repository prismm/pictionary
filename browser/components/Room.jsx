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


export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            // players: [],
            yourTurn: props.yourTurn,
            timeRemaining: 60
        }
        this.startTurn = this.startTurn.bind(this);
        this.tick = this.tick.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
    }

 
    // componentWillReceiveProps(nextProps){
    //     // socket.emit('appContainerMounted', true)
       
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
                    : (<YourGuess />)
                }
                <Players players={this.props.players}/>
                <Timer timeRemaining={this.state.timeRemaining} />
                <Guesses />
            </div>
        )
    }
}


// function mapStateToProps(state){
//     return state;
// }

// function mapDispatchToProps(dispatch){
//     return actions;
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Room);
