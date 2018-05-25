import React from 'react';
import {Component} from 'react'
import './css/gameRow.css'

import Pot from './Pot'
import GameDeck from './GameDeck'
import TurnIndicator from './TurnIndicator'

export default class GameRow extends Component{
    render(){
        return(
            <div>
                <TurnIndicator background={this.props.backgroundClass}/>
                <Pot/>
                <GameDeck />
            </div>
        )
    }
}