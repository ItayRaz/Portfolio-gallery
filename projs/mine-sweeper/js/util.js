
function buildBoard() {
    gBoard = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = createCell();
        }
    }
    return gBoard;
}

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j];
            var idName = 'cell-' + i + '-' + j;
            strHTML += `<td class="cell" id="${idName}" 
            onclick="cellClicked(this)" onmousedown="cellMarked(this, event)"></td>`;
        }
        strHTML += '</tr>';
    }
    var elContainer = document.querySelector('.board');
    elContainer.innerHTML = strHTML;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}