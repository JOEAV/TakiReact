import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import Statistics from './Statistics';
export default class TopBar extends Component{
    render(){
        return(
            <div>
                <Statistics totalMoves={this.props.totalMoves}
                            avgMoveTime={this.props.avgMoveTime}
                            reachedLastCard={this.props.reachLastCard}
                            timeElapsed={this.props.timeElapsed}/>
                <button id="restart-button"  title='click' name='click1' onClick={(event)=>console.log('clicked')}>restart</button>
            </div>
        )


    }


}
