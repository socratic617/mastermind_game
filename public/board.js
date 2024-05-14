/*------------------------------------------------------------------------------------
*  DECODER BOARD OBJECT
*P
* The Decoder Board represents the board used in the mastermind game and is used to
* hand the display and maintainence of all the feedback anf guesses made during a 
* round.
 --------------------------------------------------------------------------------- */
class DecoderBoard {
  constructor(numsColumns, numsRow) {

    //Ensure the UI board is always reset after every round
    this.setBoard(numsColumns, numsRow);
  }

  /*
   * Adds Codebreaker guess to the board 
   * @params guess the codebreaker's guess
   * @params guessRow the row the guess is being made on
   * */
  addCodebreakerGuess(guess, guessRow) {

    // Validate the guess length
    if (this.guessingSlots[guessRow].length !== guess.length) {
      console.error(`Please make sure you have provided exactly ${this.guessingSlots[guessRow].length} guesses to fill in guessing slot.`);
      return null;
    }
    
    // Updating the guessing slot with the guess
    this.guessingSlots[guessRow] = guess;
    for(let i = 0; i < guess.length; i++){
      document.querySelector('#col-' + guessRow + i).innerText = guess[i]
    }
  }

  /*
  * Updates the feedback slot on the board with the codemaker feedback
  * 
  * @params feedback made by codemaker
  * @params guessRow keeps track of the row the feedback corresponds to
  * */
  addCodemakerFeedback(feedback, guessRow) {

    // Updating the feedback to the board
    this.feedbackSlots[guessRow] = feedback
    document.querySelector('#feed-' + guessRow ).innerText = `W: ${feedback.whitePegs} B: ${feedback.blackPegs}`

    console.table(this.feedbackSlots)
  }

  /* 
  * Clears the board for every round and sets the dimension based off of what is defined in * the game.
  *
  * @params numsColumns number of columns to put on the decoder board
  * @params numsRow number of rows to put on the decoder board
  * */
  setBoard(numsColumns, numsRow) {
   
    this.guessingSlots = []; 
    this.feedbackSlots = []; 

    // Creating a 2-D array for the decoder board with specified number of rows and columns
    for (let i = 0; i < numsRow; i++) {

      // used to track codemaker feedback to codebreaker guess
      this.feedbackSlots.push({ blackPegs: 0, whitePegs: 0 })

      // Initialize guessingSlots for each row with null values for each column
      this.guessingSlots.push(Array(numsColumns).fill(null))

      //reset UI guessing slots
      for (let j = 0; j < numsColumns; j++) {
        document.querySelector('#col-' + i + j).innerText = '🔘'
      }

      //reset UI guessing slots
      document.querySelector('#feed-' + i).innerText = 'EMPTY'
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
export default DecoderBoard;