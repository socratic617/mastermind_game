import CodeBreaker from './codebreaker.js'
import CodeMaker from './codemaker.js'
import DecoderBoard from './board.js'
/*------------------------------------------------------------------------------------
*  This is an object that is used to manage the mastermind decoder board.
*
* GENERAL TEMPLATE DOWN WITH ATTRIBUTES, ACTIONS (FUNCTIONS) then fill in the code 
* Call the functions with console.logs to see if the functions can work 
* Goal: build out the game logic first then think about leadership board, ui, server etc...
 --------------------------------------------------------------------------------- */

class Game {
  constructor(maxRange, numberColumns, playerMode, numberGuesses, roundsToPlay, timeLimitPerTurn) {
    this.maxRange = maxRange;
    this.numsColumns = numberColumns;
    this.numsRow = numberGuesses;
    this.playerMode = playerMode;
    this.rounds = roundsToPlay;
    this.currentRound = 1
    this.timeLimitPerTurn = timeLimitPerTurn;
    this.score = {
      CodeBreaker: 0,
      CodeMaker: 0
    }

    this.codeMaker = new CodeMaker();
    this.codeBreaker = new CodeBreaker();
  }

  startGame() {
    this.startRound();

    // Binding 'this' to ensure that the startRound function maintains its context when used as an event listener
    document.querySelector('#start-round').addEventListener('click', this.startRound.bind(this))
  }

  setUpRound() {
    //Do the following for all rounds 
    this.currentRow = 0
    document.querySelector('#new-round').hidden = true //hide button for new round
    this.decoderBoard = new DecoderBoard(this.numsColumns, this.numsRow);
  }

  async startRound() {

    this.setUpRound()

    await this.codeMaker.generateSecretCode(this.numsColumns, this.maxRange);

    document.querySelector('#submit-guesses').addEventListener('click', () => {

      const guess = this.codeBreaker.generateGuess();

      this.decoderBoard.addCodebreakerGuess(guess, this.currentRow);

      const feedback = this.codeMaker.generateFeedback(guess);

      this.decoderBoard.addCodemakerFeedback(feedback, this.currentRow);

      //Handles who wins or continue making guesses
      if (feedback.blackPegs == this.numsColumns) {

        this.score.CodeBreaker++
        this.endRound()

      } else if (this.currentRow == this.numsRow - 1) {

        this.score.CodeMaker++
        this.endRound()

      } else {
        this.currentRow++
      }

    });
  }

  updateScoreboard() {
    const scoreboardElement = document.querySelector('#scoreboard');
    scoreboardElement.innerText = `CodeBreaker: ${this.score.CodeBreaker}, CodeMaker: ${this.score.CodeMaker}`;
  }

  endRound() {
    document.querySelector('#submit-guesses').disabled = true
    // Update scoreboard
    this.updateScoreboard();
    this.currentRound++
    console.log('currentRounnd: ' + this.currentRound);
    console.log('rounds: ' + this.rounds);
    if (this.currentRound <= this.rounds){
      console.log('new round')
      document.querySelector('#new-round').hidden = false //show button for new round
    }else {
      console.log('i wonder....what to do when there are no more rounds')
      //TODO make request to server to submit results
      this.submitResults()
    }
  }

  submitResults(){
    fetch('/game/submit-game', {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: this.score,
        gameId: document.querySelector("#game-id").innerText
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit results');
      }
      console.log('Results submitted successfully');
    
      if (this.score.CodeBreaker > this.score.CodeMaker){
        document.querySelector('#game-status').innerText = 'GAME OVER!! CODEBREAKER WINS'
      }
      else if (this.score.CodeBreaker < this.score.CodeMaker) {
        document.querySelector('#game-status').innerText = 'GAME OVER!! CODEMAKER WINS'
      }
      else {
        document.querySelector('#game-status').innerText = 'GAME OVER!! ITS A TIE WINS'
      }
      
    })    
  }
}

export default Game;