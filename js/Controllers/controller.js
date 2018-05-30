import gameManager from '../Logic/GameManager'


let potContainerRef = null;
let reactRootCompRef = null;
let timerCompRef =  null;
const eventCompListeners = {
    cardIsDragged:[],
    colorIsChoosed:[]


}


const registerListener = (selfRef)=>{

    reactRootCompRef=selfRef

}

const registerPotRef = (potCompRef) => {
    potContainerRef=document.querySelector('.potContainer');

}
const registerTimerCompRef = (timerRef) =>{
    timerCompRef = timerRef;
}

function updateStateByObject(parentKey,partialKey,partialValue){
        let newPartialState = {};
        newPartialState[partialKey]=partialValue;

        let oldPartialState = reactRootCompRef.state[parentKey];
        let newState = {};

        newState[parentKey] = Object.assign({},oldPartialState,newPartialState);

        reactRootCompRef.setState(newState);


}
function updateStateByRef(...refKeys){

        let newState = {};

            refKeys.forEach(key=>{
                if(Array.isArray(gameManager[`${key}`])){
                    newState[`${key}`]= [...gameManager[`${key}`]];
                } else if (typeof key === 'object'){
                    newState[`${key}`]= object.assign({},gameManager[`${key}`]);
                }else newState[`${key}`]= gameManager[`${key}`];
            })

         reactRootCompRef.setState(newState)


}




// const notifyCardIsDragged = (isDragged) =>{
//     let newState = {};
//     newState['fireAnimation'] = isDragged;
//     potRef.setState(newState);
//
//
// }

function toChangeTurn(card){
    return ((card.rank !== 'stop') && (card.rank !== 'plus'))
}

const handleTurnEnd = (isChangeTurn) => {
    do {
        let cardToThrow = gameManager.changeTurn(isChangeTurn);
        gameManager.thereIsAWinner()
        if (gameManager.winner!==0) {
            cardToThrow.forEach(cardLogic => {
                gameManager.addDroppedCardToPot(cardLogic);
            })

            if (cardToThrow.length > 0) {
                isChangeTurn = toChangeTurn(cardToThrow[cardToThrow.length - 1]);
            }
            else if (gameManager.activePlayer===1)
                gameManager.players[1].addCardToDeck(gameManager.gameDeck.pop());

        }
        updateStateByRef('players','pot','activePlayer');
    } while (gameManager.activePlayer===1 && gameManager.thereIsAWinner()===false)
    updateStateByRef('players','gameDeck','activePlayer');
    if (gameManager.thereIsAWinner()===true) {
        if (gameManager.winner===1){
            gameManager.changeTurn(true);
        }
    }
}

const  isPlayerHasLegitCardToThrow= () => gameManager.players[0].deck.some((card)=>gameManager.checkMoveValidity(card))


const handlePulledTopCardClick = (event) => {
    let isPlayer = event.isTrusted;
    if(!gameManager.isTakiMode && !isPlayerHasLegitCardToThrow() && (gameManager.animationDelayCounter===0 || !isPlayer)){

        if(( isPlayer && gameManager.activePlayer === 0) || (!isPlayer && gameManager.activePlayer===1 )){
            let numberOFCardsToTake= gameManager.howMany2Plus===0 ? 1 : gameManager.howMany2Plus*2;
            gameManager.howMany2Plus=0;
            for (let i=0; i<numberOFCardsToTake; i++) {
                gameManager.players[gameManager.activePlayer].addCardToDeck(gameManager.gameDeck.pop());
                //TODO:// HANDLE LAST CARD IN GAME DECK SITUATION - NOT CARED YET

            }
            updateStateByRef('players','gameDeck');
            handleTurnEnd(true);
        }

    }
}

const notifyChangeColorCardDropped = () =>{
    updateStateByObject('userInteractionsEvents','chooseColorCardDropped',true);



}
const notifyColorChoosed = () =>{
    updateStateByObject('userInteractionsEvents','chooseColorCardDropped',false);
    handleTurnEnd(true);
}

const notifyTakiCardDropped = (color) =>{
    updateStateByObject('userInteractionsEvents','fireTakiColorAnimation',color);

}

const addDroppedCardToPot = (droppedCard) =>{
//HOWMANY2PLUS
    gameManager.addDroppedCardToPot(droppedCard);
    updateStateByRef('howMany2Plus','pot');
}

const initGame = () =>{
    gameManager.initGame();
    updateStateByRef('pot','players','gameDeck','activePlayer',
        'timeElapsed','howMany2Plus','lastTime','nowTime','animationDelayCounter','timer',
        '_isTakiMode','_winner','restarted');
}

const isTakiMode = (mode)=>{
    gameManager.isTakiMode=mode;
    updateStateByRef('_isTakiMode')
}

const timeElapsed =(timeElapsedAsString)=>{
    timerCompRef.setState({timeElapsed:timeElapsedAsString})

}


const winner=(index)=>{
    gameManager.winner=index;
    updateStateByRef('_winner');

}

const flushShuffledPotToGameDeck= ()=> {
    gameManager.flushShuffledPotToGameDeck();
    updateStateByRef('pot','gameDeck');
}


