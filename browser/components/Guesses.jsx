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
                <p>Guesses will display here</p>
            </div>
        )
    }
}