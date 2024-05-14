import Game from './game.js';

/* ******************************************************************************* 
*Creating Game
************************************************************************************/

// this is an event handler that will trigger a new game 
function startGameHandler() {

  console.log("\n_________________________\n ")
  console.log("Inside startGameHandler Function")


  //creating users custom game variables to pass in new Game instance
  let roundsToPlay = parseInt(document.querySelector('#rounds-input').innerText)
  let playerMode = document.querySelector('#player-mode').innerText;
  let numberGuesses = parseInt(document.querySelector('#guesses-input').innerText)
  let maxRange = parseInt(document.querySelector('#max-range').innerText)
  let numberColumns = parseInt(document.querySelector('#max-columns').innerText)
  let timeLimitPerTurn = parseInt(document.querySelector('#max-time').innerText)
 
  
  // CREATE AN INSTANCE OF THE GAME FOR UI
  let gameObject = new Game(maxRange, numberColumns, playerMode, numberGuesses, roundsToPlay, timeLimitPerTurn);
 
  // Start the game
  gameObject.startGame();

  // Loggining confirmation
  console.log("Game has started after clicking Start Game : " + gameObject)
}

function guessTurnHandler(){
  console.log("\n_________________________\n ")
  console.log("Inside guessTurnHandler() Function")
}
//Guesses Per Turn 
document.querySelector('#submit-guesses').addEventListener('click', guessTurnHandler)
startGameHandler()






/* *******************************************************************************
* TEST: GAME LOGIC OUTSIDE OF ROUND CLASS (Unit Tests)
* @param numsColumns, numsRow, guess, guessRow
************************************************************************************/
// async function testRoundLogic(numsColumns, numsRow, guess, guessRow, min, max){
//   //Test create your players
//   let codemaker = new CodeMaker();
//   let codebreaker = new CodeBreaker();

//   // Test creating decoder board
//   let decoderBoard = new DecoderBoard(numsColumns, numsRow);

//   // Test codemaker selecting a secret code
//   // Bug Fix: Covered the issue with timing of getting secret code first then producing the secret to be able to give accurate feedback after by the code maker 
//   await codemaker.generateSecretCode(numsColumns, min, max);

//   //Test codebreaker making a guess + place on board for each row
//   // codeBreaker.generateGuess() //TODO FIGURE OUT LOGIC FOR GUESS
//   console.log('Codebreaker\'s first guess: ' + guess)
//   decoderBoard.addCodebreakerGuess(guess, guessRow)


//   //Test codeMaker Feedback for first guess by codeBreaker 
//   let codebreakerFourGuesses = decoderBoard.getGuessingSlotRow(guessRow)
//   let feedback = codemaker.generateFeedback(codebreakerFourGuesses)
//   // decoderBoard.addCodemakerFeedback(feedback);
//   decoderBoard.addCodemakerFeedback(feedback, guessRow)
// } 


// //TESTING LOGIC
// let guess = [1, 2, 2, 1] //TODO secret code not finished generating when this line is ran, refer to logs
// let guessRow = 0

// let numsRow = 10

// //These are params for API template literals passed in generateSecretCode
// let numsColumns = 4
// let min = 0
// let max = 7


// testRoundLogic(numsColumns, numsRow, guess, guessRow, min, max)


