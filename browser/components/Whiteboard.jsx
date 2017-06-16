import React from 'react';
import { runSocket } from '../socket/app'

export default class Whiteboard extends React.Component{
    componentDidMount(){
        runSocket(this.refs.canvasElem);
    }


    render(){
        return (
            <canvas id="paint" ref="canvasElem"></canvas>
        )
    }
}