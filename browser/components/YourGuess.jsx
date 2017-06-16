import React from 'react';

export default class YourGuess extends React.Component {
    constructor(props){
        super(props);
        this.submitGuess = this.submitGuess.bind(this);
    }

    submitGuess(){
        //socket.io stuff?
    }

    render(){
        return (
            <form>
                <p>Submit your guesses here</p>
                <input type="text" onMouseEnter={this.submitGuess} />
            </form>
        )
    }
}
