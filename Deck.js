import React from 'react';
import {Component} from 'react'
import Card from './Card'
import './css/card.css'
export default class Deck extends Component{
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.owner,
            deckBehaviour: {
                droppable: this.props.droppable
            },
            cardsBehaviour: {
                clickable: false,
                backgroundShown: false,
                hoverable: false,
                draggable: false,
                styleClasses: {
                    cardWrapper: ['cardWrapper'],
                    cardBase: ['cardBase']
                }

            }
        }

        this.mapCardBehaviourByOwner = () =>{
            console.log('func ',this.props);
            let cardsBehaviour = {
                clickable:false,
                backgroundShown:false,
                hoverable:false,
                draggable:false,
                styleClasses:{
                    cardWrapper:['cardWrapper'],
                    cardBase:['cardBase']
                }
            }
            switch (this.state.owner){
                case 'player':
                    cardsBehaviour.backgroundShown=true;
                    cardsBehaviour.hoverable=true;
                    cardsBehaviour.draggable=true;
                    cardsBehaviour.styleClasses.cardWrapper.push(
                        'cardInsideCardRow',

                    )

                    break;
                case 'pot':
                    break;
                case 'gameDeck':
                    break;
                case 'algo':
                    cardsBehaviour.backgroundShown=false;
                    cardsBehaviour.hoverable=false;
                    cardsBehaviour.draggable=false;
                    cardsBehaviour.styleClasses.cardWrapper.push(
                        'cardInsideCardRow',

                    )
                    break;
                default:
                    throw new Error('no such owner !');

            }
            this.setState({cardsBehaviour});
        }
    }

    componentWillMount(){
        console.log('will ',this.props);
        this.mapCardBehaviourByOwner();
    }

    componentDidMount(){
        console.log('did ',this);
        console.log(this.props.children)

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