import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import {gameManager} from "./js/Logic/GameManager.js";
import TopBar from "./TopBar"
import {registerListener} from "./js/Controllers/controller"
export default class App extends Component{
    constructor(){
      super();
      this.state={
          gameDeck,
        players,
        pot,
        activePlayer,
        timerElapsed,
        howMany2Plus,
        lastTime,
        nowTime,
        animationDelayCounter,
        _isTakiMode,
        _winner,
          restarted,
          _totalMoves,

      }
    }

    componentDidMount(){
        registerListener(this);
    }

    render(){
        return(
                <div>
                    <TopBar statistics={this.state._totalMoves} />
                </div>
        )}
}

import timer from 'Timer'

const NoWinner=-1;
