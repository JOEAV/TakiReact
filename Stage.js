import React from 'react';
import {Component} from 'react'
import './css/stage.css'
import Player from "./Player"
import GameRow from "./GameRow"
import Popup from "./Popup"


export default class Stage extends Component{



    shouldComponentUpdate(nextProps){
        let propChanged=false;

        for (const index in nextProps) {

            if (!Object.is(nextProps[index],this.props[index])) {
                propChanged=true
                console.log(index, this.props[index], '-->', nextProps[index]);
            }
        }
        return propChanged
    }


    render(){

        return(
            <div id='mainContent'>
                <Popup renderChooseColor = {this.props.userInteractionsEvents.chooseColorCardDropped} renderStatistics={this.props.winner !== -1}/>
                <Player player={this.props.players[1]} owner={'algo'}  />
                <GameRow userInteractionsEvents={this.props.userInteractionsEvents}
                    gameDeck = {this.props.gameDeck}
                    pot = {this.props.pot}
                    activePlayer={this.props.activePlayer}

                />
                <Player  player={this.props.players[0]} owner={'player'}
                         activeDescription={this.props.activePlayer===0?
                             'Active':
                             'NonActive'}/>
            </div>
        )
    }
}