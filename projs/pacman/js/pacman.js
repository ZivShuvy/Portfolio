'use strict'
const PACMAN = '😷';
const PACMAN_IMG = '<img class="pacman" src="img/pacman.png" />';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    renderCell(gPacman.location, PACMAN_IMG);

}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        var eatingFood = new Audio('./sound/eat.wav');
        eatingFood.volume = 0.2;
        eatingFood.play();
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            var eatingGhostSound = new Audio('./sound/eatingghost.wav')
            eatingGhostSound.volume = 0.2;
            eatingGhostSound.play();
            killGhost(nextLocation);
        } else {
            gameOver(false);
            renderCell(gPacman.location, EMPTY)
            return;
        }
    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) {
            return;
        } else {
            updateScore(1);
            gPacman.isSuper = true
            updateGhosts();
            var superPacmanSound = new Audio('./sound/superpacman.wav');
            superPacmanSound.volume = 0.2;
            superPacmanSound.play();
            setTimeout(function () {
                gPacman.isSuper = false
                updateGhosts();
            }, 5000);
        }
    } else if (nextCell === CHERRY) {
        updateScore(10);
        var eatingCherrySound = new Audio('./sound/eatingcherry.mp3');
        eatingCherrySound.volume = 0.2;
        eatingCherrySound.play();
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN_IMG);
    rotatePacman((ev));
  
    if (checkVictory()) gameOver(true);
}

function rotatePacman(eventKeyboard) {
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            var elPacman = document.querySelector('.pacman');
            elPacman.style.transform = 'rotate(270deg)';
            break;
        case 'ArrowDown':
            var elPacman = document.querySelector('.pacman');
            elPacman.style.transform = 'rotate(90deg)';
            break;
        case 'ArrowLeft':
            var elPacman = document.querySelector('.pacman');
            elPacman.style.transform = 'rotate(180deg)';
            break;
        case 'ArrowRight':
            var elPacman = document.querySelector('.pacman');
            elPacman.style.transform = 'rotate(0deg)';
            break;
    }
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}