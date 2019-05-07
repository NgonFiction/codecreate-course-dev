let phrase;
let imgNum = 1;

function setPhrase() {
    phrase = document.getElementById("phraseInput").value;
    phrase = phrase.toUpperCase();

    // The answer characters are all replaced with '-' initially.
    document.getElementById('answer').innerHTML = phrase.replace(/[A-Z]/g, '-');

    // Set guesses list to an empty string
    document.getElementById('guesses').innerHTML = "";
    // Set the hangman image to first image - hangman1.png
    document.getElementById('hangmanImg').src = "hangman1.png";
    // Empty the text in guess input 
    document.getElementById('guessInput').value = "";
}

function checkGuess() {
    let guess = document.getElementById("guessInput").value;
    guess = guess.toUpperCase();

    // If letter appears in phrase, then replace '-' at that index with char
    if (phrase.includes(guess)) {
        // Get the answer element
        let answer = document.getElementById('answer');
        // Reveal correct letters in answer and replace char with guess char
        for (let i = 0; i < phrase.length; i++) {
            if (phrase[i] === guess) {
                // If the first character matches guess
                if (i === 0) {
                    /*
                        Replace first char of answer with guess and rest of answer should be the same.
                        answer.innerHTML.substr(1) gets the characters of answer starting from the 1st index (2nd letter)
                        Example: 
                            phrase is 'CODE'
                            answer is currently '----'
                            guess is 'C'
                            answer = guess + answer.innerHTML.substr(1)
                            answer = 'C' + '---'
                            so answer should now be 'C---'
                    */
                    answer.innerHTML = guess + answer.innerHTML.substr(1);
                }
                else { // Else if not the first character and it matches guess
                    /*
                        Only replace the character at index i with guess char and the other characters of answer shouldn't change
                        answer.innerHTML.substr(0, i) gets the characters before index 'i' (where guess char is found)
                        answer.innerHTML.substr(i + 1) gets the characters after index 'i' (where guess char is found)
                        Example: 
                            phrase is 'SNEAKY'
                            answer is currently 'S----'
                            guess is 'E'
                            answer = answer.innerHTML.substr(0, 2) + guess + answer.innerHTML.substr(3)
                            answer = 'S-' + guess + '---'
                            answer is now 'S-E---'
                    */
                    answer.innerHTML = answer.innerHTML.substr(0, i) + guess + answer.innerHTML.substr(i + 1);
                }
            }
        }
        // Check if answer is complete aka matches phrase then congrats!
        if (answer.innerHTML === phrase) {
            alert('Congrats! You won!');
        }
    }
    else {
        if (imgNum === 7) {
            alert("Game over!");
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
