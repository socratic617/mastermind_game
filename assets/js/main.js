/*------------------------------------------------------------------------------------
*  This is an object that is used to manage the mastermind decoder board.
*
* GENERAL TEMPLATE DOWN WITH ATTRIBUTES, ACTIONS (FUNCTIONS) then fill in the code 
* Call the functions with console.logs to see if the functions can work 
* Goal: build out the game logic first then think about leadership board, ui, server etc...
 --------------------------------------------------------------------------------- */
class Game {
  /*
  * @param decoderBoard object:  is the board game
  * @param  codeMaker object: is player 1 aka Computer
  * @param  codeBreaker object: is player 2 aka User
  * */
  constructor() {

    this.colorPegs = [1, 2, 3, 4];
    this.numsColumns = 4;// todo user input
    this.numsRow = 10;// codeBreaker 10rows for guesses
    this.decoderBoard = new DecoderBoard(this.numsColumns, this.numsRow);// Use all pieces for Game from Board
    this.rounds = 1; //hardcoded 1 round ***** FIX LOOPING THROUGH ROUND AFTER EVERY START GAME *** - Displays rounds all at once, i dont want that , i want to ddisplay it as i finish each round 
    this.score = {
      CodeBreaker: 0,
      CodeMaker: 0
    }
  }

  /* 1. Decide who is the codeBreaker (user) or codeMaker (Computer)
     2. Decide how many round of games you want to play amongst one another */
  startGame() {
    // const codeBreaker = //will always be user
    // const codeMaker = // will always default Computer
    console.log("Starting Game - startGame()...")

    //Number of rounds to loop through for Codemaker and Codebreaker to play 
    for (let i = 0; i < this.rounds; i++) {
      console.log(" Number of rounds - i :  " + i)
      let codeMaker = new CodeMaker();
      let codeBreaker = new CodeBreaker();
      let currentRound = new Round(this.colorPegs, this.numsColumns, this.numsRow, this.codeBreaker, this.codeMaker, this.decoderBoard);
    }
  }

  //---------------------------------------------------
  //  1. Tell codeMaker (Computer) when to choose the secretCode

  //  2. Tell the Codebreaker to make initial guess

  //  3. Tell Codemaker to provide feedback in the feedback slots using black or white pegs

  // If the codebreaker wins, tell the codebreaker to place one white peg in the points slots */
  // processCodebreakerWin() { }
  // If Codemaker wins, tell the Codemaker to place a black peg in the point slot*/
  // processCodemakerWin() {}
}

class DecoderBoard {
  constructor(numsColumns, numsRow) {
    console.log("Inside constructor");
    // this.numsColumns = numsColumns
    // this.numsRow = numsRow
    this.guessingSlots = [];
    this.feedbackSlots = [];

    this.setBoard(numsColumns, numsRow);// you use this.setBoard bc your calling your method to be able to be accessed
    console.log("After setBoard() in the constructor");
  }

  /*Goal: updates the guess slots on the board 
   * @params guess keeps track of guess
   * @params guessRow keeps track of the row the guess is being made on
   * */
  addCodebreakerGuess(guess, guessRow) {

    console.log("Inside addCodebreakerGuess()");

    // Add the guess to the row
    this.guessingSlots[guessRow] = guess;

    // Covering edge case: Check if guess has a total of 4 guesses not more or less

    if (this.guessingSlots[guessRow].filter(slot => slot !== null).length !== 4) {// Filter out non-null elements from the guessingSlots array at the specified row
      console.error("Please make sure you have provided exactly 4 guesses to fill in guessingSlots.");
      return null;
    }

    console.log("Tests for updating guess slots : ");
    console.table(this.guessingSlots)
  }

  /*Goal: updates the feedback slot on the board
  * @params guess keeps track of guess
  * @params guessRow keeps track of the row the guess is being made on
  * */
  addCodemakerFeedback(feedback, feedbackRow) {
    console.log("Inside CodemakerFeedback()");
    this.feedbackSlots[feedbackRow] = feedback
    console.log("Tests for updating feedBack slots : ");
    console.table(this.feedbackSlots)
  }

  /*Goal: Resets everything on the board to start a new round
  * @params guess keeps track of guess
  * @params guessRow keeps track of the row the guess is being made on
  * */
  setBoard(numsColumns, numsRow) {
    console.log("Inside setBoard() ");
    this.guessingSlots = []; //use colorpegs to create guessingSlots
    this.feedbackSlots = [];  //use colorpegs to create feedbackSlots

    // Creating a 2-D array for the decoder board with specified number of rows and columns
    for (let i = 0; i < numsRow; i++) {

      // Initialize feedbackSlots for each row with blackPegs and whitePegs initialized to 0
      this.feedbackSlots.push({ blackPegs: 0, whitePegs: 0 })

      // Initialize guessingSlots for each row with null values for each column
      this.guessingSlots.push(Array(numsColumns).fill(null))
    }
  }

  // Getter method to access the guessingSlots attribute outside the class
  getGuessingSlots() {
    return this.guessingSlots
  }

  // Getter method to access the feedbackSlots attribute outside the class
  getFeedbackSlots() {
    return this.feedbackSlots
  }
}

class Round {
  constructor(codeBreaker, codeMaker, decoderBoard) {
    this.codeBreaker = codeBreaker;
    this.codeMaker = codeMaker;
    this.decoderBoard = decoderBoard;
  }

