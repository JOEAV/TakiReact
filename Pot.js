import React from 'react';
import {Component} from 'react'
import './css/main.css'
import Deck from './Deck'
import {registerPotRef, onCardDroppedHandler} from "./js/Controllers/controller";
export default class Pot extends Component{


    dropHandler(e){
        onCardDroppedHandler(e)
    }
    allowDrop(e) {
        e.preventDefault();
    }
    componentDidMount(){
        registerPotRef();
    }
    render(){

        return(

            <div className={`potContainer` } onDragOver={this.allowDrop} onDrop={this.dropHandler} style={{zIndex:this.props.containerZIndex}}>
                <Deck owner='pot' cards={this.props.pot._cardArray}
                      replayMode={this.props.replayMode} />
            </div>
        )

    }
}