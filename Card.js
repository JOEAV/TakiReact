import React from 'react';
import {Component} from 'react'
import './css/card.css'
import {foo} from './js/Controllers/controller.js'
export default class Card extends Component{
    constructor(props){
    super(props)
        this.state={
            style: Object.assign({},this.props.style,
                {
                    backgroundImage: this.props.behaviour.backgroundShown
                ? `url(./img/${this.props.rank}_${this.props.color}.png)`
                : `url(./img/card_back.png)`
                }
            ),
            behaviour:this.props.behaviour
        }
    }


    translateClasses(classesArray,cardScope){
        let translate=(classesArray,cardScope) =>{
            let classes = '';
            classesArray[`${cardScope}`].forEach(styleClass => {
                classes = `${classes} ${styleClass}`;
                 })

            return classes;
        }
        return translate(classesArray,cardScope);
    }


    componentDidMount(){
        this.state.behaviour.initBehaviours(this)
    }

    render(){
        return(

                    <span  style = {this.state.style} className={this.translateClasses(this.state.behaviour.styleClasses,'cardWrapper')}>
                        <span className={this.translateClasses(this.state.behaviour.styleClasses,'cardBase')}>
                        </span>
                    </span>
        )

    }
}