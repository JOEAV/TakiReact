import timer from './Timer'
import CardFactory from './Card.js'
import PlayerFactory from  './Player'
//import cloneObject  from '../serviceUtils/cloneUtils'
const NoWinner=-1;
class GameManager{

    constructor(){
        this.gameDeck = new CardFactory.CardDeck(true);
        this.players =  [];
        this.pot = new CardFactory.CardDeck();
        this.activePlayer = 0;
        this.players[0] = new PlayerFactory.Player('player');
        this.players[1] = new PlayerFactory.Algo();
        this.players[2] = new PlayerFactory.Algo();
        // this.players[3] = new PlayerFactory.Algo();
        this.timer = timer;
        this.timeElapsed = this.timer.timeElapsed;
        this.howMany2Plus=0;
        this.lastTime={ ms :0, sec :0, min : 0};
        this.nowTime={ ms :0, sec :0, min : 0};
        this.animationDelayCounter=0;
        this._isTakiMode=false;
        this._winner=NoWinner;
        this.restarted=false;
        this._totalMoves=0;
        this.history=[]
        this.replayMode=false;
        this.replayIndex=0;
        this.takiID=this.gameDeck.deck.filter(card=>card.rank==='taki' && card.color==='colorful').map(card=>card.id);
    }



    updateHistory(){
        let currentState={
            gameDeck:Object.assign({},this.gameDeck),
            pot:Object.assign({},this.pot),
            players:Object.assign({},this.players),
            _totalMoves:this._totalMoves,
            activePlayer:this.activePlayer,
            timeElapsed:this.timer.timeElapsed
        }

        currentState.gameDeck._cardArray =[...this.gameDeck.deck];
        currentState.pot._cardArray =[...this.pot.deck];
        currentState.gameDeck._cardArray=currentState.gameDeck._cardArray.map(card=>Object.assign({},card))
        currentState.pot._cardArray=currentState.pot._cardArray.map(card=>Object.assign({},card))
        for (let i=0; i<2; i++){
            currentState.players[i] =Object.assign({},this.players[i]);
            currentState.players[i].avgMovesTime =Object.assign({},this.players[i].avgMovesTime);
            currentState.players[i]._deck=Object.assign({}, this.players[i]._deck);
            currentState.players[i]._deck._cardArray=[...this.players[i]._deck._cardArray];
            currentState.players[i]._deck._cardArray=currentState.players[i]._deck._cardArray.map(card=>Object.assign({},card))
            if (this.history.length>0 && i===0){
                currentState.players[i]._moves++;
            }
        }

        this.history.push(currentState);
    }

    initGame(restarted=false){
        this.resetPlayersPotAndGameDeck();
        this.dealCardForPlayers();
        this.ensureFirstCardNotSpecial();
        this.pot.add(this.gameDeck.pop());
        this.activePlayer = 0;
        this.howMany2Plus=0;
        this.lastTime={ ms :0, sec :0, min : 0};
        this.nowTime={ ms :0, sec :0, min : 0};
        this.animationDelayCounter=0;
        this._isTakiMode=false;
        this._winner=NoWinner;
        this.restarted=restarted;
        this._totalMoves=0;
        this.history=[]
        setTimeout(()=> this.updateHistory(),10);
        this.replayIndex=0;
        this.replayMode=false;
    }

    dealCardForPlayers(){
        for (let i = 0; i < 8; i++) {
            this.players.forEach(player=> {
                player.addCardToDeck(this.gameDeck.pop());
            })
        }
    }

    addCardFromGameDeckToPlayer(index){
        gameManager.players[index].addCardToDeck(gameManager.gameDeck.pop());
        this.updateHistory();
        if (this.gameDeck.deck.length===0)
            this.flushShuffledPotToGameDeck();
    }

    addDroppedCardToPot(droppedCard){
        this.howMany2Plus= droppedCard.rank==='2plus' ? this.howMany2Plus+1 :0;
        this.pot.add(droppedCard);
        if (droppedCard.rank!=='changeColor')
            this.updateHistory();
    }


    set isTakiMode(mode){
        this._isTakiMode=mode;
    }

    get isTakiMode(){
        return this._isTakiMode
    }

    get winner(){
        return this._winner;
    }
    set winner(index){
        this._winner=index;
    }

    flushShuffledPotToGameDeck(){
        let lastCard=this.pot.pop();
        while (this.pot.size()>0){
            this.gameDeck.add(this.pot.pop());
        }
        this.gameDeck.shuffle(this.takiID);
        this.pot.add(lastCard);

    }
    totalMoves()
    {
        let res=0;
        for (let i=0; i<this.players.length;i++)
        {
            res+=this.players[i].moves;
        }
        this._totalMoves=res;
    }

    checkMoveValidity(droppedCard) {
        if (this.activePlayer===0) {
            if (this.isTakiMode===true){
                return (droppedCard.color===this.pot.getTopCardValue().color)
            }
            let topPotCard = this.pot.getTopCardValue();
            let droppedColor = droppedCard.color;
            let droppedRank = droppedCard.rank;
            if (this.howMany2Plus > 0) {
                return (droppedCard.rank === '2plus');
            }
            if (droppedColor === 'colorful' || droppedColor === topPotCard.color || droppedRank === topPotCard.rank) {
                return true;
            } else {
                return false;
            }
        }
        else
            return false;
    }

