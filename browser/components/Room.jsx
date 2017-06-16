import React, { Component } from 'react';
import {connect} from 'react-redux';
//import * as actions from '../stateActions';
import Header from './Header'
import Whiteboard from './Whiteboard';
import ColorSelector from './ColorSelector';
import Card from './Card';
import YourGuess from './YourGuess';
import Guesses from './Guesses'


export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {yourTurn: false}
    }

    render(){
        return (
            <div className="Room">
                <Whiteboard />
                <ColorSelector />
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
