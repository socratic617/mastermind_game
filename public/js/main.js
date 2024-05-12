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
    // this.decoderBoard = new DecoderBoard(this.numsColumns, this.numsRow);// Use all pieces for Game from Board
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
 
// ***************WHERE YOU LEFT OFF 5/12*********************
    // Implement a conditional to prevent users from starting the game without filling in input fields.

    // Connect template literals to input fields using variables like 'element = document.querySelector(#id)'.
    
    // CREATE CODEBREAKER, CODEMAKER, AND DECODER BOARD
    
    // Define what happens to the modal when the user clicks "start game".

    // For creating the decoder board, implement a server call to generate the API secret code on the backend using routes and controllers.

    // Dynamically display the number of rows and columns after serving ejs from the server.

    // Set up the board layout with columns and rows.

    // Enable users to create their guess and control when they can input a guess or not (disabling guessing).

    // Implement a conditional to prevent users from over-guessing based on the number of guesses allowed.

    // Determine when the user guesses the correct secret code to end the round using a conditional, using black pegs for the codebreaker to win.

    // If the codemaker's last guess doesn't match the number of columns, display the score and whether the user won or lost.

//**************************************************** */


    //Number of rounds to loop through for Codemaker and Codebreaker to play 
    // for (let i = 0; i < this.rounds; i++) {
    //   console.log(" Number of rounds - i :  " + i)
    //   let codeMaker = new CodeMaker();
    //   let codeBreaker = new CodeBreaker();
    //   let currentRound = new Round(this.colorPegs, this.numsColumns, this.numsRow, this.codeBreaker, this.codeMaker, this.decoderBoard);
    // }
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
    let codebreakerFourGuesses = [1, 2, 3, 4]
    this.codeBreaker.generateGuess();
    this.codeMaker.generateFeedback(codebreakerFourGuesses); // Pass the guess made by the codebreaker


  }

  // Round ends when there is a winner. Whether codeBreaker guessed right or the codeBreaker ran out of guess so codeMaker wins which will eventually determine final winner or reset board to finish up rounds players agreed to play
  endRound() {

  }
}

class DecoderBoard {
  constructor(numsColumns, numsRow) {
    console.log("\n\n\n==============================================")
    console.log("Creating Decoder Board object")
    // this.numsColumns = numsColumns
    // this.numsRow = numsRow
    this.guessingSlots = [];
    this.feedbackSlots = [];

    // you use this.setBoard bc your calling your method to be able to be accessed
    this.setBoard(numsColumns, numsRow);
    console.log("guessingSlots: ");
    console.table(this.guessingSlots);
    console.log("feedbackSlots: ");
    console.table(this.feedbackSlots);
  }

  /*Goal: Adds Codebreaker guess to the board 
   * @params guess keeps track of guess
   * @params guessRow keeps track of the row the guess is being made on
   * */
  addCodebreakerGuess(guess, guessRow) {
    console.log("\n________________________________\nInside addCodebreakerGuess()");

    // Validate the guess length
    if (this.guessingSlots[guessRow].length !== guess.length) {
      console.error(`Please make sure you have provided exactly ${this.guessingSlots[guessRow].length} guesses to fill in guessing slot.`);
      return null;
    }

    // Updating the guessing slot with the guess
    this.guessingSlots[guessRow] = guess;

    console.log("Update Guessing Slots : ");
    console.table(this.guessingSlots)
  }

  /*Goal: updates the feedback slot on the board
  * @params feedback keeps track of feedback
  * @params feedbackRow keeps track of the row the feedback row is being made on
  * */
  addCodemakerFeedback(feedback, guessRow) {
    console.log("\n___________________________________\nInside addCodemakerFeedback()");

    // Updating the feedback to the board
    this.feedbackSlots[guessRow] = feedback
    console.log("Tests for updating feedBack slots : ");
    console.table(this.feedbackSlots)
  }

  /*Goal: Resets everything on the board to start a new round
  * @params guess keeps track of guess
  * @params guessRow keeps track of the row the guess is being made on
  * */
  setBoard(numsColumns, numsRow) {
    console.log("DecoderBoard.setBoard()");
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

  // Getter method to get the specific row from the guesing slots to be able to access in Codemaker method addcodemakerfeedback()
  getGuessingSlotRow(guessRow) {
    return this.guessingSlots[guessRow]
  }

  // Getter method to access the feedbackSlots attribute outside the class
  getFeedbackSlots() {
    return this.feedbackSlots
  }
}

class CodeBreaker {
  constructor() {
    console.log("\n\n\n==============================================")
    console.log("Creating CodeBreaker player")
  }

