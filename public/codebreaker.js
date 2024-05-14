class CodeBreaker {
  constructor() {
  }

  //Make initial guess
  generateGuess(e) {

    let currentGuess = []
    let guessInputFields = document.querySelectorAll('input[id^="guesses-input"]')

 
    guessInputFields.forEach(input => {
      let guess = parseInt(input.value)
      currentGuess.push(guess) 
    })

    return currentGuess
  }
}
export default CodeBreaker;