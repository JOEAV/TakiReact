import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import Statistics from './Statistics';
import {surrender,restart,prev,next} from './js/Controllers/controller'
import './css/topBar.css'
export default class TopBar extends Component{

    extractJSX(){
        if (this.props.replayMode===false) {
            return(
                <div id='topBar'>
                    <Statistics totalMoves={this.props.totalMoves}
                                avgMovesTime={this.props.avgMovesTime}
                                reachedLastCard={this.props.reachedLastCard}
                    />
                    <button className="surrender-button" title='click' name='click1' onClick={surrender}>surrender</button>
                </div>
            )
        }
        else{
            return(
                <div id='topBar'>
                    <Statistics totalMoves={this.props.totalMoves}
                                avgMovesTime={this.props.avgMovesTime}
                                reachedLastCard={this.props.reachedLastCard}
                    />
                    <div id='topBarButtonsContainer'>
                        <button className="replay-button" title='click' name='click1' onClick={prev}>previous</button>
                        <button className="surrender-button" title='click' name='click1' onClick={restart}>restart</button>
                        <button className="replay-button" title='click' name='click1' onClick={next}>next</button>
                    </div>
                </div>
            )
        }
    }

    render(){
           return(
               <div id='topBar'>
                   <Statistics totalMoves={this.props.totalMoves}
                               avgMovesTime={this.props.avgMovesTime}
                               reachedLastCard={this.props.reachedLastCard}
                   />
                   {this.props.replayMode ? (<div id='topBarButtonsContainer'>
                                                 <button className="replay-button" title='click' name='click1' onClick={prev}>previous</button>
                                                <button className="surrender-button" title='click' name='click1' onClick={restart}>restart</button>
                                                <button className="replay-button" title='click' name='click1' onClick={next}>next</button>
                                            </div>)
                       :
                       (<button className="surrender-button" title='click' name='click1' onClick={surrender}>surrender</button>)}
               </div>
           )
    }


}
