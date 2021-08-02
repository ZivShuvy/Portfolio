'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = '+'
const CHERRY = '🍒'

const SUPER_FOOD_IMG = '<img src="img/superfood.png" />';
const CHERRY_IMG = '<img src="img/cherry.png" />';

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gCherryInterval;

function init() {
    gBoard = buildBoard();
    printMat(gBoard, '.board-container');
    createPacman(gBoard);
    createGhosts(gBoard);
    gGame.isOn = true;
    gCherryInterval = setInterval(addCherry, 15000);
    playStartSound();
}

function addCherry() {
    var randEmptyLocation = getRandomEmptyCell(gBoard);
    if (!randEmptyLocation) return;
    gBoard[randEmptyLocation.i][randEmptyLocation.j] = CHERRY;
    renderCell(randEmptyLocation, CHERRY_IMG);
}

function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell === '.' || currCell === SUPER_FOOD) {
                return false;
            }
        }
    }
    return true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            else if (i === 1 && j === 1 ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = SUPER_FOOD;
            }
        }
    }
    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function restartGame() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    gGhostIdx = 1;
    gGame.foodGenerated = -1;
    gGame.score = 0;
    document.querySelector('h2 span').innerText = gGame.score;
    init();
}

function gameOver(isWon) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    var elModal = document.querySelector('.modal');
    var elH2 = document.querySelector('.modal h2');
    var elBtn = document.querySelector('.modal button');
    elH2.innerText = isWon ? 'Victory!' : 'You lost!';
    elBtn.innerText = isWon ? 'Play again' : 'Try again';
    elModal.style.display = 'block';
    if (!isWon) {
        var loseSound = new Audio('./sound/lose.wav')
        loseSound.volume = 0.2;
        loseSound.play();
    }
}

function playStartSound() {
    var startSound = new Audio('./sound/start.wav');
    startSound.autoplay = false;
    startSound.volume = 0.2;
    startSound.play();
}

