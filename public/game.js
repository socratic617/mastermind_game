import CodeBreaker from './codebreaker.js'
import CodeMaker from './codemaker.js'
import DecoderBoard from './board.js'
/*------------------------------------------------------------------------------------
*  TGAME OBJECT
* The game object is used to control the flow of the game. It was created dynamcially
* so the user can cnofig their game to their liking. Configurations include 
* setting a number of rounds and difficulty of the game.
* ENHANCEMENTS: Work on multiplayer and time limit game.
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


  /*
  *  Used when the page is loaded to start a new game round. We also ensure the submit guess is enabled as
  * soon as the new round nb==button appears. 
  * */
  startGame() {

    this.startRound();
    this.gamePlay();

  
    // start a new round and enable input guesses every round
    document.querySelector('#start-round').addEventListener('click', () =>{
      document.querySelector('#submit-guesses').disabled = false;
      this.startRound()
    })
  }

  /*
  *  HNolds the majority of the game logic which is stored in an event handler when the user submits there guess.
  * */
  gamePlay() {
    document.querySelector('#submit-guesses').addEventListener('click', () => {

      //Codebreaker submits their guess
      const guess = this.codeBreaker.generateGuess();

      //Add the guess to the decoder board
      this.decoderBoard.addCodebreakerGuess(guess, this.currentRow);

      //Have the codemaker genereate feedback for the guess
      const feedback = this.codeMaker.generateFeedback(guess);

      //add feedback to decoder board
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

  /*
  *  Used to set up the round with all the necessart resets.
  * */
  async startRound() {

    this.currentRow = 0
    document.querySelector('#new-round').hidden = true;
    document.querySelector('#submit-guesses').disabled = false;
    this.decoderBoard = new DecoderBoard(this.numsColumns, this.numsRow);
    await this.codeMaker.generateSecretCode(this.numsColumns, this.maxRange);
    
  }

  /*
  *  Update score in UI
  * */
  updateScoreboard() {
    const scoreboardElement = document.querySelector('#scoreboard');
    scoreboardElement.innerText = `CodeBreaker: ${this.score.CodeBreaker}, CodeMaker: ${this.score.CodeMaker}`;
  }

  /*
  *  Handles when the round ends including preventing the user from continuing to submit guesses.
  * */
  endRound() {
    document.querySelector('#submit-guesses').disabled = true
    // Update scoreboard
    this.updateScoreboard();
    this.currentRound++
    
    if (this.currentRound <= this.rounds){
     
      document.querySelector('#new-round').hidden = false //show button for new round
    }else {
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