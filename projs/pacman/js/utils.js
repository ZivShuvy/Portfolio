function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      var strId = '';
      if (isWallLocation(mat, i, j)) {
        strId = 'id="wall" ';
        cell = '';
      }
      if (cell === '+') {
        cell = '<img src="img/superfood.png" />';
      }
      strHTML += '<td ' + strId + 'class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function getRandomEmptyCell(mat) {
  var emptyCellsCoords = [];
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === EMPTY) {
        emptyCellsCoords.push({ i, j });
      }
    }
  }
  var randIdx = getRandomInt(0, emptyCellsCoords.length);
  return emptyCellsCoords.splice(randIdx, 1)[0];
}

function isWallLocation(mat, i, j) {
  return (i === 0 || i === mat.length - 1 ||
    j === 0 || j === mat.length - 1 ||
    (j === 3 && i > 4 && i < mat.length - 2));
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}