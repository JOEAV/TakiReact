import React from 'react';
import {Component} from 'react'
import './css/pot.css'
import Deck from './Deck'
export default class Pot extends Component{
    render(){
        return(
            <div>
                <Deck owner='pot' />
            </div>
        )

    }
}