const totalMoves= () => {
    gameManager.totalMoves();
    updateStateByRef('_totalMoves');
}

const checkMoveValidity=(droppedCard)=> {
    return gameManager.checkMoveValidity(droppedCard);
}


const ensureFirstCardNotSpecial=()=> {
    gameManager.ensureFirstCardNotSpecial();
    updateStateByRef('gameDeck');
}



const onCardHoverStart = (event) => {
    gameManager.onCardHover(event);

}

const onTopGameDeckCardHover = (event) => {
    gameManager.onTopGameDeckCardHover(event);
}


const onCardHoverEnd = (event) => {
    gameManager.onCardHoverEnd(event);
}

const timeDiff=()=>{
    return gameManager.timeDiff();
}

const changeTurn=(isChangeTurn)=>{
    let cardsToThrow = gameManager.changeTurn(isChangeTurn);
    updateStateByRef('nowTime','lastTime','players','activePlayer');
    return cardsToThrow;
}

const resetPlayersPotAndGameDeck=()=> {
    gameManager.resetPlayersPotAndGameDeck();
    updateStateByRef('pot','players','gameDeck');
}

const resetGame=()=>{
    gameManager.resetGame();
    updateStateByRef('pot','players','gameDeck','activePlayer',
        'timeElapsed','howMany2Plus','lastTime','nowTime','animationDelayCounter',
        '_isTakiMode','_winner','restarted');
}


const gameStatistics=()=> {
    let statistics =gameManager.gameStatistics();
    updateStateByRef('timeElapsed');
    return statistics;
}



const thereIsAWinner=()=>{
    let winner =gameManager.thereIsAWinner();
    updateStateByRef('_winner');
    return winner;

}
const handleColorChoosed =  (event) => {

    let choosedColor= event.target.getAttribute('color');
    gameManager.pot.getTopCardValue().color=choosedColor;
    notifyColorChoosed()
    updateStateByRef('pot');

    // handleTurnEnd(true);

}

const onDragStart = (e) =>{
    e.dataTransfer.effectAllowed = "copy";

    if(e.target.id === "") {

        e.dataTransfer.setData("Text", e.target.parentNode.id);
    }
    else {
        e.dataTransfer.setData("Text", e.target.id);
    }

    potContainerRef.classList.add('potFadeInAnimation')

}


const onDragEnd = (e) =>{
    potContainerRef.classList.remove('potFadeInAnimation')

}

const onCardDroppedHandler = (event) => {
    event.preventDefault();
    onDragEnd(event);
    event.dataTransfer.dropEffect = "copy";
    const data = event.dataTransfer.getData("Text");
    let droppedCardComp = gameManager.players[0].getCardByID(parseInt(data));
    let isLegalMove = gameManager.checkMoveValidity(droppedCardComp, 'drop');
    if (isLegalMove) {
        if (droppedCardComp.rank==='taki' && droppedCardComp.color==='colorful'){
            droppedCardComp.color=gameManager.pot.getTopCardValue().color;
        }
        gameManager.addDroppedCardToPot(droppedCardComp);
        gameManager.players[0].throwCard(droppedCardComp);
        updateStateByRef('pot');
        switch(droppedCardComp.rank){
            case 'changeColor':
                notifyChangeColorCardDropped();
                break;
            case 'taki':
                if (droppedCardComp.color!=='colorful')
                     handleTakiCardDropped(droppedCardComp.color);
                break;
            default:
                if(!gameManager.isTakiMode){
                    handleTurnEnd(toChangeTurn(droppedCardComp));
                }
                break;
        }


    }


}


let isPlayerTurnAfterTaki = () =>{
    let topPotCardRank = gameManager.pot.getTopCardValue().rank;
    return turnIndicatorBackgroundImage = topPotCardRank==='stop' || topPotCardRank==='plus' ? 'backgroundImageBoy' : 'backgroundImageRobot'
};

let takiButtonClicked =(event)=>{



}




    const TakiModeclickEventListener =(event)=>{
    notifyTakiCardDropped('none');
    gameManager.isTakiMode=false;
    updateStateByRef('_isTakiMode');
    handleTurnEnd(toChangeTurn(gameManager.pot.getTopCardValue()));
}
const handleTakiCardDropped = (color)=>{
    gameManager.isTakiMode = true;
    reactRootCompRef.setState({_isTakiMode:true})
    notifyTakiCardDropped(color);
    let colorUpperCase = color.toUpperCase();
    let playerCardsDifferentColor = gameManager.players[0].deck.filter(card=>card.color!==colorUpperCase.toLowerCase())




    // playerCardsDifferentColor.forEach((card)=>{
    //     removePlayerCardBehavior(card)
    // });
}


export{
    timeElapsed,initGame,registerListener
    ,onCardHoverStart,onCardHoverEnd,registerPotRef,onTopGameDeckCardHover,
    onCardDroppedHandler,handleColorChoosed,notifyChangeColorCardDropped,handlePulledTopCardClick,
    onDragStart,onDragEnd,registerTimerCompRef,TakiModeclickEventListener

}