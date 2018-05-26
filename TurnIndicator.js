import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/card.css'
import './css/TakiPopup.css'

export default class TurnIndicator extends Component{
    render(){
        let background= this.props.activePlayer===0 ?
            'backgroundImageBoy':
            'backgroundImageRobot'
        return(
            <div id={'turnIndicatorContainer'}>
                <div className={`turnIndicator ${background}`} style={{zIndex:100}}/>
                <div className={'takiInteractionActive'}/>
            </div>
        )

    }
}