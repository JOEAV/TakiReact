import React from 'react';
import {Component} from 'react'
import './css/stage.css'
import Player from "./Player"
import GameRow from "./GameRow"


export default class Stage extends Component{
    render(){
        return(
            <div id='mainContent'>
                <Player player={this.props.players[1]} owner={'algo'} className='cardsRowAlgo' />
                <GameRow className='gameDeckRow'
                    gameDeck = {this.props.gameDeck}
                    pot = {this.props.pot}
                    activePlayer={this.props.activePlayer}

                />
                <Player player={this.props.players[0]} owner={'player'} className='cardsRowPlayer' />
            </div>
        )
    }
}