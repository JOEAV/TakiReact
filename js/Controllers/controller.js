import gameManager from '../Logic/GameManager'


let reactCompRefs = [];
const registerListener = (selfRef)=>{

reactCompRefs.push(selfRef);

}



function updateStateByRef(...refKeys){
    reactCompRefs.forEach((comp)=>{
        const newState = {};
        refKeys.forEach(key=>{
            newState[`${key}`]= gameManager[`${key}`];
        })
        comp.setState(newState)

    })
}
const test =()=>{
    gameManager.test();
    updateStateByRef('_totalMoves')
    console.log(gameManager._totalMoves);
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
    reactCompRefs.forEach((comp)=>console.log('player init ',comp.state.players));
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

export{
    registerListener,test,timeElapsed,initGame
}