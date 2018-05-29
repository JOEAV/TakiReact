import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/card.css'

import Pot from './Pot'
import GameDeck from './GameDeck'
import TurnIndicator from './TurnIndicator'

export default class GameRow extends Component{
    render(){
        return(
            <div className={'gameDeckRow'}>
                <TurnIndicator activePlayer={this.props.activePlayer} isTakiMode={this.props.isTakiMode} takiAnimationColor={this.props.userInteractionsEvents.fireTakiColorAnimation}/>
                <Pot pot = {this.props.pot}  containerZIndex={this.props. containerZIndex}/>
                <GameDeck gameDeck = {this.props.gameDeck} containerZIndex={this.props. containerZIndex} />
            </div>
        )
    }
}
