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

    if (this.guessingSlots[guessRow].length !== guess.length) {// dynamic because if i add one more row/ guess this will still work
      console.error("Please make sure you have provided exactly 4 guesses to fill in guessingSlots.");
      return null;
    }

    console.log("Tests for updating guess slots : ");
    console.table(this.guessingSlots)
  }

  /*Goal: updates the feedback slot on the board
  * @params feedback keeps track of feedback
  * @params feedbackRow keeps track of the row the feedback row is being made on
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
    let codebreakerFourGuesses = [1,2,3,4]
    this.codeBreaker.generateGuess();
    this.codeMaker.generateFeedback(codebreakerFourGuesses); // Pass the guess made by the codebreaker


  }

  // Round ends when there is a winner. Whether codeBreaker guessed right or the codeBreaker ran out of guess so codeMaker wins which will eventually determine final winner or reset board to finish up rounds players agreed to play
  endRound() {

  }
}

class CodeBreaker {
  //Place 4 color pegs to make initial guess
  generateGuess() {
    console.log("CodeBreaker.generateGuess()")
  }
}

class CodeMaker {
  constructor() {
    this.secretCode = [];
  }
  // Async function to generate 4 random numbers from 0 to 7 using RANDOM.ORG's Integer Generator API
  /**EDGE CASE: Limitation on how many times you can hit the API before it meets daily limit. *alternative when it meets limit: have a default to choose a random option using math.random and an array of random 4 digit secret codes for computer secret code for the game 
  */
  async generateSecretCode() {
    console.log("CodeMaker.generateSecretCode()")
    const urlRandomNumGenerator = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";


    //API BROKEN : so commenting this out for now and hardcoding the secret code for now to work on feedback logic 

    // try {
    //   console.log("1:")
    //   const response = await fetch(urlRandomNumGenerator) // go get api
    //   const responseText = await response.text();
    //   console.log(responseText)

    //   // Trim the extra whitsepace/new lines then Split the responseText by '\n' to get an array of strings
    //   const numbersArray = responseText.trim().split('\n')
    //   console.log("numbersArray string format:")
    //   console.log(numbersArray)

    //   // Convert array of strings to array of numbers
    //   const computerSecretCode = numbersArray.map(Number)
    //   this.secretCode = computerSecretCode //ASSIGNING SECRET CODE TO GENERATED SECRET CODE OF THE API
    //   console.log(" computer secret code number format:")
    //   console.log(computerSecretCode) 
    // } catch (err) {
    //   console.error(err);
    // }
    this.secretCode = [ 1, 2, 2, 4];
  }

  // Return the secret code 
  getSecretCode() {
    console.log("CodeMaker.getSecretCode()")
    console.log("Secret Code:" + this.secretCode)
    return this.secretCode;
  }

  /*Goal: updates the feedback slot w/ black, white, or no pegs 
  * @params codebreakerGuess keeps track of guess made by the codebreaker
  * @params feedbackRow keeps track of the row the guess is being made on
  * */
  generateFeedback(codebreakerFourGuesses, feedbackRow) {
    console.log(`CodeMaker.generateFeedback(${codebreakerFourGuesses} , ${feedbackRow})`)

    //EDGE CASE: if codebreaker guess = 0 or any number less then codebreakerGuesses or any number greater then the length of the codebreaker guesses. Filter out non-null elements from the guessingSlots array at the specified row
    if (codebreakerFourGuesses.length == this.secretCode.length ) {
      console.error("Please make sure you have provided exactly 4 guesses to fill in guessingSlots.");
      return null;
    }
    
    // Get secret code 
    let secretCode = this.secretCode
    console.log("Secret Code:", secretCode);

    //initialize black pegs
    let feedbackOne = {blackPegs: 0};
      
    // Count black pegs (correct color/number and right position)
    for(let i = 0; i < secretCode.length; i++){
      if(codebreakerFourGuesses[i] === secretCode[i]){
        feedbackOne.blackPegs++
      }
    }

    console.log("Feedback after counting black pegs:", feedbackOne);

    // Initialized two hash tables to track the count of each colorNum in the guess and secret code
    // Covering Edge Case: This approach avoids duplicating the count of black and white pegs and allows dynamic access and update of colorNum counts.
    let guessHashTable = {}
    let secretCodeHashTable = {}

    // Populate secret code hash table with counts of each colorNum
    for (let i = 0; i < secretCode.length; i++) {

      // Get the color at index i of the secret code
      const colorNum = secretCode[i];

      // Increment the count for the current colorNum in the secret code hash table
      // If the colorNum doesn't exist in the hash table, initialize it with a count of 1
      secretCodeHashTable[colorNum] = (secretCodeHashTable[colorNum] || 0) + 1;
    }

    console.log("Secret Code Hash Table:", secretCodeHashTable);

    // Populate guess hash table with counts of each colorNum
    for (let i = 0; i < codebreakerFourGuesses.length; i++) {

      // Get the color at index i of the guess
      const colorNum = codebreakerFourGuesses[i];

      // Increment the count for the current colorNum in the guess hash table
      // If the colorNum doesn't exist in the hash table, initialize it with a count of 1
      guessHashTable[colorNum] = (guessHashTable[colorNum] || 0) + 1;
    }
    console.log("Guess Hash Table:", guessHashTable);
    // Initialize counter for white pegs
    let whitePegs = 0

    // Iterate through the guess to count occurrences of colorNum or number 
    for (let i = 0; i < codebreakerFourGuesses.length; i++) {
      const colorNum = codebreakerFourGuesses[i]; // Get the colorNum at the current index of the guess array

      // Check if the color exists in the secret code hash table
      if (secretCodeHashTable[colorNum] > 0) {
        secretCodeHashTable[colorNum]--; // Decrement the count of the colorNum in the secret code hash table
        whitePegs++; // Increment the count of white pegs since the colorNum is present in the secret code
      }
    }
    console.log("White Pegs:", whitePegs);


    //feedback object
    let feedback = {
      blackPegs: feedbackOne.blackPegs,
      whitePegs: whitePegs
    };

    console.log("Feedback:", feedback);
    console.table(feedback)
   

    //Now you can update the decoder board with the feedback
    this.decoderBoard.addCodemakerFeedback(feedback, feedbackRow);

    

    return feedback; // Return the feedback object

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
codemaker.getSecretCode()
let codebreakerFourGuesses = [1,2,3,4] // test case 
let feedbackRow = 1// test case
codemaker.generateFeedback(codebreakerFourGuesses, feedbackRow)

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
