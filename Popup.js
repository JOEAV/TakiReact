import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/chooseColor.css'
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
                <div/>
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