// constants
// Letter distribution via the distribution of tiles in Scrabble
// Casing as listed for display convenience
const letters = ['A','A','A','A','A','A','A','A','A','B','B','C','C','D','D','D','D','E','E','E','E','E','E','E','E','E','E','E','E','F','F','G','G','G','H','H','I','I','I','I','I','I','I','I','I','J','K','L','L','L','L','M','M','N','N','N','N','N','N','O','O','O','O','O','O','O','O','P','P','Qu','R','R','R','R','R','R','S','S','S','S','T','T','T','T','T','T','U','U','U','U','V','V','W','W','X','Y','Y','Z']
const insults = ['Dats nat e werd.', "That's not a word, silly!", 'Seriously? No.', 'Are you even trying?', 'Why do you even bother?', 'Ughh...', 'But ... I mean ... How? ... No.', 'Try again.', 'Remember Hooked on Phonics? Look into it.', 'Questionable at best.', 'Practice makes perfect! Keep trying.', 'Consider resetting the board.', 'No.', 'No, no, and no.', 'Umm... No.', 'Your skill never ceases to underwhelm me.', 'If I throw a stick, will you leave?', 'Your inferiority complex is fully justified.', 'Do you have delusions of adequacy?', 'I like the way you try.', "I like your approach. Now let's see your departure.", 'You fool!'];
const accolades = ['Another one.', 'Nailed it.', 'Nice!', 'Great!', 'Next stop: Scripps Spelling Bee!', 'Genius!', 'Impressive.', 'Are you Will Shortz?', 'Nigel Richards? Is that you?', "You're on fire!", 'Keep up the good work!', 'Yippee ki-yay!', "You're a gift to those around you.", 'You are one smart cookie!', 'Inspiring!', "You're a candle in the dark.", 'Awesome!', 'Crushing it!', "Are you cheating? I feel like you're cheating.", "Is 'on fleek' still a thing? If it is you're totally on fleek.", "Yes!", 'Yes, yes, and yes!', "Where's the applause emoji?", "You're such a nerd; like, in a good way."];


// state variables
let board;
let score;
let foundWords;         
let usedLetters;        
let timer;
let secondsRemaining;
let wordInProgress;     
let letterObjects;      
let colClickIdx;
let rowClickIdx;

// cached element references
$boardArray = [...$('#board > .letters')];  // each div on the board 
                                            // below injected into letterObjects, upon init
$currentWord = $('#current-word');
$message = $('#message'); 
$submitButton = $('#submit'); 
$replayButton = $('#replay'); 
$score = $('#score'); 
$foundWords = $('#found-words'); 
$timer = $('#timer'); 


// event listeners
$('#board').click(clickBoard);
$submitButton.click(submitWord);
$replayButton.click(init);  


// functions
init();

function init() {
    score = 0;
    board = [null, null, null, null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, null];
    foundWords = [];        // hey, so, ummm we need a dictionary with more plurals, right?
    usedLetters = [];       
    wordInProgress = '';
    $message.text('');
    $foundWords.html('');
    secondsRemaining = 300;
    clearInterval(timer);
    timer = setInterval(subtractSecond, 1000);
    render();
    renderBoard(); // randomizer in renderBoard so can't call in render
}

function render() {
    $score.text(`Score: ${score}`);
    $currentWord.text(`${wordInProgress}`);
    // letterObjects.forEach(function(letterObject) {
    //     if (!letterObject.clickable) {
    //         $(letterObject.cellIdx).css("background-color", "rgb(200, 200, 200)");
    //     }
    // });
} 

function renderBoard() {
    letterObjects = [];
    for (i = 0; i < 16; i++) {
        board[i] = letters[Math.floor(Math.random() * letters.length)]; 
        $($boardArray[i]).text(board[i]);  // WTF?!?!?!?!!?!?
        letterObjects.push({
            cellIdx: $($boardArray[i]).attr('id'),
            rowIdx: parseInt($($boardArray[i]).attr('id').slice(1,2)),
            colIdx: parseInt($($boardArray[i]).attr('id').slice(3,4)),
            letterValue: board[i],
            clickable: true
        });
    }
}

