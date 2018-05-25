import React from 'react';
import {Component} from 'react'
import './css/player.css'
import Deck from './Deck'
export default class Player extends Component{
    render(){
        return(
            <div>
                <Deck cards={this.props.player.deck ? this.props.player.deck : []} owner={this.props.owner} droppable={false}/>
            </div>
        )

    }
}