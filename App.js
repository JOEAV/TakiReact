import React from 'react';
import {Component} from 'react'
import {gameManager} from "./js/Logic/GameManager.js";
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
            timeElapsed:null,
            howMany2Plus:null,
            //TODO:refactor this
            animationDelayCounter:null,

            _isTakiMode:false,
            _winner:-1,
            restarted:false,
            _totalMoves:0,
            timer:null,


            userInteractionsEvents:{
                chooseColorCardDropped:false,

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
            <TopBar totalMoves={this.state._totalMoves}
                    avgMovesTime={timeToString(this.state.players[0].avgMovesTime)}
                    reachedLastCard={this.state.players[0].reachedLastCard}
                    timeElapsed={this.state.timer.timeElapsed}
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
            />
        </div>
    )}
}


const NoWinner=-1;