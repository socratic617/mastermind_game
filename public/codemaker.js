class CodeMaker {
  constructor() {
    this.secretCode = [];
  }


  // Async function to generate 4 random numbers from 0 to 7 using RANDOM.ORG's Integer Generator API
  async generateSecretCode(numsColumns, maxRange) {

    const urlRandomNumGenerator = `https://www.random.org/integers/?num=${numsColumns}&min=0&max=${maxRange}&col=1&base=10&format=plain&rnd=new`;

    try {
   
      const response = await fetch(urlRandomNumGenerator) // go get api
      const responseText = await response.text();

      // Trim the extra whitsepace/new lines then Split the responseText by '\n' to get an array of strings
      const numbersArray = responseText.trim().split('\n')
     

      // Convert array of strings to array of numbers
      const computerSecretCode = numbersArray.map(Number)
      this.secretCode = computerSecretCode //ASSIGNING SECRET CODE TO GENERATED SECRET CODE OF THE API
  
    } catch (err) {
      console.error(err);
    }

  }

  // Return the secret code 
  getSecretCode() {
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

    if (codebreakerFourGuesses.length !== this.secretCode.length) {
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


    // Hashtable to track my black & white pegs
    let feedback = { blackPegs: 0, whitePegs: 0 }

    // Loop through each element in the codebreakerFourGuesses array to check for black pegs
    for (let i = 0; i < codebreakerFourGuesses.length; i++) {

      // compare my element in array of codebreakerFourGuesses to the element in secret code array at index i
      const guess = codebreakerFourGuesses[i];
      const secretCodeElement = this.secretCode[i];

      if (guess === secretCodeElement) { // if it is the SAME element at index i 

        occurences[secretCodeElement]--; // subtract 1 value from the key in secret code hashtable
        feedback.blackPegs++; // Increment black pegs if correct number and right position
        codebreakerFourGuesses[i] = null;
      }

      //if key is equal to zero  delete the key
      if (occurences[secretCodeElement] == 0) {
        delete occurences[secretCodeElement]
      }

    }

    // Loop through each element in the codeBreakerFourGuess array to check for white pegs
    for (let i = 0; i < codebreakerFourGuesses.length; i++) {

      const guess = codebreakerFourGuesses[i];

      // Check if the guess exists in the secret code and is not already matched with a black peg
      if (occurences[guess]) {

        // Subtract one from the value in the secret code hashtable
        occurences[guess]--;

        // add one white key peg to my hashtable 
        feedback.whitePegs++;
      }

      if(feedback.blackPegs >= 1){
        document.querySelector('#ui-feedback').innerText = "The player had guessed a correct number and its correct location"
      }else if(feedback.whitePegs >= 1){
        document.querySelector('#ui-feedback').innerText = "The player had guess a correct number"
      }else{
        document.querySelector('#ui-feedback').innerText = "The player’s guess was incorrect"
      }

    }

    return feedback;
    
  }
}
export default CodeMaker;