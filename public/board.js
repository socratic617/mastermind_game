class DecoderBoard {
  constructor(numsColumns, numsRow) {
  
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

    console.log("Update Guessing Slots : ");
    console.table(this.guessingSlots)
  }

  /*Goal: updates the feedback slot on the board
  * @params feedback keeps track of feedback
  * @params feedbackRow keeps track of the row the feedback row is being made on
  * */
  addCodemakerFeedback(feedback, guessRow) {

    // Updating the feedback to the board
    this.feedbackSlots[guessRow] = feedback
    document.querySelector('#feed-' + guessRow ).innerText = `W: ${feedback.whitePegs} B: ${feedback.blackPegs}`

    console.log("Update Guessing Slots : ");
    console.table(this.feedbackSlots)
  }

  /*Goal: Resets everything on the board to start a new round
  * @params guess keeps track of guess
  * @params guessRow keeps track of the row the guess is being made on
  * */
  setBoard(numsColumns, numsRow) {
   
    this.guessingSlots = []; //use colorpegs to create guessingSlots
    this.feedbackSlots = [];  //use colorpegs to create feedbackSlots

    // Creating a 2-D array for the decoder board with specified number of rows and columns
    for (let i = 0; i < numsRow; i++) {

      // Initialize feedbackSlots for each row with blackPegs and whitePegs initialized to 0
      this.feedbackSlots.push({ blackPegs: 0, whitePegs: 0 })

      // Initialize guessingSlots for each row with null values for each column
      this.guessingSlots.push(Array(numsColumns).fill(null))

      for (let j = 0; j < numsColumns; j++) {
        document.querySelector('#col-' + i + j).innerText = '🔘'
        
      }

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