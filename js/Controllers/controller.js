import gameManager from '../Logic/GameManager'


let reactCompRefs = [];

const registerListener = (selfRef)=>{

reactCompRefs.push(selfRef);

}


function updateStateByObject(parentKey,partialKey,partialValue){
    reactCompRefs.forEach((comp)=> {
        let newPartialState = {};
        newPartialState[partialKey]=partialValue;

        let oldPartialState = comp.state[parentKey];
        let newState = {};

        newState[parentKey] = Object.assign({},oldPartialState,newPartialState);

        comp.setState(newState);

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

const notifyCardIsDragged = (isDragged) =>{
    updateStateByObject('userInteractionsEvents','cardIsDragged',isDragged);



}


const notifyChangeColorCardDropped = () =>{
    updateStateByObject('userInteractionsEvents','chooseColorCardDropped',true);



}
const notifyColorChoosed = () =>{
    updateStateByObject('userInteractionsEvents','chooseColorCardDropped',false);



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



const onCardHoverStart = (event) => {
    gameManager.onCardHover(event);

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
const handleColorChoosed = (event) => {
    let choosedColor= event.target.getAttribute('color');
    gameManager.pot.getTopCardValue().color=choosedColor;
    notifyColorChoosed()
    console.log(...gameManager.pot.deck)
    // updateStateByObject('pot','_cardArray',...gameManager.pot.deck)
    updateStateByRef('pot');
    // potRef.forceUpdate()
    // handleTurnEnd(true);

}

const onCardDroppedHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    const data = event.dataTransfer.getData("Text");
    let droppedCardComp = gameManager.players[0].getCardByID(parseInt(data));
    let isLegalMove = gameManager.checkMoveValidity(droppedCardComp, 'drop');


    if (isLegalMove) {

        gameManager.addDroppedCardToPot(droppedCardComp);
        gameManager.players[0].throwCard(droppedCardComp);
        updateStateByRef('players','pot');
        switch(droppedCardComp.rank){
            case 'changeColor':
                notifyChangeColorCardDropped();
                break;
            case 'taki':
                // handleTakiCardDropped(droppedCardComp.color);
                break;
            default:
                if(!gameManager.isTakiMode){
                    // handleTurnEnd(toChangeTurn(droppedCardComp));
                }
                break;
        }

    }


}
export{
    registerListener,timeElapsed,initGame,
    notifyCardIsDragged,onCardHoverStart,onCardHoverEnd,
    onCardDroppedHandler,handleColorChoosed,notifyChangeColorCardDropped,

}