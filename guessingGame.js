/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

/* **** Guessing Game Functions **** */

var guesses = [];
var playersGuess;
var winningNumber;

$(document).ready(function(){
	generateWinningNumber();
	$('#submit').on('click',playersGuessSubmission);
	//$('#submit').on('keydown',playersGuessSubmission);
	$('#submit').on('click',checkGuess);
	$('#submit').on('click',remainingGuess);
	$('#hint').on('click',provideHint);
	$('#replay').on('click',playAgain);
});

// Generate the Winning Number
function generateWinningNumber(){
	winningNumber = Math.floor(Math.random() * 101);
}

// Fetch the Players Guess
function playersGuessSubmission(){
	if (numberOfGuess <= 5) { 
		playersGuess = +$('#guess').val();
		guesses.push(playersGuess);
		$('#guess').val(null);
	} else {
		$('#guess').val(null);
	}
}


// Check if the Player's Guess is the winning number 
var numberOfGuess = 0;

function checkGuess(){
	if (numberOfGuess > 0 && numberOfGuess < 5 ){
		if (playersGuess == winningNumber){
			displayWon();
		} else if (guesses[numberOfGuess]==guesses[numberOfGuess-1]){
			displayDuplicatedGuess();
		} else {
			displayTryAgain();
		};
	} else if (numberOfGuess == 0 ){
		if (playersGuess == winningNumber){
			displayWon();
		} else {
			displayTryAgain();
		};
	} else if (numberOfGuess >=5 && isNotInArray(winningNumber,guesses)) {
		$("#display").text('You Lost!');
	};
}

function isNotInArray(value, array) {
  return array.indexOf(value) == -1;
}

function displayWon(){
	$("#display").text('Congratulations, You Won!');
	numberOfGuess++;
}

function displayDuplicatedGuess(){
	$("#display").text('Submitted a duplicate guess');
	numberOfGuess++;
}

function displayTryAgain(){
	lowerOrHigher();
	numberOfGuess++;	
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	if (guesses[numberOfGuess] > winningNumber){
		$("#display").text('Try guessing a lower number');
	} else {
		$("#display").text('Try guessing a higher number');
	}
}


function remainingGuess(){
	var numberOfGuessRemained = 5 - numberOfGuess;
	if (numberOfGuessRemained >=0){
		$("#displayHint").text(numberOfGuessRemained + ' Guesses Are Remaining!');
	} else{
		$("#displayHint").text('No Guesses Left.');
	}
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	// display 3 numbers, one of the numbers will be the 'Winning number'
	var number1 = Math.floor(Math.random() * 101);
	var number2 = Math.floor(Math.random() * 101);
	var hintArr = shuffle([number1,number2,winningNumber]);
	$("#displayHint").text("One of these values is the winning number:  "+hintArr);
}

// Shuffle an array
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// Allow the "Player" to Play Again
function playAgain(){
	generateWinningNumber();
	guesses = [];
	numberOfGuess = 0;
	$("#display").text('New Game Starts Again');
	$("#displayHint").text(5 + ' Guesses Are Remaining!');
}


/* **** Event Listeners/Handlers ****  */