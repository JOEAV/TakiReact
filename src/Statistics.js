import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import {test} from './js/Controllers/controller'
import {StatsFragment} from './StatsFragment'

export default class Statistics extends Component{
    constructor(){
        super();
        this.state={
            time:gameManager.timerElapsed,

        }
    }


    render(){

        return(
            <div>
                {/*<StatsFragment title="Avg Move Time" val={this.props.statistics.avgMovetime}/>*/}
                {/*<StatsFragment title="Reached last card" val={this.props.statistics.reachedlastCard}/>*/}
                {/*<StatsFragment title="Total Moves"  val={this.props.statistics.numOfTurns} />*/}
                {/*<StatsFragment title="Time Elapsed" val={this.props.statistics.timerElapsed} />*/}
                <StatsFragment title="Time Elapsed" val={this.props._totalMoves} />
                <button onClick-=test/>
            </div>
        )


    }


}