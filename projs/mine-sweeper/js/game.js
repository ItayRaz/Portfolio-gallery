'use strict'

var MINE = '💣'
var FLAG = '🚩'

var gBoard;
var gFirstClick;
var gSafe = 3;
var gLives = 3;
var gLevel = { SIZE: 4, MINES: 3 };
var gIntervalId;
var gWinTime;
var gStartTime;
var gStorage = 'bestTime'
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gGame.isOn = true;
    gFirstClick = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gLives = 3;
    gSafe = 3;
    buildBoard();
    renderBoard();
    clearInterval(gIntervalId);
    document.querySelector('h2').style.display = 'none';
    document.querySelector('.won').style.display = 'none';
    document.querySelector('.restart').innerHTML = '😊';
    document.querySelector('.timer').innerText = '0:00'
    document.querySelector('.lives').innerText = `You have ${gLives} lives left`
    document.querySelector('.best-time').innerText = `Best Time: 
    ${localStorage.getItem(gStorage) ? localStorage.getItem(gStorage) : '0:00'}`;
}

function firstClick() {
    putMines();
    countMinesPerCell();
    gStartTime = Date.now();
    timer();
    gFirstClick = false;
}

function gameOver() {
    gGame.isOn = false;
    showAllMines();
    clearInterval(gIntervalId);
    document.querySelector('.restart').innerHTML = '😭';
    document.querySelector('h2').style.display = 'block';
}

function gameWon() {
    if (gGame.markedCount === gLevel.MINES &&
        gGame.shownCount === gLevel.SIZE * gLevel.SIZE - gLevel.MINES) {
        gGame.isOn = false;
        clearInterval(gIntervalId);
        gWinTime = Date.now();
        bestTime();
        document.querySelector('.won').style.display = 'block';
        document.querySelector('.restart').innerHTML = '😎';
        return true;
    }
    return false;
}

function timer() {
    var timerStart = Date.now()
    gIntervalId = setInterval(() => {
        document.querySelector('.timer').innerText = (Date.now() - timerStart) / 1000
    }, 1)
}

function bestTime() {
    var seconds;
    var bestTime = localStorage.getItem(gStorage);
    bestTime = bestTime ? Number.parseFloat(bestTime) : Infinity;
    seconds = (gWinTime - gStartTime) / 1000;
    seconds = seconds < bestTime ? seconds : bestTime;
    bestTime = seconds;
    localStorage.setItem(gStorage, seconds);
    document.querySelector('.best-time').innerText = `Best Time: ${seconds}`;
    return seconds;
}

//there are 3 mines on easy mode because you have 3 lives as you said on the PDF
function easy() {
    gLevel.SIZE = 4;
    gLevel.MINES = 3;
    gStorage = 'bestTime'
    init();
}
function medium() {
    gLevel.SIZE = 8;
    gLevel.MINES = 12;
    gStorage = 'bestTimeM'
    init();
}
function expert() {
    gLevel.SIZE = 12;
    gLevel.MINES = 30;
    gStorage = 'bestTimeE'
    init();
}