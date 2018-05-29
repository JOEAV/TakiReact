import React from 'react';
import {Component} from 'react'
import './css/main.css'
import Deck from './Deck'
import {registerPotRef, onCardDroppedHandler} from "./js/Controllers/controller";
export default class Pot extends Component{

    constructor(props){
        super(props);
        this.state = {
            fireAnimation:false,
        }
        this.allowDrop = this.allowDrop.bind(this);
    }
    componentWillMount(){
        registerPotRef(this);
    }
    dropHandler(e){
        onCardDroppedHandler(e)
    }
    allowDrop(e) {
        e.preventDefault();
    }
    render(){

        return(

            <div className={`potContainer ${this.state.fireAnimation ? 'potFadeInAnimation' : '' }` } onDragOver={this.allowDrop} onDrop={this.dropHandler}>
                <Deck owner='pot' cards={this.props.pot.deck} />
            </div>
        )

    }
}