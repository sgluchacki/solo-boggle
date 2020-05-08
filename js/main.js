// constants
// dictionary --- maybe this: https://github.com/dwyl/english-words/blob/master/words_alpha.txt 
// NO PLAYER TRACKER --- this is going to be boggle solitaire, no win logic necessary either

// state variables
let board;
let score;
let foundWords;  //to avoid using the same word for more than one play
let usedLetters; // changes after every click during a turn
let timer; 
let wordInProgress; // word that is being built by clicks


// cached element references
// $boardEls; // each div on the board
// $msgEl; // for messages like 'That's not a word, silly!' and 'Time's up.'
// $submitButton; // button for checking word
// $replayButton; // button that pops up after game ends
// $core; // to display score
// $foundWords; // maybe. just displays list of already found words
// $timer; // its a timer


// event listeners
// boardClick; // hope you have fast fingers, this is going to be the only input method
// replayClick; // calls init


// functions
function init() {}// makes 4x4 board with random letters using Math.random and the index of an alphabet array
function render() {} // displays letters on board, updates score, displays 'words in progress' displays appropriate messages, displays found words
function wordCheck() {} // checks word against dictionary for validity and against foundWords - called when submit word button clicked
function clickBoard() {} // establishes what clicks are valid, and logs usedLetters and words in progress
function addScore() {} // when words are found and valid, adds to score based on word length. Establish score based on length of word in the dictionary to account for the Qu tile
// function timer() {} // counts down from set time limit
function gameOver() {} // upon timer end ends board click event, reveals final score, and displays replay button

console.log(dictionary.length);

// challenges
// timer // actually making it seems pretty simple based on using setTimeout or similar. Displaying it could be a bit tricky, or it could be a piece of cake. Only time(r) will tell.
// establishing what's an allowable click when searching for a word. Maybe just find rowIdx and colIdx and only allow if within +/- 1 and hasn't been clicked. Maybe this isn't that challenging now that I type it out. Leaving this. Enjoy.
// mostly linking to, but also checking the dictionary for word validity