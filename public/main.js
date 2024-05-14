import Game from './game.js';

/* ******************************************************************************* 
*Creating Game
************************************************************************************/

// this is an event handler that will trigger a new game 
function startGameHandler() {

  //creating users custom game variables to pass in new Game instance
  let roundsToPlay = parseInt(document.querySelector('#rounds-input').innerText)
  let playerMode = document.querySelector('#player-mode').innerText;
  let numberGuesses = parseInt(document.querySelector('#guesses-input').innerText)
  let maxRange = parseInt(document.querySelector('#max-range').innerText)
  let numberColumns = parseInt(document.querySelector('#max-columns').innerText)
  let timeLimitPerTurn = parseInt(document.querySelector('#max-time').innerText)
 

  // CREATE AN INSTANCE OF THE GAME FOR UI
  let gameObject = new Game(
    maxRange, 
    numberColumns, 
    playerMode, 
    numberGuesses, 
    roundsToPlay, 
    timeLimitPerTurn
  );
 
  // Start the game
  gameObject.startGame();
}

startGameHandler()