  // When round starts tell codeMaker to make secret code, tell codeBreaker to makes intial guess, then tell codeMaker to provide feedback
  startRound() {

    console.log("INSIDE STARTED ROUND() FUNCTION")

    this.codeMaker.generateSecretCode(this.colorPegs);
    let secret = this.codeMaker.getSecretCode();
    console.log("SECRET: " + secret)
    this.codeBreaker.generateGuess();
    this.codeMaker.generateFeedback();


  }

  // Round ends when there is a winner. Whether codeBreaker guessed right or the codeBreaker ran out of guess so codeMaker wins which will eventually determine final winner or reset board to finish up rounds players agreed to play
  endRound() {

  }
}

class CodeBreaker {
  //Place 4 color pegs to make initial guess
  generateGuess() {
    console.log("inside generating guess")
  }
}

class CodeMaker {
  constructor() {
    this.secretCode = [];
  }

  //USING RANDOM.ORG to generate random numbers from 0 to 7 

  // Function to generate 4 random numbers from 0 to 7 using RANDOM.ORG's Integer Generator API
  async generateSecretCode() {
    console.log("I am inside  generateSecretCode() ")
    const urlRandomNumGenerator = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";

    const getMethod = {
      method: "GET"
    };

    // await fetch(urlRandomNumGenerator, getMethod)// go get api
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Inside fetch and here is the data aka random number : ")
    //     console.log(data);
    //   })
    // } catch(error) {
    //   console.error(error);
    // }

    try {
      console.log("1:")
      const response = await fetch(urlRandomNumGenerator)// go get api
      console.log("2:\n12\n34")
      const responseText = await response.text();
      console.log(responseText.split('\\n'))


      const computerSecretCode = '' /*await response.json(); -> i cant use response.json()  bc the api is sending *the information not in the right format i need to be able to use response.json bc it prints out as *"6\n4\n1\n5\n"
      * the special reserved word "/n" means new line 
      *Goal:  i need to learn how to remove "n/" or escape it to be able to recieve the information how i want */


      console.log(" computer secret code:")
      console.log(computerSecretCode)
    } catch (err) {
      console.error(err);
    }
  }


  getSecretCode() {
    return this.secretCode;
  }

  // Place the black, white, or no pegs in the feedback slots after every guess by codebreaker
  generateFeedback() {
    console.log("inside generate feedback")
  }
}

/*
 * Choose a secret code and place it in the Codemaker's secret row.
 * @param colorPegs array: Array of available color pegs
 * @param numsColumns number: Number of columns for the secret code
 * NOTE: Used math.random to generate the random numbers 
*/
// generateSecretCode(colorPegs, numsColumns) {
//   // Testing if I can call this function
//   console.log("inside generate secret code ")
//   console.log("numsColumns : " + numsColumns)

//   //Covering edge case: Check if colorPegs array is empty or numsColumns is 0
//   if (colorPegs.length == 0 || numsColumns == 0 ) {
//     console.error("Please make sure you have provided options and slots to generate secret code ")
//     return null
//   }

//   // This handles if user chooses int or string guesses w/ flexibilty to scale
//   for (let i = 0; i < numsColumns; i++) {
//     // console.log("i" + i)
//     let randomGuess = Math.floor(Math.random() * colorPegs.length) 
//     this.secretCode.push(colorPegs[randomGuess])
//     // console.log("randomguess: " + randomGuess)
//   }
//   // console.log("secretCode : " + this.secretCode)
// }



/* ******************************************************************************* 
*Creating Game
************************************************************************************/

// this is an event handler that will trigger a new game 
function startGameHandler() {

  // CREATE AN INSTANCE OF THE GAME FOR UI
  let gameObject = new Game();
  gameObject.startGame();
  console.log(" After Clicking Start Game- Game has started : " + gameObject)
}

//querySelector returns an object object.methodNmae
document.querySelector('#start-game').addEventListener('click', startGameHandler)

/* *******************************************************************************
* TEST: Class CodeMaker ->  see if functionalities working 
test all methods in CodeMaker 
************************************************************************************/

//Calling my method from my CodeMaker class and test if i am getting the newly generated random numbers from the API
let codemaker = new CodeMaker();
codemaker.generateSecretCode();

/* ******************************************************************************
* END TEST: Class CodeMaker
************************************************************************************/


/* *******************************************************************************
* TEST: Class DecoderBoard ->  see if functionalities working 
test all methods in decoderboard 
************************************************************************************/
console.log("Before instantiating DecoderBoard");

// Create an instance of the DecoderBoard class
let decoderBoard = new DecoderBoard(4, 6); // Example: 4 columns, 6 rows

console.log("Guessing Slots:");
console.table(decoderBoard.getGuessingSlots());
console.log("Feedback Slots:");
console.table(decoderBoard.getFeedbackSlots());

// testing updates for guess and feedback
decoderBoard.addCodebreakerGuess([1, 'yep', 3, 4], 2);
decoderBoard.addCodemakerFeedback({ blackPegs: 1, whitePegs: 2 }, 1);

/* ******************************************************************************
* END TEST: Class DecoderBoard
************************************************************************************/

// let codeMaker = new CodeMaker();
// let codeBreaker = new CodeBreaker();
// let decoderBoard = new DecoderBoard();
// let currentRound = new Round(codeBreaker, codeMaker, decoderBoard);

// round.startRound()