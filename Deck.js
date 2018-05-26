import React from 'react';
import {Component} from 'react'
import Card from './Card'
import './css/card.css'
export default class Deck extends Component{
    constructor(props) {
        super(props);

        this.initBehaviours = this.initBehaviours.bind(this)


        this.state = {
            owner: this.props.owner,
            deckCssName:this.getDeckCssName(),
            deckBehaviour: {
                droppable: this.props.droppable
            },
            cardsBehaviour: this.mapCardBehaviourByOwner(),
            cardsStyle:this.mapCardStyleByOwner()
        }



    }

    getDeckCssName() {
        let res;
        switch (this.props.owner) {
            case 'player':
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
            styleClasses: {
                cardWrapper: ['cardWrapper'],
                cardBase: ['cardBase']
            }
        }
        switch (this.props.owner) {
            case 'player':
                newBehaviour.backgroundShown = true;
                newBehaviour.hoverable = true
                newBehaviour.draggable = true;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper=[...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']

                break;
            case 'pot':
                newBehaviour.backgroundShown = true;
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
    mapCardStyleByOwner() {

        let defaultStyle = {
            backgroundImage:null
        }
        let newStyle = {}

        switch (this.props.owner) {

            case 'pot':
                let degree = Math.floor(Math.random() * 150);
                newStyle = {
                    position: "absolute",
                    left: "10%",
                    bottom: "10%",
                    transform: `rotate(${degree}deg)`
                }

                break;
            default:
                break;

        }
        return Object.assign({}, defaultStyle, newStyle)
    }
    initBehaviours(cardRef) {
        let {owner} = this.state;
        let delayTime = (owner === 'gameDeck' || owner ===  'pot' ) ? 0 : 500

        return new Promise((resolve)=>{
            setTimeout(function () {
                console.log(cardRef);
                let beforeSpeardStyleBehaviour = cardRef.state.behaviour
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

    render(){
        let  numOfChildrenCards  = this.props.cards.length-1
        let behaviour=Object.assign({},this.state.cardsBehaviour);
        let style =Object.assign({},this.state.cardsStyle);
        return(
            <div className={this.state.deckCssName}>
                {

                    this.props.cards
                        ?
                    this.props.cards.map((card,index)=>{
                        return(
                            <Card key={card.id} rank={card.rank} color={card.color}  behaviour={behaviour} style={style}

                             topCard={this.state.owner==='gameDeck' && index === numOfChildrenCards}/>
                        )
                    })
                        :
                        <div/>
                }
            </div>
        )

    }

}