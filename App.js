import React from 'react';
import {Component} from 'react'
import TopBar from "./TopBar"
import Stage from "./Stage"
import './css/main.css'
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
            howMany2Plus:0,
            //TODO:refactor this
            animationDelayCounter:null,
            replayMode:false,
            _isTakiMode:false,
            _winner:-1,
            restarted:false,
            _totalMoves:0,
            timer:null,
            timeElapsed:null,

            userInteractionsEvents:{
                chooseColorCardDropped:false,
                fireTakiColorAnimation: 'none',
                endGame:false
            }

        }
    }

    componentWillMount(){
        registerListener(this);
        initGame();
    }



    render(){

        return(
            <div>
            <TopBar totalMoves={this.state.players[0]._moves+this.state.players[1]._moves}
                    avgMovesTime={timeToString(this.state.players[this.state.activePlayer].avgMovesTime,true)}
                    reachedLastCard={this.state.players[this.state.activePlayer].reachedLastCard}
                    timeElapsed={this.state.timeElapsed}
                    replayMode={this.state.replayMode}
                    isTakiMode={this.state._isTakiMode}
            />
            <Stage
                userInteractionsEvents={this.state.userInteractionsEvents}
                gameDeck = {this.state.gameDeck}
                players = {this.state.players}
                pot = {this.state.pot}
                activePlayer={this.state.activePlayer}
                howMany2Plus = {this.state.howMany2Plus}
                isTakiMode={this.state._isTakiMode}
                winner={this.state._winner}
                replayMode={this.state.replayMode}

            />
        </div>
    )}
}


const NoWinner=-1;