  //Place 4 color pegs to make initial guess
  generateGuess() {
    console.log("CodeBreaker.generateGuess()")
  }
}

class CodeMaker {
  constructor() {
    console.log("\n\n\n==============================================")
    console.log("Creating CodeMaker player")
    this.secretCode = [];
  }


  // Async function to generate 4 random numbers from 0 to 7 using RANDOM.ORG's Integer Generator API
  async generateSecretCode(numsColumns, min, max) {
    console.log("\n_____________________\nCodeMaker.generateSecretCode()")
    const urlRandomNumGenerator = `https://www.random.org/integers/?num=${numsColumns}&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    try {
      // console.log("1:")
      const response = await fetch(urlRandomNumGenerator) // go get api
      const responseText = await response.text();
      // console.log(responseText)

      // Trim the extra whitsepace/new lines then Split the responseText by '\n' to get an array of strings
      const numbersArray = responseText.trim().split('\n')
      // console.log("numbersArray string format:")
      // console.log(numbersArray)

      // Convert array of strings to array of numbers
      const computerSecretCode = numbersArray.map(Number)
      this.secretCode = computerSecretCode //ASSIGNING SECRET CODE TO GENERATED SECRET CODE OF THE API
      console.log("SECRET CODE: " + this.secretCode)
      // console.log(computerSecretCode) 
    } catch (err) {
      console.error(err);
    }
   // this.secretCode = [ 1, 2, 2, 4];
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
  generateFeedback(codebreakerFourGuesses) {

    console.log(`\n\n_____________________\n`)
    console.log("GUESS : ", codebreakerFourGuesses)
    console.log("SECRETCODE : ", this.secretCode)

    //EDGE CASE: if codebreaker guess = 0 or any number less then codebreakerGuesses or any number greater then the length of the codebreaker guesses. Filter out non-null elements from the guessingSlots array at the specified row
    if (codebreakerFourGuesses.length !== this.secretCode.length ) {
      console.error("Please make sure you have provided exactly 4 guesses to fill in guessingSlots.");
      return null;
    }

    // Hashtable to track the number of occurrences of each number in the secret code
    let occurences = {};

    // Populate Secret Code Occurrences using a for loop
    for (let i = 0; i < this.secretCode.length; i++) {

      // Retrieve the current number (element) at index i
      let num = this.secretCode[i]; 
      if (occurences[num]) {

        // Increment the count for the current number
        occurences[num]++; 
      } else {

        // Initialize the count for the current number
        occurences[num] = 1; 
      }
    }

    console.log("Secret Code Occurences : ", occurences)

    // Hashtable to track my black & white pegs
    let feedback = {
      blackPegs: 0, 
      whitePegs: 0
    }
    console.log("FEEDBACK: ", feedback)
    console.log('----------------GET BLACK PEGS-----------')

    // Loop through each element in the codebreakerFourGuesses array to check for black pegs
    for (let i = 0; i < codebreakerFourGuesses.length; i++){

      // compare my element in array of codebreakerFourGuesses to the element in secret code array at index i
      const guess = codebreakerFourGuesses[i];
      const secretCodeElement = this.secretCode[i];
      console.log(`i=${i} guess=${guess} secretCodeElement=${secretCodeElement}`)

      if (guess === secretCodeElement) { // if it is the SAME element at index i 
        console.log('\tGuess == secretCodeElement')
        occurences[secretCodeElement]--; // subtract 1 value from the key in secret code hashtable
        feedback.blackPegs++; // Increment black pegs if correct number and right position
        codebreakerFourGuesses[i] = null;
        console.log('\t\toccurences:', occurences)
        console.log('\t\tfeedback:', feedback)
        console.log('\t\tcodebreakerFourGuesses:', codebreakerFourGuesses)
      }

      //if key is equal to zero  delete the key
      if (occurences[secretCodeElement] == 0){
        delete occurences[secretCodeElement]
        console.log('\tDELETE OCCURENCE: ', occurences)
      }
    }

    console.log('\n\n_________________________________________')
    console.log("SECRET CODE: ", this.secretCode)
    console.log("GUESS: ", codebreakerFourGuesses)
    console.log("Secret Code Occurences : ", occurences)
    console.log("FEEDBACK: ", feedback)
    console.log('\n\n----------------GET WHITE PEGS-----------')
      // Loop through each element in the codeBreakerFourGuess array to check for white pegs
    for (let i = 0; i < codebreakerFourGuesses.length; i++){
      const guess = codebreakerFourGuesses[i];
      console.log(`i = ${i} guess = ${guess}`)
      
      // Check if the guess exists in the secret code and is not already matched with a black peg
      if (occurences[guess]) {
        console.log("\tIn conditional:");

        // Subtract one from the value in the secret code hashtable
        occurences[guess]--;
      
        // add one white key peg to my hashtable 
        feedback.whitePegs++;

        console.log('\t\toccurences:', occurences);
        console.log('\t\tfeedback:', feedback);
      }
    }
    return feedback;
  }
}

/* ******************************************************************************* 
*Creating Game
************************************************************************************/

// this is an event handler that will trigger a new game 
function startGameHandler() {

  console.log("\n_________________________\n ")
  console.log("Inside startGameHandler Function")

  // Purpose: checking if input fields filled out
  const inputFields = document.querySelectorAll('.input-field');
  console.log("input-fields : ", inputFields)

  // Check if any input field is empty
  function areFieldsFilled() {
    for (let i = 0; i < inputFields.length; i++) {
      console.log(`i=${i}  input field=${inputFields[i]} value=${inputFields[i].value}`)
      if (inputFields[i].value === '') {
        return false;
      }
    }
    return true;
  }
  if (!areFieldsFilled()) {
    console.error('Please fill out all fields before starting game')
    return
  }

  // Hide the modal
  const modalContainer = document.getElementById('modal-container');
  modalContainer.classList.add('hidden');
  console.log('modal container: ', modalContainer)

  // Display the decoder board
  const decoderBoard = document.getElementById('decoder-board');
  decoderBoard.classList.remove('hidden');
  console.log('decoderBoard: ', decoderBoard)

  // CREATE AN INSTANCE OF THE GAME FOR UI
  let gameObject = new Game();

  // Start the game
  gameObject.startGame();

  // Loggining confirmation
  console.log("Game has started after clicking Start Game : " + gameObject)
}

//querySelector returns an object object.methodNmae
document.querySelector('#start-game-btn').addEventListener('click', startGameHandler)





/* *******************************************************************************
* TEST: GAME LOGIC OUTSIDE OF ROUND CLASS (Unit Tests)
* @param numsColumns, numsRow, guess, guessRow
************************************************************************************/
async function testRoundLogic(numsColumns, numsRow, guess, guessRow, min, max){
  //Test create your players
  let codemaker = new CodeMaker();
  let codebreaker = new CodeBreaker();

  // Test creating decoder board
  let decoderBoard = new DecoderBoard(numsColumns, numsRow);

  // Test codemaker selecting a secret code
  // Bug Fix: Covered the issue with timing of getting secret code first then producing the secret to be able to give accurate feedback after by the code maker 
  await codemaker.generateSecretCode(numsColumns, min, max);

  //Test codebreaker making a guess + place on board for each row
  // codeBreaker.generateGuess() //TODO FIGURE OUT LOGIC FOR GUESS
  console.log('Codebreaker\'s first guess: ' + guess)
  decoderBoard.addCodebreakerGuess(guess, guessRow)


  //Test codeMaker Feedback for first guess by codeBreaker 
  let codebreakerFourGuesses = decoderBoard.getGuessingSlotRow(guessRow)
  let feedback = codemaker.generateFeedback(codebreakerFourGuesses)
  // decoderBoard.addCodemakerFeedback(feedback);
  decoderBoard.addCodemakerFeedback(feedback, guessRow)
} 


//TESTING LOGIC
let guess = [1, 2, 2, 1] //TODO secret code not finished generating when this line is ran, refer to logs
let guessRow = 0

let numsRow = 10

//These are params for API template literals passed in generateSecretCode
let numsColumns = 4
let min = 0
let max = 7


// testRoundLogic(numsColumns, numsRow, guess, guessRow, min, max)


// /* ******************************************************************************
// * END TEST: Class DecoderBoard
// ************************************************************************************/

// let feedbackRow = 1// test case
// codemaker.generateFeedback(codebreakerFourGuesses, feedbackRow)

// console.log("Before instantiating DecoderBoard");



// console.log("Guessing Slots:");
// console.table(decoderBoard.getGuessingSlots());
// console.log("Feedback Slots:");
// console.table(decoderBoard.getFeedbackSlots());

// // testing updates for guess and feedback
// decoderBoard.addCodebreakerGuess([1, 'yep', 3, 4], 2);
// decoderBoard.addCodemakerFeedback({ blackPegs: 1, whitePegs: 2 }, 1);
