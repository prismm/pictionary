import React from 'react';
import Header from './components/Header'
import Gameroom from './components/Room'

export default class App extends React.Component {
    render(){
        return (
            <div className="AppContainer">
                <Header />
                <p>Hello World!</p>
                <Gameroom />
            </div>
        )
    }
}