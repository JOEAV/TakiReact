import React from 'react';
import {Component} from 'react'
import './css/card.css'

export default class Card extends Component{
    constructor(props){
    super(props)
        this.state={
            style:{
            backgroundImage: this.props.behaviour.backgroundShown
                ? `url(./img/${this.props.rank}_${this.props.color}.png)`
                : `url(./img/card_back.png)`
         }
        }
    }


    translateClassed(classesArray,cardScope){
        let translate=(classesArray,cardScope) =>{
            let classes = '';
            classesArray[`${cardScope}`].forEach(styleClass => {
                classes = `${classes} ${styleClass}`;
                 })

            return classes;
        }
        return translate(classesArray,cardScope);
    }


    render(){
        return(
                    <span  style = {this.state.style} className={this.translateClassed(this.props.behaviour.styleClasses,'cardWrapper')}>
                        <span className={this.translateClassed(this.props.behaviour.styleClasses,'cardBase')}>
                        </span>
                    </span>
        )

    }
}