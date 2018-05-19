import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import {gameManager} from "./js/Logic/GameManager.js";
import TopBar from "./TopBar"
import {registerListener,initGame} from "./js/Controllers/controller"
import timeToString from './js/serviceUtils/timeUtils'
export default class App extends Component{
    constructor(){
        super();
        this.state={
            gameDeck:null,
            players:null,
            pot:null,
            activePlayer:0,
            timeElapsed:null,
            howMany2Plus:null,
            lastTime:null,
            nowTime:null,
            animationDelayCounter:null,
            _isTakiMode:false,
            _winner:-1,
            restarted:false,
            _totalMoves:0,
            timer:null,

        }
    }

    componentWillMount(){
        registerListener(this);
        initGame();
    }


    render(){

        return(
            <div>
            <TopBar totalMoves={this.state._totalMoves}
                    avgMovesTime={timeToString(this.state.players[0].avgMovesTime)}
                    reachedLastCard={this.state.players[0].reachedLastCard}
                    timeElapsed={this.state.timer}
            />
        </div>
    )}
}


const NoWinner=-1;