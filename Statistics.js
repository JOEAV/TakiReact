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
                <button id="restart-button"  title='click' name='click1' onClick={(event)=>test()}>restart</button>
            </div>
        )


    }


}