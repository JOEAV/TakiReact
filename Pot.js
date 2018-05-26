import React from 'react';
import {Component} from 'react'
import './css/main.css'
import Deck from './Deck'
export default class Pot extends Component{
    render(){
        return(
            <div className='potContainer'>
                <Deck owner='pot' cards={this.props.pot.deck} />
            </div>
        )

    }
}