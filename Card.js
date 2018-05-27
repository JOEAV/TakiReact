import React from 'react';
import {Component} from 'react'
import './css/card.css'
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
            behaviour:this.props.behaviour,
            actions: this.props.actions
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

    preventCardInnerDrag(event){
        event.preventDefault();

    }

    render(){
        return(

                    <span  id={this.props.id} style = {this.state.style} className={this.translateClasses(this.state.behaviour.styleClasses,'cardWrapper')}
                           onDragStart={this.props.behaviour.draggable ? this.props.actions.dragStartHandler : null} draggable={this.props.behaviour.draggable}
                           onDragEnd={this.props.behaviour.draggable ? this.props.actions.dragStoppedHandler : null}
                           rank={this.props.rank} color={this.props.color}
                    >

                            <span  className={this.translateClasses(this.state.behaviour.styleClasses,'cardBase')}
                                  // draggable={this.props.behaviour.draggable} onDragStart={this.props.behaviour.draggable ? this.props.actions.dragStartHandler : null}
                             draggable={this.props.behaviour.draggable ? true : false}  onDragStart={this.props.behaviour.draggable ? this.props.actions.dragStartHandler : null}  onDragEnd={this.props.actions.dragStoppedHandler}>
                        </span>
                    </span>
        )

    }
}