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


export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            yourTurn: props.yourTurn,
            timeRemaining: 60
        }
        this.startTurn = this.startTurn.bind(this);
        this.tick = this.tick.bind(this);
    }

    tick(){
        this.setState({timeRemaining: this.state.timeRemaining - 1});
        if (this.state.timeRemaining < 0) {
            clearInterval(this.interval);
            this.setState({yourTurn: false, timeRemaining: "TIMEOUT"})
        }
    }

    startTurn(){
        this.setState({yourTurn: true, timeRemaining: 60});
        this.interval = setInterval(this.tick, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        return (
            <div className="Room">
                <Whiteboard />
                <ColorSelector />
                <button className="pure-button" onClick={this.startTurn}>START</button>
                <Timer timeRemaining={this.state.timeRemaining} />
            </div>
        )
    }
}

/*
                <Header />
                <p>Hello Room!</p>
                <Whiteboard />
                <ColorSelector />
                {this.state.yourTurn ? (<Card />) : (<YourGuess />)}
                <Guesses />
                */

// function mapStateToProps(state){
//     return state;
// }

// function mapDispatchToProps(dispatch){
//     return actions;
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Room);
