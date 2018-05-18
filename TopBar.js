import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import Statistics from './Statistics';
export default class TopBar extends Component{
    render(){
        return(
            <div>
                <Statistics statistics={this.props.statistics} />
                <button id="restart-button" hidden="true" onClick="restartGame(event)">restart</button>
            </div>
        )


    }


}
