import React from 'react';
import Header from './components/Header.jsx'
import Room from './components/Room.jsx'
import { buildPlayerList } from './socket/app'
const socket = io(window.location.origin);
import { connect } from 'react-redux';

class AppContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inRoom: false,
        }
        this.joinRoom = this.joinRoom.bind(this);
    }

    joinRoom(){
        this.setState({inRoom: true})
    }
    
    render(){
        return (
            <div className="AppContainer">
                <Header />
                {this.state.inRoom ? 
                    <Room yourTurn={false} /> 
                    : 
                    <button className="pure-button" onClick={this.joinRoom}>JOIN GAME</button>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ players }) => ({ players })


export default connect(mapStateToProps)(AppContainer)