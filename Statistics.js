import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import {test} from './js/Controllers/controller.js'
import StatsFragment from './StatsFragment'

export default class Statistics extends Component{
    render(){
        console.log("Total ",this.props._totalMoves)
        return(
            <div>
                <StatsFragment title="Total Moves" val={this.props.totalMoves} />
                <StatsFragment title="Avg Moves Time" val={this.props.avgMoveTime} />
                <StatsFragment title="Reached Last Card" val={this.props.reachLastCard} />
                <StatsFragment title="Time ELapsed" val={this.props.timeElapsed.timeElapsed} />

            </div>
        )


    }


}