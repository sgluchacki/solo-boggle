// constants
const letters = ['A','A','A','A','A','A','A','A','A','B','B','C','C','D','D','D','D','E','E','E','E','E','E','E','E','E','E','E','E','F','F','G','G','G','H','H','I','I','I','I','I','I','I','I','I','J','K','L','L','L','L','M','M','N','N','N','N','N','N','O','O','O','O','O','O','O','O','P','P','Qu','R','R','R','R','R','R','S','S','S','S','T','T','T','T','T','T','U','U','U','U','V','V','W','W','X','Y','Y','Z']
const insults = ['Dats nat e werd.', "That's not a word, silly!", 'Seriously? No.', 'Are you even trying?', 'Why do you even bother?', 'Ughh...', 'But ... I mean ... How? ... No.', 'Try again.', 'Remember Hooked on Phonics? Look into it.', 'Questionable at best.', 'Practice makes perfect! Keep trying.', 'Consider resetting the board.', 'No.', 'No, no, and no.', 'Umm... No.', 'Your skill never ceases to underwhelm me.', 'If I throw a stick, will you leave?', 'Your inferiority complex is fully justified.', 'Do you have delusions of adequacy?', 'I like the way you try.', "I like your approach. Now let's see your departure.", 'You fool!'];
const accolades = ['Another one.', 'Nailed it.', 'Nice!', 'Great!', 'Next stop: Scripps Spelling Bee!', 'Genius!', 'Impressive.', 'Are you Will Shortz?', 'Nigel Richards? Is that you?', "You're on fire!", 'Keep up the good work!', 'Yippee ki-yay!', "You're a gift to those around you.", 'You are one smart cookie!', 'Inspiring!', "You're a candle in the dark.", 'Awesome!', 'Crushing it!', "Are you cheating? I feel like you're cheating.", "Is 'on fleek' still a thing? If it is you're totally on fleek.", "Yes!", 'Yes, yes, and yes!', "Where's the applause emoji?", "You're such a nerd; like, in a good way."];

// state variables
let board, score, foundWords, usedLetters, timer, secondsRemaining, 
    wordInProgress, letterObjects, colClickIdx, rowClickIdx, highScore;

// local storage access
if (localStorage.getItem('yourHighScore')) {
    highScore = parseInt(localStorage.getItem('yourHighScore'));
} else {
    highScore = 0;
}

// cached element references
let $boardArray = [...$('#board > .letters')];
let $currentWord = $('#current-word');
let $message = $('#message'); 
let $submitButton = $('#submit'); 
let $replayButton = $('#replay'); 
let $score = $('#score'); 
let $foundWords = $('#found-words'); 
let $timer = $('#timer'); 
let $highScore = $('#high-score');

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
    foundWords = [];        
    usedLetters = [];       
    wordInProgress = '';
    $message.text('');
    $foundWords.html('');
    secondsRemaining = 180;
    clearInterval(timer);
    timer = setInterval(subtractSecond, 1000);
    renderBoard(); // randomizer in renderBoard so can't call in render
    render();
}

function render() {
    $score.text(`Score: ${score}`);
    $highScore.text(`highScore: ${highScore}`);
    $currentWord.text(`${wordInProgress}`);
    letterObjects.forEach(function(letterObject) {
        if (letterObject.clickable === true || letterObject.clickable === false ) {
            $('#' + letterObject.cellIdx).css("background-color", "rgb(67, 159, 231)");
            $('#' + letterObject.cellIdx).css("color", "rgb(255, 255, 255)");
        } else if (letterObject.clickable === 0) {  // Use value of 0 here to mesh with line 113
            $('#' + letterObject.cellIdx).css("background-color", "rgb(255, 255, 255)");
            $('#' + letterObject.cellIdx).css("color", "rgb(0, 0, 0)");
        }
    });
} 

function renderBoard() {
    letterObjects = [];
    for (let i = 0; i < 16; i++) {
        board[i] = letters[Math.floor(Math.random() * letters.length)]; 
        $($boardArray[i]).text(board[i]);
        letterObjects.push({
            cellIdx: $($boardArray[i]).attr('id'),
            rowIdx: parseInt($($boardArray[i]).attr('id').slice(1,2)),
            colIdx: parseInt($($boardArray[i]).attr('id').slice(3,4)),
            letterValue: board[i],
            clickable: true
        });
        $('#' + letterObjects[i].cellIdx).css("background-color", "rgb(255, 255, 255)");
        $('#' + letterObjects[i].cellIdx).css("color", "rgb(0, 0, 0)");
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
    letterObjects.forEach(function(letterObject) {
        if (Math.abs(letterObject.rowIdx - rowClickIdx) > 1 || Math.abs(letterObject.colIdx - colClickIdx) > 1) {
            letterObject.clickable = false;
        } else {
            letterObject.clickable = true;
        }
        if (usedLetters.includes(letterObject)) {
            letterObject.clickable = 0;     // Use value of 0 here to mesh with line 113
        }
    });
}

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
}

function submitWord(click) {    
    usedLetters = [];

    if (secondsRemaining > 0) {
        letterObjects.forEach(function(letterObject) {
            letterObject.clickable = true;
        });
    }
    
    if (foundWords.includes(wordInProgress)) {
        $message.text('Already found that one!');
    } else {
        wordCheck(wordInProgress);      
        if (wordCheck(wordInProgress)) {
            foundWords.push(wordInProgress);    
            $foundWords.append(`<li>${wordInProgress}</li>`);   
        }
    }
    
    wordInProgress = '';
    $currentWord.text('');
    render();
}

function subtractSecond() {
    secondsRemaining--;
    if (secondsRemaining > 0) {
        $timer.html(`Time remaining: ${timeFormat()}`);
    } else {
        $timer.html('Time remaining: 0:00');
        clearInterval(timer);
        $message.text("Time's up!");
        letterObjects.forEach(function(letterObject) {
            letterObject.clickable = false;
        });
        if (score > highScore) {
            $message.text("You've set a new high score!");
            highScore = score;
            localStorage.setItem('yourHighScore', highScore);
        }
    }
    render();   // in case of new high score
}

function timeFormat() {
    const displayMins = Math.floor(secondsRemaining / 60).toString().padStart(1, '0');
    const displaySecs = (secondsRemaining % 60).toString().padStart(2, '0');
    return `${displayMins}:${displaySecs}`;
}