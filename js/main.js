// constants
// Letter distribution via the distribution of tiles in Scrabble
// Casing as listed for display convenience
const letters = ['A','A','A','A','A','A','A','A','A','B','B','C','C','D','D','D','D','E','E','E','E','E','E','E','E','E','E','E','E','F','F','G','G','G','H','H','I','I','I','I','I','I','I','I','I','J','K','L','L','L','L','M','M','N','N','N','N','N','N','O','O','O','O','O','O','O','O','P','P','Qu','R','R','R','R','R','R','S','S','S','S','T','T','T','T','T','T','U','U','U','U','V','V','W','W','X','Y','Y','Z']
const insults = ['Dats nat e werd.', 'Seriously?', 'Are you even trying?', 'Why do you even bother?', 'Ughh...', 'But... I mean... How?', 'Try again.', 'Remember Hooked on Phonics? Look into it.', 'Questionable, at best.', 'Practice makes perfect.', 'Consider resetting the board.', 'No.', 'No, no, and no.', 'Your skill never ceases to underwhelm me.', 'If I throw a stick, will you leave?', 'Your inferiority complex is fully justified.', 'Do you have delusions of adequacy?', 'I like the way you try.', "I like your approach. Now let's see your departure.", 'You fool!'];
const accolades = ['Another one.', 'Nailed it.', 'Nice!', 'Great!', 'Next stop: Scripps Spelling Bee!', 'Genius!', 'Impressive.', 'Are you Will Shortz?', 'Nigel Richards? Is that you?', "You're on fire!", 'Keep up the good work!', 'Yippee ki-yay!', "You're a gift to those around you.", 'You are one smart cookie!', 'Inspiring!', "You're a candle in the dark.", 'Awesome!', 'Crushing it!', "Are you cheating? I feel like you're cheating.", "Is 'on fleek' still a thing? If it is, you're totally on fleek."];


// state variables
let board;
let score;
let foundWords;  //to avoid using the same word for more than one play
let usedLetters; // changes after every click during a turn
let timer;
let wordInProgress; // word that is being built by clicks


// cached element references

//Should this be an object with ricj indices?
$boardArray = [...$('#board > .letters')]; // each div on the board 


$message = $('#message'); // for messages like 'That's not a word, silly!' and 'Time's up.'
$submitButton = $('#message'); // button for checking word
$replayButton = $('#replay'); // button that pops up after game ends
$score = $('#score'); // to display score
$foundWords = $('#found-words'); // maybe. just displays list of already found words
$timer = $('timer'); // its a timer


// event listeners
// hope you have fast fingers, this is going to be the only input method
$('#board').click(clickBoard);
$replayButton.click(init);  // replayClick; // calls init


// functions

init();
// makes 4x4 board with random letters using Math.random and the index of an alphabet array
function init() {
    //initiate board with random letters
    score = 0;
    board = [null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null];
    //initiate timer maybe 5 minutes?
    foundWords = [];
    usedLetters = {};       // dear past me, why did you make this an object?
                            // key= divId to account for multiple occurences of a letter        
                            // object of objects? How best to record clickable/unclickable?
                            // letter value, clickable, 
                            // is this the best structure for boardArray? array of objects?
                            // rowIdx, colIdx, clickable, letter
                            // final answer. usedLetters and boardArray are associated arrays of objects
    wordInProgress = '';
    render();
    renderBoard(); // randomizer in renderBoard don't call in render
}

// displays letters on board, updates score, displays 'words in progress' displays appropriate messages, displays found words
function render() {
    $score.text(`Score: ${score}`);
    // display found words as new li in found words ul
    

    //renderBoard();  Not here, you fool!
} 

function renderBoard() {
    for (i = 0; i < 16; i++) {
        board[i] = letters[Math.floor(Math.random() * 98)]; 
        // console.log(`$boardArray[${i}] --->  ${$boardArray[i]}`);
        $($boardArray[i]).text(board[i]);  // WTF?!?!?!?!!?!?
    }
}

// checks word against dictionary for validity and against foundWords 
// called when submit word button clicked
function wordCheck(word) {
    // after submit compare submitted word with dictionary. 
    // if match found call addScore and probably kick out message
    // if no match insult the user
    isWordValid = dictionary.some(function(validWord) {
        return validWord === word.toLowerCase();
    });
    if (isWordValid) {
        foundWords.push(word);
        addScore(word);
        $message.text(accolades[Math.floor(Math.random() * accolades.length)]);       // make an array of different message options
    } else {
        $message.text(insults[Math.floor(Math.random() * insults.length)])   // same here, Math.random it
    }
    return isWordValid;     // necessary? 
} 

// establishes what clicks are valid, and logs usedLetters and words in progress
function clickBoard(click) {
    // need to render word in progress. probably do here 
    // push clicked letters to, umm i guess, usedLetters object
    const clickIdx = $(click.target).attr('id'); // pull from click event
    const rowIdx = clickIdx.slice(1, 2);
    const colIdx = clickIdx.slice(3, 4);
    console.log(click.target);
    console.log('row index: ', rowIdx);
    console.log('column index: ', colIdx);
    determineClickable();
} 

function determineClickable() {
    // use id from click
    // clickable is +/- 1 in both indices setminus clicked letters
    // change shade of background for clickable and unclickable?
}

// when words are found and valid, adds to score based on word length. Establish score based on length of word in the dictionary to account for the Qu tile
function addScore(word) {
    if (word.length < 3) {
        score += 0;
    } else if (word.length < 5) {
        score += 1;
    } else if (word.length < 6) {
        score += 2;
    } else if (word.length < 7) {
        score += 3;
    } else if (word.length < 8) {
        score += 5;
    } else {
        score += 11
    }
    render();
} 

// counts down from set time limit
function countDown() {} 

// upon timer end ends board click event, reveals final score, and displays replay button
function gameOver() {} 



// console.log(dictionary.length);
// console.log(typeof(dictionary));
// console.log($boardArray);
// console.log('boardArray[4]: ', $boardArray[4]);
// console.log('board: ', board);
// console.log(`board length: ${board.length}`)
// console.log(`$boardArray length: ${$boardArray.length}`)

// console.log(letters.length)

// challenges
// timer // actually making it seems pretty simple based on using setTimeout or similar. Displaying it could be a bit tricky, or it could be a piece of cake. Only time(r) will tell.
// establishing what's an allowable click when searching for a word. Maybe just find rowIdx and colIdx and only allow if within +/- 1 and hasn't been clicked. Maybe this isn't that challenging now that I type it out. Leaving this. Enjoy.
// mostly linking to, but also checking the dictionary for word validity