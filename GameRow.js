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
                <TurnIndicator background={this.props.backgroundClass}/>
                <Pot pot = {this.props.pot}/>
                <GameDeck gameDeck = {this.props.gameDeck}/>
            </div>
        )
    }
}
