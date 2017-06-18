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
            <div className="your-guess">
                <form>
                    <span>Submit your guesses here: </span>
                    <input type="text" onMouseEnter={this.submitGuess} />
                </form>
            </div>
        )
    }
}
