import React from 'react';
import {Component} from 'react'
import Card from './Card'
import './css/card.css'
export default class Deck extends Component{
    constructor(props) {
        super(props);


        this.spreadAnimation = function (cardRef) {

            setTimeout(function () {
                let beforeSpeardBehaviour = cardRef.state.behaviour
                let afterSpreadBehaviour = Object.assign(beforeSpeardBehaviour , {
                    styleClasses:{
                        cardWrapper: ['cardWrapper', 'cardInsideCardRowAfterSpread'],
                        cardBase: ['cardBase']
                    }
                })
                cardRef.setState({
                    behaviour: afterSpreadBehaviour
                })
            }, 500)
        }
        this.mapCardBehaviourByOwner = () => {
            let defaultBehaviour = {
                clickable: false,
                backgroundShown: false,
                hoverable: false,
                draggable: false,
                styleClasses: {
                    cardWrapper: ['cardWrapper'],
                    cardBase: ['cardBase']
                },
                spreadAnimation: false
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
                    newBehaviour.hoverable = true;
                    newBehaviour.draggable = true;
                    newBehaviour.styleClasses.cardWrapper.push(
                        'cardInsideCardRow',
                    ),
                        newBehaviour.spreadAnimation = this.spreadAnimation

                    break;
                case 'pot':
                    break;
                case 'gameDeck':
                    break;
                case 'algo':
                    newBehaviour.backgroundShown = false;
                    newBehaviour.hoverable = false;
                    newBehaviour.draggable = false;
                    newBehaviour.styleClasses.cardWrapper.push(
                        'cardInsideCardRow',
                    ),
                        newBehaviour.spreadAnimation = this.spreadAnimation
                    break;
                default:
                    throw new Error('no such owner !');

            }
                return Object.assign(defaultBehaviour, newBehaviour);

        }


        this.state = {
            owner: this.props.owner,
            deckBehaviour: {
                droppable: this.props.droppable
            },
            cardsBehaviour: this.mapCardBehaviourByOwner()

        }


    }
    componentWillMount(){

    }


    render(){
        return(
            <div className={
                this.props.owner === 'player'
                    ?
                    'cardsRowPlayer'
                    :
                    'cardsRowAlgo'
            }>
                {
                    this.props.cards
                        ?
                    this.props.cards.map((card,index)=>{
                        return(
                            <Card key={card.id} rank={card.rank} color={card.color}  behaviour={this.state.cardsBehaviour} />
                        )
                    })
                        :
                        <div/>
                }
            </div>
        )

    }
}