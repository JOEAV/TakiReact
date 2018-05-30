import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import Statistics from './Statistics';
import {endGame} from './js/Controllers/controller'
import './css/topBar.css'
export default class TopBar extends Component{
    render(){
        return(

            <div id='topBar'>
                <Statistics totalMoves={this.props.totalMoves}
                            avgMovesTime={this.props.avgMovesTime}
                            reachedLastCard={this.props.reachedLastCard}
                          />
               <button className="surrender-button"  title='click' name='click1' onClick={endGame}>surrender</button>
            </div>
        )


    }


}
