import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import {test} from './js/Controllers/controller.js'
import StatsFragment from './StatsFragment'

export default class Statistics extends Component{
    render(){
        console.log(this.props.avgMoveTime);
        return(
            <div>
                <StatsFragment title="Total Moves" val={this.props.totalMoves} />
                <StatsFragment title="Reached Last Card" val={this.props.reachedLastCard} />
                <StatsFragment title="Time Elapsed" val={this.props.timeElapsed.timeElapsed} />
            </div>
        )


    }


}