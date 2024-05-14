class CodeBreaker {
  constructor() {
    console.log("\n\n\n==============================================")
    console.log("Creating CodeBreaker player")
  }

  //Make initial guess
  generateGuess(e) {
    console.log("CodeBreaker.generateGuess()")
    let currentGuess = []
    let guessInputFields = document.querySelectorAll('input[id^="guesses-input"]')

    console.log('guess input fields :')
    console.log( guessInputFields)
    guessInputFields.forEach(input => {
    console.log(input.value);
    let guess = parseInt(input.value)
      currentGuess.push(guess) 
    })
    console.log("code breakers four guesses after for each loop: ")
    console.log(currentGuess)
    return currentGuess
  }
}
export default CodeBreaker;