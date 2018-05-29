import React from 'react';
import {Component} from 'react'
import Card from './Card'
import './css/card.css'


import {notifyCardIsDragged} from './js/Controllers/controller.js'
import {onCardHoverStart, onCardHoverEnd, handlePulledTopCardClick,onDragStart,onDragEnd} from "./js/Controllers/controller";

export default class Deck extends Component{
    constructor(props) {
        super(props);

        this.initBehaviours = this.initBehaviours.bind(this);
        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragStoppedHandler = this.dragStoppedHandler.bind(this);
        this.state = {
            owner: this.props.owner,
            deckCssName:this.getDeckCssName(),
            deckBehaviour: {
                droppable: this.props.droppable
            },
            cardsBehaviour: this.mapCardBehaviourByOwner(),
            actions:this.mapActionsByOwner(),
            deckCards:[],
            cardsRotationDegree:this.setRotationDegrees()
        }



    }

    getDeckCssName() {
        let res;
        switch (this.props.owner) {
            case 'playerActive':
            case 'playerNonActive':
                res = 'cardsRowPlayer';
                break;
            case 'algo':
                res = 'cardsRowAlgo';
                break;
            case 'pot':
                res = 'pot';
                break;
            case 'gameDeck':
                res = 'gameDeck';
                break;
        }
        return res;
    }

    mapCardBehaviourByOwner(){

        let defaultBehaviour = {
            clickable: false,
            backgroundShown: false,
            hoverable: false,
            draggable: false,
            rotateable:false,
            styleClasses: {
                cardWrapper: ['cardWrapper'],
                cardBase: ['cardBase']
            },
            spreadable:false,
            initBehaviours:this.initBehaviours
        }
        let newBehaviour = {
            clickable: false,
            backgroundShown: false,
            hoverable: false,
            draggable: false,
            rotateable : false,
            styleClasses: {
                cardWrapper: ['cardWrapper'],
                cardBase: ['cardBase']
            }
        }
        switch (this.props.owner) {
            case 'playerActive':
                newBehaviour.backgroundShown = true;
                newBehaviour.hoverable = true
                newBehaviour.draggable = true;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper=[...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']

                break;
            case 'playerNonActive':
                newBehaviour.backgroundShown = true;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper=[...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']

                break;
            case 'pot':
                newBehaviour.backgroundShown = true;
                newBehaviour.rotateable = true;
                newBehaviour.styleClasses.cardWrapper= [...newBehaviour.styleClasses.cardWrapper,'cardInsidePot']
                break;
            case 'gameDeck':
                newBehaviour.styleClasses.cardWrapper= [...newBehaviour.styleClasses.cardWrapper,'cardInsideGameDeck']
                break;
            case 'algo':
                newBehaviour.backgroundShown = false;
                newBehaviour.hoverable = false;
                newBehaviour.draggable = false;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper= [...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']
                break;
            default:
                throw new Error('no such owner !');

        }
        return Object.assign(defaultBehaviour, newBehaviour);

    }


    mapActionsByOwner(){
        let defaultsActions = {

        }

        let newActions = {

        }

        switch(this.props.owner){

            case 'playerActive':
            newActions.dragStartHandler = this.dragStartHandler;
            newActions.dragStoppedHandler = this.dragStoppedHandler;
            newActions.hoverStartHandler = this.hoverStartHandler;
            newActions.hoverStoppedHandler = this.hoverStoppedHandler;
            break;
            case 'gameDeck':
                newActions.clickHandler = this.clickHandler;
                break;
            default:
                break;
        }
        return Object.assign({},defaultsActions,newActions)


    }

    initBehaviours(cardRef) {
        let {owner} = this.state;
        let delayTime = (owner === 'gameDeck' || owner ===  'pot' ) ? 0 : 500

        return new Promise((resolve)=>{
            setTimeout(function () {
                let beforeSpeardStyleBehaviour = cardRef.state.behaviour
                //behaviours = css behaviours
                let newBehaviours = [];

                cardRef.props.topCard ? newBehaviours.push('topCardInGameDeck') : null
                beforeSpeardStyleBehaviour.spreadable ?  newBehaviours.push('cardInsideCardRowAfterSpread') : null
                beforeSpeardStyleBehaviour.hoverable ? newBehaviours.push('cardPlayer') : null;
                let afterSpreadStyleBehaviour = Object.assign(beforeSpeardStyleBehaviour , {
                    styleClasses:{
                        cardWrapper: [...cardRef.state.behaviour.styleClasses.cardWrapper,...newBehaviours],
                        cardBase: ['cardBase']
                    }
                })

                    cardRef.setState({
                        behaviour: afterSpreadStyleBehaviour,
                    })

            }, delayTime)
        })

    }

    dragStartHandler(e){
        onDragStart(e)
    }
    clickHandler(e){
        handlePulledTopCardClick(e)
    }

    dragStoppedHandler(e){
        onDragEnd(e)

    }
    hoverStartHandler(e){
        onCardHoverStart(e);
    }
    hoverStoppedHandler(e){
        onCardHoverEnd(e);
    }

    rotateCard(degree){
        return  Object.assign({},{
            position: "absolute",
            left: "10%",
            bottom: "10%",
            transform: `rotate(${degree}deg)`
        })
    }
    setRotationDegrees(){
        let degrees = []
        for(let i =0; i < 100; i++) {
            degrees.push(Math.floor(Math.random() * 150));
        }
    return degrees
    }


    setCardBackground(rank,color){
        return Object.assign({},{
            backgroundImage: this.state.cardsBehaviour.backgroundShown
                ? `url(./img/${rank}_${color}.png)`
                : `url(./img/card_back.png)`
        })

   }

    render(){
        console.log('card is rendered');
        if(this.props.owner === 'pot'){
        }
        let  numOfChildrenCards  = this.props.cards.length-1
        return(
            <div className={this.state.deckCssName}>
                {

                    this.props.cards
                        ?
                    this.props.cards.map((card,index)=>{
                        this.state.deckCards.push(card.id);
                        return(
                            <Card id={card.id}  key={card.id} rank={card.rank} color={card.color}  behaviour={Object.assign({},this.state.cardsBehaviour)}
                                  style={ this.state.cardsBehaviour.rotateable
                                      ? Object.assign({},this.rotateCard(this.state.cardsRotationDegree[index]),this.setCardBackground(card.rank,card.color))
                                      : Object.assign({},this.setCardBackground(card.rank,card.color))}
                                  topCard={this.state.owner==='gameDeck' && index === numOfChildrenCards}
                                  actions={ Object.assign({},this.state.actions)} />
                        )
                    })
                        :
                        <div/>
                }
            </div>
        )

    }

}