import React from 'react';

export default class Guesses extends React.Component {
    constructor(props){
        super(props)
    }

    //method to identify correct guess and freeze guessing? 

    render(){
        return (
            //socket.io stuff?
            <div className="guesses">
                <h3>GUESSES</h3>
            </div>
        )
    }
}