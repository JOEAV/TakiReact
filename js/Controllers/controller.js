import gameManager from '../Logic/GameManager'


let reactCompRefs = [];
const registerListener = (selfRef)=>{

reactCompRefs.push(selfRef);

}


function updateStateByObject(suppliedState){
    reactCompRefs.forEach((comp)=> {
        comp.setState(suppliedState)

    })
}
function updateStateByRef(...refKeys){
    reactCompRefs.forEach((comp)=>{

        let newState = {};

            refKeys.forEach(key=>{
                if(typeof key === 'object'){
                    newState[`${key}`]= object.assign({},gameManager[`${key}`]);
                }else newState[`${key}`]= gameManager[`${key}`];
            })

        comp.setState(newState)

    })
}

const updateCardIsDragged = (isDragged) =>{
    updateStateByObject({userInteractionsEvents:{
            cardIsDragged:isDragged
        }
    })

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

const timeElapsed =()=>{
   updateStateByRef('timeElapsed')


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



const onCardHover = (event)=>{
    let target = event.target.id !== "" ? event.target : event.target.parentNode;
    let islegalMove =  this.checkMoveValidity({rank:target.getAttribute('rank'),color:target.getAttribute('color')},'hover');
    if(islegalMove){
        target.classList.add('cardAllowedCue')
    }else{
        target.classList.add('cardNotAllowedCue')

    }
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

const drop = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    const data = event.dataTransfer.getData("Text");
    const droppedCardElement = document.getElementById(data);
    let droppedCardComp = gameManager.players[0].getCardByID(parseInt(droppedCardElement.getAttribute("id")));
    let isLegalMove = gameManager.checkMoveValidity(droppedCardComp, 'drop');


    if (isLegalMove) {

        gameManager.addDroppedCardToPot(droppedCardComp);
        gameManager.players[0].throwCard(droppedCardComp);
        setDroppedCardCssInPot(droppedCardElement);
        switch(droppedCardComp.rank){
            case 'changeColor':
                raiseColorChangePopup();
                break;
            case 'taki':
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
export{
    registerListener,timeElapsed,initGame,updateCardIsDragged
}