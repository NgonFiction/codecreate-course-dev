// Hangman Game
// Lesson Date: 26/3/19

// The phrase inputted by the user
let phrase;
// Number of the current image
// images are to be named "hangmanX.png" where X is a number from 0 to _
let imgNum = 1;

// Adds new phrase into the game
function addPhrase() {
  phrase = document.getElementById('phraseInput').value;
  phrase = phrase.toUpperCase();

  // The answer characters are all replaced with '-' initially.
  document.getElementById('answer').innerHTML = phrase.replace(/[A-Z]/g, '-');
  // Reveal the hangman game
  document.getElementById('hangmanDiv').style.display = 'block';
  // Hide the add phrase input section
  document.getElementById('inputDiv').style.display = 'none';
}

/*
 ** Checks if guess occurs in the phrase
    - If occurs then replace respective '-'s with the guess char in answer field
    - If not, then change hangman image to next image
*/
function checkGuess() {
  // Get the guess character from guess input field
  let guess = document.getElementById('guessInput').value;
  // Change it to uppercase
  guess = guess.toUpperCase();

  // If the guess is not a character then alert the user!
  if (guess.length !== 1) {
    alert("Your guess should be a character!");
    return;
  }

  // If letter appears in phrase, then replace '-' at that index with char
  if (phrase.includes(guess)) {
    // Get the answer element
    let answer = document.getElementById('answer');
    // Reveal correct letters in answer and replace char with guess char
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === guess) {
          if (i === 0) {
            answer.innerHTML = guess + answer.innerHTML.substr(1);
          }
          else {
            answer.innerHTML = answer.innerHTML.substr(0, i) + guess + answer.innerHTML.substr(i + 1);
          }
        }
    }
    // Check if answer is complete aka matches phrase then congrats!
    if (answer.innerHTML === phrase) {
      alert('Congrats! You won!');
      document.getElementById('newPhraseButton').style.display = 'block';
    }
  }
  else {
    if (imgNum === 10) {
      alert("Game over!");
      document.getElementById('newPhraseButton').style.display = 'block';
      return;
    }
    // If guess does not appear in answer then change image to next stage
    imgNum = imgNum + 1;
    document.getElementById('hangmanImg').src = "hangman" + imgNum + ".png";

    // Also add the guess char into the guesses list
    let guess = document.getElementById('guessInput').value;
    guess = guess.toUpperCase();
    let guesses = document.getElementById('guesses');
    guesses.innerHTML = guesses.innerHTML + " " + guess;
  }
}
