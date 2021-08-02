'use strict'
const GHOST = '&#9781;';
const SCARED_GHOST_IMG = '<img src="img/scaredghost.png" />';

var gGhosts = []
var gIntervalGhosts;
var gGhostIdx = 1;
var gKilledGhosts = [];
var gGhostTimeoutId;

function createGhost(board, id = gGhostIdx++) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        id
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost));
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function killGhost(location) {
    clearTimeout(gGhostTimeoutId)
    for (var idx = 0; idx < gGhosts.length; idx++) {
        var ghost = gGhosts[idx]
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            var killedGhost = gGhosts.splice(idx, 1)[0];
            killedGhost.location = { i: 3, j:3 };
            killedGhost.currCellContent = '';
            gKilledGhosts.push(killedGhost);
            //MODEL
            gBoard[location.i][location.j] = EMPTY
            //DOM
            renderCell(location, EMPTY)
            gGhostTimeoutId = setTimeout(function () {
                gGhosts = gGhosts.concat(gKilledGhosts);
                gKilledGhosts = [];
            }, 5000)
            return
        }
    }
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            killGhost(ghost.location)
        }
        else {
            renderCell(gPacman.location, getGhostHTML(ghost));
            renderCell(ghost.location, ghost.currCellContent);
            gameOver(false);
            return;
        }
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    if (ghost.currCellContent === SUPER_FOOD) {
        renderCell(ghost.location, SUPER_FOOD_IMG);
    } else {
        renderCell(ghost.location, ghost.currCellContent)
    }

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function updateGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<img src="img/scaredghost.png" />`;
    } else {
        return `<img src="img/ghost${ghost.id}.png" />`;
    }
}