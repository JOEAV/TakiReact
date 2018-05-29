import React from 'react';
import {Component} from 'react'
import './css/card.css'
import Deck from './Deck'
export default class GameDeck extends Component{
    render(){
        return(
            <div className={'gameDeckContainer'} style={{zIndex: this.props.containerZIndex}}>
                <Deck owner={'gameDeck'} cards={this.props.gameDeck.deck}></Deck>
            </div>
        )

    }
}