    ensureFirstCardNotSpecial()
    {
        let rank=this.gameDeck.getCardAtIndex(gameManager.gameDeck.size()-1).rank;
        if (rank==='taki' || rank==='plus' || rank==='2plus' || rank==='changeColor' || rank==='stop') {
            for (let i = 0; i < this.gameDeck.size(); i++) {
                let rank=this.gameDeck.getCardAtIndex(i).rank;
                if (rank!=='taki' && rank!=='plus' && rank!=='2plus' && rank!=='changeColor' && rank!=='stop') {
                    this.gameDeck.swapCards(i,this.gameDeck.size()-1);
                    break;
                }
            }
        }
    }

    onCardHover(event){
        let target = event.target.id !== "" ? event.target : event.target.parentNode;
        let islegalMove =  this.checkMoveValidity({rank:target.getAttribute('rank'),color:target.getAttribute('color')},'hover');
        if(islegalMove){
            target.classList.add('cardAllowedCue')
        }else{
            target.classList.add('cardNotAllowedCue')

        }
    }

    onTopGameDeckCardHover(event){
        let target = event.target.id !== "" ? event.target : event.target.parentNode;
        let canTakeCardFromGameDeck = (!gameManager.players[0].deck.some((card)=>gameManager.checkMoveValidity(card)))
        if(canTakeCardFromGameDeck){
            target.classList.add('cardAllowedCue')
        }else{
            target.classList.add('cardNotAllowedCue')

        }
    }

    numPlayers(){
        return this.players.length
    }
    onCardHoverEnd(event){
        let target = event.target.id !== "" ? event.target : event.target.parentNode;
        target.classList.remove('cardAllowedCue','cardNotAllowedCue')
    }

    timeDiff(){
        let time={ms:0,sec:0,min:0};
        time.ms=this.nowTime.ms;
        time.sec=this.nowTime.sec;
        time.min=this.nowTime.min;
        if (time.sec<this.lastTime.sec)
        {
            time.min--;
            time.sec+=60;
        }
        if (this.nowTime.ms< this.lastTime.ms)
        {
            time.sec--;
            time.ms+=100;
        }
        time.ms=time.ms-this.lastTime.ms;
        time.min=time.min-this.lastTime.min;
        time.sec=time.sec-this.lastTime.sec;
        return time;
    }

    changeTurn(isChangeTurn,skipPlayer){
        let cards = [];
        this.nowTime.ms = this.timer.ms;
        this.nowTime.min = this.timer.min;
        this.nowTime.sec = this.timer.sec;
        let time = this.timeDiff();
        this.lastTime.ms = this.nowTime.ms;
        this.lastTime.min = this.nowTime.min;
        this.lastTime.sec = this.nowTime.sec;
        this.players[this.activePlayer].updateAvgMovesTime(time);
        this.players[this.activePlayer].updateTotalAvgMoveTime(time);
        if (this.players[this.activePlayer].howManyCards() === 1)
            this.players[this.activePlayer].reachedLastCard++;
        if (isChangeTurn) {
            //TODO: REMOVE THIS HARD CODED CODE
            this.activePlayer = ++gameManager.activePlayer % this.numPlayers() ;
        }
        if(skipPlayer){
            this.activePlayer = ++gameManager.activePlayer % this.numPlayers() ;

        }

        if (this.activePlayer !== 0 && this._winner===NoWinner) {
            cards= this.players[gameManager.activePlayer].play(this.pot.getTopCardValue(), this.howMany2Plus > 0);
        }
        return cards;
    }

    resetPlayersPotAndGameDeck()
    {
        let cards=[];
        this.players.forEach(player=>{
            cards=player.resetPlayer();
            cards.forEach(card=>{
                this.gameDeck.add(card);
            })
        })
        while (this.pot.size()>0){
            this.gameDeck.add(this.pot.pop());
        }
        this.gameDeck.shuffle(this.takiID);

    }

    resetGame()
    {
        this.resetPlayersPotAndGameDeck();
        this.activePlayer = 0;
        this.timer.stop();
        this.howMany2Plus=0;
        this.lastTime={ ms :0, sec :0, min : 0};
        this.nowTime={ ms :0, sec :0, min : 0};
        this.animationDelayCounter=0;
        this._isTakiMode=false;
        this._winner=NoWinner;
        this.restarted=true;
        this._totalMoves=0;
    }


    gameStatistics()
    {
        this.timer.stop();
        let statistics={whoWon:NoWinner,totalTime:{min,sec},players:[]};
        statistics.whoWon=this._winner;
        this.players.forEach(player=>{
                            statistics.players.push(player.playerStatistics());})
        return statistics;
    }



    thereIsAWinner()
    {
        if (this._winner !== NoWinner) {
            return true;
        }
        for (let i=0; i<this.players.length; i++){
            if (this.players[i].howManyCards()===0) {
                this._winner = i;
                return true;
            }
        }
        return false;
    }
}


const gameManager = new GameManager();
export default gameManager


