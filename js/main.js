// constants
// dictionary --- maybe this: https://github.com/dwyl/english-words/blob/master/words_alpha.txt 
// NO PLAYER TRACKER --- this is going to be boggle solitaire, no win logic necessary either

// state variables
// board
// score
// foundWords --- to avoid using the same word for more than one play
// usedLetters --- changes after every click
// timer 
// wordInProgress --- word that is being built by clicks


// cached element references
// boardEls --- each div on the board
// msgEl --- for messages like 'That's not a word, silly!' and 'Time's up.'
// submit word --- button for checking word
// replay --- button that pops up after game ends
// score --- to display score
// foundWords --- maybe. just displays list of already found words
// timer --- its a timer


// event listeners
// board click --- hope you have fast fingers, this is going to be the only input method
// replay click --- calls init


// functions
// init --- makes 4x4 board with random letters using Math.random and the index of an alphabet array
// render --- displays letters on board, updates score, displays 'words in progress' displays appropriate messages, displays found words
// wordCheck --- checks word against dictionary for validity and against foundWords - called when submit word button clicked
// clickBoard --- establishes what clicks are valid, and logs usedLetters and words in progress
// addScore --- when words are found and valid, adds to score based on word length. Establish score based on length of word in the dictionary to account for the Qu tile
// timer --- counts down from set time limit
// gameOver --- upon timer end ends board click event, reveals final score, and displays replay button



// challenges
// timer --- actually making it seems pretty simple based on using setTimeout or similar. Displaying it could be a bit tricky, or it could be a piece of cake. Only time(r) will tell.
// establishing what's an allowable click when searching for a word. Maybe just find rowIdx and colIdx and only allow if within +/- 1 and hasn't been clicked. Maybe this isn't that challenging now that I type it out. Leaving this. Enjoy.
// mostly linking to, but also checking the dictionary for word validity