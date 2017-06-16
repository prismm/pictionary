import React from 'react';
import Header from './components/Header.jsx'
import Room from './components/Room.jsx'

export default class AppContainer extends React.Component {
    render(){
        return (
            <div className="AppContainer">
                <Header />
                <Room />
            </div>
        )
    }
}