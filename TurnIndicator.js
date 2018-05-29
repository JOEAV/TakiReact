import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/card.css'
import './css/TakiPopup.css'
import {TakiModeclickEventListener} from './js/Controllers/controller'
export default class TurnIndicator extends Component{
    shouldComponentUpdate(nextProps){
        if(nextProps.activePlayer && nextProps.activePlayer !== this.props.activePlayer){
            return true
        } else{
            return false
        }
    }
    fireTakiAnimation(){
        return `scaleColorAnimation${this.props.fireTakiColorAnimation}`
    }

    setTurnIndicatorBackground(){
        let classNames="";
        if(this.props.isTakiMode){
            classNames= `turnIndicatorTakiOn`
        } else{
            classNames =  this.props.activePlayer===0 ? `turnIndicator backgroundImageBoy` : `turnIndicator backgroundImageRobot`
        }
        return classNames;


    }
    render(){

        return(
            <div id={'turnIndicatorContainer'}>
                <div className={this.setTurnIndicatorBackground()} style={{zIndex:100}} onClick={this.props.isTakiMode ? TakiModeclickEventListener : null}/>
                <div className={`takiInteractionActive ${this.props.takiMode ?  this.fireTakiAnimation() : ""}`}/>
            </div>
        )

    }
}