import React from 'react';
import {Component} from 'react'
import './css/main.css'
import Player from "./Player"
import GameRow from "./GameRow"
import Popup from "./Popup"
import {shouldRenderStopCardInstruction} from "./js/Controllers/controller"
export default class Stage extends Component{

    mapInstructions(props){
       if (props.replayMode===false && props.isTakiMode===false) {
           switch (this.props.pot.getTopCardValue().rank) {

               case 'plus':
                   return 'You have another turn'
               case '2plus':
                   if (props.howMany2Plus>0) {
                       return 'Put another +2 or take cards from the deck'
                   }
                   else{
                       return ''
                   }
               case 'stop':
                   if(shouldRenderStopCardInstruction()){
                       return 'you stopped your opponent play again'

                   }
                   break;
               default:
                   return ''
           }
       }
       return'';

    }

    render(){
        return(
            <div id='mainContent'>
                <Popup renderChooseColor = {this.props.userInteractionsEvents.chooseColorCardDropped} renderStatistics={this.props.winner !== -1} players={this.props.players} winner={this.props.winner}/>
                <Player player={this.props.players[1]} owner={'algo'} containerZIndex = {this.props.isTakiMode ? 100 : 1}  replayMode={this.props.replayMode} layout={'row'} />
                <GameRow userInteractionsEvents={this.props.userInteractionsEvents}
                    gameDeck = {this.props.gameDeck}
                    pot = {this.props.pot}
                    activePlayer={this.props.activePlayer}
                         containerZIndex = {this.props.isTakiMode ? 100 : 1}
                         isTakiMode={this.props.isTakiMode}
                         replayMode={this.props.replayMode}
                />
                <h1 id="cardInstructions">{this.mapInstructions(this.props)}</h1>

                <Player player={this.props.players[2]} owner={'algo'} containerZIndex = {this.props.isTakiMode ? 100 : 1}  replayMode={this.props.replayMode} layout={'col'}/>
                <Player player={this.props.players[3]} owner={'algo'} containerZIndex = {this.props.isTakiMode ? 100 : 1}  replayMode={this.props.replayMode} layout={'col'} />


                <Player  player={this.props.players[0]} owner={'player'} containerZIndex = {this.props.isTakiMode ? 100 : 1} replayMode={this.props.replayMode} layout={'col'}
                         activeDescription={this.props.activePlayer===0?
                             'Active':
                             'NonActive'}/>
            </div>
        )
    }
}