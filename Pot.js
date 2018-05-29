import React from 'react';
import {Component} from 'react'
import './css/main.css'
import Deck from './Deck'
import {notifyCardIsDragged, onCardDroppedHandler} from "./js/Controllers/controller";
export default class Pot extends Component{




    dropHandler(e){
        onCardDroppedHandler(e)
    }
    allowDrop(e) {
        e.preventDefault();
        notifyCardIsDragged(false)
    }
    render(){

        return(

            <div className={`potContainer ${this.props.animation ? 'potFadeInAnimation' : '' }` } onDragOver={this.allowDrop} onDrop={this.dropHandler}>
                <Deck owner='pot' cards={this.props.pot.deck} />
            </div>
        )

    }
}