function wordCheck(word) {
    isWordValid = dictionary.some(function(validWord) {
        return validWord === word.toLowerCase();
    });
    if (isWordValid) {
        if (word.length > 2) {
            foundWords.push(word);
            addScore(word);
            $message.text(accolades[Math.floor(Math.random() * accolades.length)]);       
        } else {
            $message.text("That's too short of a word – you should know better.");
            isWordValid = false;
        }
    } else {
        $message.text(insults[Math.floor(Math.random() * insults.length)]); 
    }
    return isWordValid;     
} 

function clickBoard(click) {
    const clickIdx = $(click.target).attr('id'); 
    rowClickIdx = parseInt(clickIdx.slice(1, 2));
    colClickIdx = parseInt(clickIdx.slice(3, 4));
    
    // the below if: finds letterObject associated with letter that's clicked on using findIndex
    // if that object's clickable value is false (via bang operator) abort this function
    // this stops the user from clicking on illegal letters
    if (!letterObjects[letterObjects.findIndex(letterObject => letterObject.cellIdx === clickIdx)].clickable) return;
    
    letterObjects.forEach(function(letterObject) {
        if (letterObject.rowIdx === rowClickIdx && letterObject.colIdx === colClickIdx) {
            usedLetters.push(letterObject);
            wordInProgress += letterObject.letterValue.toUpperCase();   //uppercase to account for 'Qu'
        }
    });

    determineClickable();
    render();   // to display wordInProgress
} 

function determineClickable() {
    // change shade of background for clickable and unclickable?
    letterObjects.forEach(function(letterObject) {
        if (Math.abs(letterObject.rowIdx - rowClickIdx) > 1 || Math.abs(letterObject.colIdx - colClickIdx) > 1) {
            letterObject.clickable = false;
        } else {
            letterObject.clickable = true;
        }
        if (usedLetters.includes(letterObject)) {
            letterObject.clickable = false;
        }
    });
}

function addScore(word) {
    if (word.length < 3) {  //use word.length to account for 'Qu'
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

function submitWord(click) {    
    usedLetters = [];

    // to disable clicks after the game is over
    if (secondsRemaining > 0) {
        letterObjects.forEach(function(letterObject) {
            letterObject.clickable = true;
        });
    }
    
    if (foundWords.includes(wordInProgress)) {
        $message.text('Already found that one!');
        wordInProgress = '';
        return;
    } else {
        wordCheck(wordInProgress);      // need to call function to return insult/accolade  
        if (wordCheck(wordInProgress)) {
            foundWords.push(wordInProgress);    
            $foundWords.prepend(`<li>${wordInProgress}</li>`);   
        }
        wordInProgress = '';
    }
    
    $currentWord.text('');    
}

function subtractSecond() {
    secondsRemaining--;
    if (secondsRemaining > 0) {
        $timer.text(`Time remaining: ${timeFormat()}`);
    } else {
        $timer.text('Time remaining: 00:00');
        clearInterval(timer);
        $message.text("Time's up!");
        letterObjects.forEach(function(letterObject) {
            letterObject.clickable = false;
        });
        //gameOver(); here if implemented
    }
}

function timeFormat() {
    const displayMins = Math.floor(secondsRemaining / 60).toString().padStart(1, '0');
    const displaySecs = (secondsRemaining % 60).toString().padStart(2, '0');
    return `${displayMins}:${displaySecs}`;
}

// upon timer end ends board click event, reveals final score, and displays replay button
function gameOver() {} 


// challenges
// timer // actually making it seems pretty simple based on using setTimeout or similar. Displaying it could be a bit tricky, or it could be a piece of cake. Only time(r) will tell.
// establishing what's an allowable click when searching for a word. Maybe just find rowIdx and colIdx and only allow if within +/- 1 and hasn't been clicked. Maybe this isn't that challenging now that I type it out. Leaving this. Enjoy.
// mostly linking to, but also checking the dictionary for word validity
// maybe making a game over popup displaying final score
// maybe making a local score board
// maybe pause the submit listener on game over
// keyboard word entry