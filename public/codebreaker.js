/*------------------------------------------------------------------------------------
*  CODEBREAKER OBJECT
*
* the Codebreaker is the player that will try to guess the secret.
 --------------------------------------------------------------------------------- */
class CodeBreaker {
  constructor() {
  }

  /*
   * Processes the user guess from UI 
   * */
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