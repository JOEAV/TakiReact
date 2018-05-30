import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/chooseColor.css'
import './css/endGame.css'
import {handleColorChoosed}  from "./js/Controllers/controller";
export default class Popup extends Component{

    constructor(props){
        super(props)
        this.state={

        }
    }

    onColorChoosed(event){
        handleColorChoosed(event)
    }
    mapPopupTypeToJsx(){
        if  (this.props.renderChooseColor){
            return(
                <div id="popup" style={{display:'block'}}>
                    <div className="popupContent">
                        <div className="popupHeader">Color Chooser</div>
                        <div className="colorOption" color="blue" id="squareBlue" onClick={this.onColorChoosed} />
                        <div className="colorOption" color="green" id="squareGreen" onClick={this.onColorChoosed} />
                        <div className="colorOption" color="yellow" id="squareYellow" onClick={this.onColorChoosed}/>
                        <div className="colorOption" color="red" id="squareRed" onClick={this.onColorChoosed}/>
                    </div>
                </div>
            )
        } else if(this.props.renderStatistics){
            return(
                <div id="endGamePopupContainer" display="none">
                    <div className="endGamePopupHeader" style="display: flex;">Game Statistics</div>
                    <div className="endGamePopupBody" color="blue">
                        <div id="winner">You Loose!</div>
                        <div id="endGameStats">
                            <div id="myStats">
                                <div id="myStatHeader">My Stats</div>
                                <div id="myTotalAvgMoveTime" className="myStatsInfo"></div>
                                <div id="myAvgMoveTime" className="myStatsInfo">Avg. Move Time: 00:00:00</div>
                                <div id="myReachedLast" className="myStatsInfo">Last Card: 0</div>
                                <div id="myTotalMoves" className="myStatsInfo">Num Of Moves : 0</div>
                            </div>
                            <div id="algoStats">
                                <div id="algoStatHeader">Algo Stats</div>
                                <div id="algoTotalAvgMoveTime" className="algoStatsInfo"></div>
                                <div id="algoAvgMoveTime" className="algoStatsInfo">Avg. Move Time: 00:00:00</div>
                                <div id="algoReachedLast" className="algoStatsInfo">Last Card: 0</div>
                                <div id="algoTotalMoves" className="algoStatsInfo">Num Of Moves : 0</div>
                            </div>
                        </div>
                        <button id="restart-button" onClick="restartGame(event)">restart</button>
                    </div>
                </div>
            )
        }else {
            return(
                <div/>
            )
        }

    }


    render(){

        return( this.mapPopupTypeToJsx()   )

    }
}