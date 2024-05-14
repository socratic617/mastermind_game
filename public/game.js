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
//import codemaker, codebreaker and round
 class Game {
  /*
  * */
  constructor(maxRange, numberColumns, playerMode, numberGuesses, roundsToPlay, timeLimitPerTurn) {
    this.maxRange = maxRange;
    this.numsColumns = numberColumns;
    this.numsRow = numberGuesses;
    this.playerMode = playerMode;
    this.rounds = roundsToPlay;
    this.timeLimitPerTurn = timeLimitPerTurn;
    this.currentRow = 0
    this.score = {
      CodeBreaker: 0,
      CodeMaker: 0
    }

    this.codeMaker = new CodeMaker();
    this.codeBreaker = new CodeBreaker();
    this.decoderBoard = new DecoderBoard(this.numsColumns, this.numsRow);
    
  }



  startGame() {
    console.log("Starting Game - startGame()...")
    
   this.startRound();
  }

  async startRound() {

    console.log("INSIDE STARTED ROUND() FUNCTION")
    console.log('\t Number of Columns: ', this.numsColumns)
    console.log('\t this.maxRange :', this.maxRange)

    await this.codeMaker.generateSecretCode(this.numsColumns, this.maxRange);

    document.querySelector('#submit-guesses').addEventListener('click', () => {

      const guess = this.codeBreaker.generateGuess();
      console.log('guess:' + guess)

      this.decoderBoard.addCodebreakerGuess(guess, this.currentRow);

      const feedback = this.codeMaker.generateFeedback(guess);
      console.log('feedback :__')
      console.log(feedback)

      this.decoderBoard.addCodemakerFeedback(feedback, this.currentRow);
      console.log("this.current Row" , this.currentRow )
      console.log("this.nums row" , this.numsRow)

      //Handles who wins or continue making guesses
      if (feedback.blackPegs == this.numsColumns ){
        console.log("Codebreaker WINS")
        this.score.CodeBreaker++
        this.endRound()

      } else if ( this.currentRow == this.numsRow -1 ){
        console.log("Codemaker WINS")
        this.score.CodeMaker++
        this.endRound()

      } else {
        this.currentRow++
      }
      console.log("SCORE: ", this.score)
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
  }
}

export default Game;