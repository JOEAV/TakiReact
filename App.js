import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import {gameManager} from "./js/Logic/GameManager.js";
import TopBar from "./TopBar"
import {registerListener,initGame} from "./js/Controllers/controller"
export default class App extends Component{
    constructor(){
        super();
        this.state={
            gameDeck:null,
            players:null,
            pot:null,
            activePlayer:0,
            timerElapsed:null,
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
        initGame();
    }

    componentDidMount(){
        registerListener(this);
    }

    render(){
        return(
            <div>
            <TopBar totalMoves={this.state._totalMoves}
                    avgMoveTime={this.state.players[0].avgMovesTime}
                    reachedLastCard={this.state.players[0].reachLastCard}
                    timeElapsed={this.state.timer}
            />
        </div>
    )}
}


const NoWinner=-1;