import gameManager from '../Logic/GameManager'


let reactCompRefs = [];
const registerListener = (selfRef)=>{

reactCompRefs.Push(selfRef);

}



function updateStateByRef(...refKeys){
    reactCompRefs.forEach((comp)=>{
        const newState = {};
        refKeys.forEach(key=>{
            newState[`${key}`]= this.gameManager[`${key}`];
        })
        comp.setState(newState)

    })
}
const test =()=>{
    this.gameManager.test();
    updateStateByRef('_totalMoves')
}
const addDroppedCardToPot = (droppedCard) =>{
//HOWMANY2PLUS
    this.gameManager.addDroppedCardToPot(droppedCard);
    updateStateByRef('howMany2Plus','pot')

}



const isTakiMode = (mode)=>{
    this.gameManager.isTakiMode=mode;
    updateStateByRef('_isTakiMode')
}




const winner=(index)=>{
    this.gameManager.winner=index;
    updateStateByRef('_winner');

}

const flushShuffledPotToGameDeck= ()=> {
    this.gameManager.flushShuffledPotToGameDeck();
    updateStateByRef('pot','gameDeck');
}


const totalMoves= () => {
    this.gameManager.totalMoves();
    updateStateByRef('_totalMoves');
}

const checkMoveValidity=(droppedCard)=> {
    return this.gameManager.checkMoveValidity(droppedCard);
}


const ensureFirstCardNotSpecial=()=> {
    this.gameManager.ensureFirstCardNotSpecial();
    updateStateByRef('gameDeck');
}



const timeDiff=()=>{
    return this.gameManager.timeDiff();
}

const changeTurn=(isChangeTurn)=>{
    let cardsToThrow = this.gameManager.changeTurn(isChangeTurn);
    updateStateByRef('nowTime','lastTime','players','activePlayer');
    return cardsToThrow;
}

const resetPlayersPotAndGameDeck=()=> {
    this.gameManager.resetPlayersPotAndGameDeck();
    updateStateByRef('pot','players','gameDeck');
}

const resetGame=()=>{
    this.gameManager.resetGame();
    updateStateByRef('pot','players','gameDeck','activePlayer',
        'timerElapsed','howMany2Plus','lastTime','nowTime','animationDelayCounter',
        '_isTakiMode','_winner','restarted');
}


const gameStatistics=()=> {
    let statistics =this.gameManager.gameStatistics();
    updateStateByRef('timerElapsed');
    return statistics;
}



const thereIsAWinner=()=>{
    let winner =this.gameManager.thereIsAWinner();
    updateStateByRef('_winner');
    return winner;

}

default export{
    registerListener
}