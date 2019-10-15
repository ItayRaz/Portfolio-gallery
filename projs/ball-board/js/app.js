var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var STOP = 'STOP';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';
var STOP_IMG = '✋';

var gGamerPos = { i: 2, j: 9 };
var gBoard = buildBoard();
var gCount = 0;
var gIsGamerStuck = false;
var ballInterval;
var stopInterval;

init();
function init() {
	gBoard = buildBoard();
	renderBoard(gBoard);
	ballInterval = setInterval(spreadBalls, 2000);
	document.querySelector('button').style.display = 'none';
	document.querySelector('h2').innerText = '';
	stopInterval = setInterval(spreadStop, 5000);
}

function buildBoard() {
	// Create the Matrix 10 * 12 
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR everywhere and WALL at edges
			board[i][j] = { type: 'FLOOR', gameElement: null }
			if (i === 0 || j === 0 ||
				i === board.length - 1 || j === board[0].length - 1) {
				board[i][j].type = WALL;
			}
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	board[9][6].type = FLOOR;
	board[0][6].type = FLOOR;
	board[5][11].type = FLOOR;
	board[5][0].type = FLOOR;
	board[3][3].gameElement = BALL;
	board[3][8].gameElement = BALL;
	// console.table(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j }) // e.g. - cell-3-8

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			} else if (currCell.gameElement === STOP) {
				strHTML += STOP_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	if (targetCell.gameElement === BALL) {
		gCount++;
		document.querySelector('span').innerText = gCount;
		var audio = new Audio('sounds/01.mp3');
		audio.play();
	}
	if (targetCell.gameElement === STOP) {
		gIsGamerStuck = true;
		setTimeout(() => {
			gIsGamerStuck = false;
		}, 3000);
	}
	if (targetCell === gBoard[5][11] || gBoard[5][0] || gBoard[9][6] || gBoard[0][6]) {
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		if (targetCell === gBoard[5][11]) {
			gGamerPos.i = 5;
			gGamerPos.j = 0;
		}
		if (targetCell === gBoard[5][0]) {
			gGamerPos.i = 5;
			gGamerPos.j = 11;
		}
		if (targetCell === gBoard[0][6]) {
			gGamerPos.i = 9;
			gGamerPos.j = 6;
		}
		if (targetCell === gBoard[9][6]) {
			gGamerPos.i = 0;
			gGamerPos.j = 6;
		}

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

	}

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	// if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
	if (iAbsDiff + jAbsDiff === 1) {
		console.log('Moving to: ', i, j);

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
		}

		// Move the gamer

		// Update the MODEL and DOM
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);

	if (victory()) {
		clearInterval(ballInterval);
		clearInterval(stopInterval);
		document.querySelector('button').style.display = 'block';
		document.querySelector('h2').innerText = 'You Won The Game!!'
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	if (gIsGamerStuck) return;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function spreadBalls() {
	var i = getRandomInt(1, 8);
	var j = getRandomInt(1, 10);
	var currCell = gBoard[i][j];
	if (currCell.gameElement === null) {
		currCell.gameElement = BALL;
		renderCell({ i, j }, BALL_IMG)
	}
	return currCell;
}
function spreadStop() {
	var i = getRandomInt(1, 8);
	var j = getRandomInt(1, 10);
	var currCell = gBoard[i][j];
	if (currCell.gameElement === null) {
		currCell.gameElement = STOP;
		renderCell({ i, j }, STOP_IMG)
		setTimeout(() => {
			if (currCell.gameElement === GAMER) return;
			renderCell({ i, j }, '');
			currCell.gameElement = null;
		}, 3000);
	}
	return currCell;
}

function victory() {
	var count = 0;
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 12; j++) {
			if (gBoard[i][j].gameElement === BALL) {
				count++
			}
		}
	}
	if (count === 0) return true;
	return false;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}