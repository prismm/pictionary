import React from 'react'

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state.cards = [
            "sunflower",
            "wood",
            "rocking chair",
            "volcano",
            "braid",
            "cucumber",
            "drums",
            "heel",
            "dolphin",
            "pineapple",
            "tissue",
            "glove",
            "map",
            "penguin",
            "seahorse",
            "knee",
            "pizza",
            "river",
            "tricycle",
            "globe",
            "pool",
            "batteries",
            "cello",
            "bagel",
            "sailboat",
            "coconut"
        ];
        this.state.currentCard = null;
        this.showCard = this.showCard.bind(this);
        this.state.yourTurn = true;
    }

    showCard(){
        let randInd = Math.random() * this.state.cards.length;
        return (<h3>{this.state.cards[randInd]}</h3>);
    }

    timer(){
       setTimeout(()=>{alert("Out of Time!")}, 60000);
       this.setState({yourTurn: false})
    }

    render(){
        return(
            <div className="card">
                <button onClick={this.showCard}></button>
            </div>
        )
    }
}