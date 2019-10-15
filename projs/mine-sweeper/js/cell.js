function putMines() {
    for (var t = 0; t < gLevel.MINES; t++) {
        var i = getRandomInt(0, gLevel.SIZE - 1);
        var j = getRandomInt(0, gLevel.SIZE - 1);
        if (gBoard[i][j].isMine) {
            t--
            continue;
        }
        gBoard[i][j].isMine = true;
        var elCell = document.querySelector(`#cell-${i}-${j}`);
    }
}

function createCell() {
    var cell =
    {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}

function getCellPos(strCellId) {
    var pos = {};
    var parts = strCellId.split('-');
    pos.i = +parts[1]
    pos.j = +parts[2];
    return pos;
}

function cellClicked(elCell) {
    if (!gGame.isOn) return;
    if (gFirstClick) firstClick();
    var cellPos = getCellPos(elCell.id);
    var cell = gBoard[cellPos.i][cellPos.j];
    if (cell.isShown) return;
    if (cell.isMine) {
        // if (cell.isMarked) return;
        elCell.innerHTML = MINE;
        if (cell.isMarked) return;
        gLives--
        elCell.classList.add('mine');
        if (!gLives) return gameOver();
        cell.isMarked = true;
        gGame.markedCount++;
        gameWon()
        return document.querySelector('.lives').innerText = `You have ${gLives} lives left`
    }
    elCell.innerHTML = cell.minesAroundCount;
    gGame.shownCount++
    cell.isShown = true;
    elCell.classList.add('dark');
    if (cell.minesAroundCount === 0) {
        showNegs(cellPos.i, cellPos.j);
        elCell.innerHTML = '';
    }
    gameWon()
}

function cellMarked(elCell, ev) {
    var cellPos = getCellPos(elCell.id);
    var cell = gBoard[cellPos.i][cellPos.j];
    if (cell.isShown) return;
    if (ev.button === 2) {
        if (!cell.isMarked) {
            cell.isMarked = true;
            elCell.innerHTML = FLAG;
            gGame.markedCount++;
        }
        else {
            cell.isMarked = false;
            gGame.markedCount--;
            elCell.innerHTML = ''
        }
    }
    gameWon()
    return;
}

function countMinesPerCell() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) continue;
            gBoard[i][j].minesAroundCount = countMinesNegs(i, j);
        }
    }
}

function countMinesNegs(cellI, cellJ) {
    var minesCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine) minesCount++;
        }
    }
    return minesCount;
}

function renderCell(location, value) {
    var elCell = document.querySelector(`#cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) renderCell({ i, j }, MINE);
        }
    }
}

function showNegs(cellI, cellJ) {
    var minesCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine) continue;
            if (gBoard[i][j].isShown) continue;
            if (gBoard[i][j].isMarked) continue;
            renderCell({ i, j }, gBoard[i][j].minesAroundCount);
            gBoard[i][j].isShown = true;
            gGame.shownCount++;
            var elCell = document.querySelector(`#cell-${i}-${j}`);
            elCell.classList.add('dark');
            if (gBoard[i][j].minesAroundCount === 0) {
                renderCell({ i, j }, '');
                showNegs(i, j);
            }
        }
    }
    return minesCount;
}

function showSafeCell() {
    if (gSafe === 0) {
        return;
    }
    if (gameWon() || !gLives) return;
    if (gGame.shownCount === gLevel.SIZE * gLevel.SIZE - gLevel.MINES) return
    for (var t = 0; t < gLevel.MINES; t++) {
        var i = getRandomInt(0, gLevel.SIZE - 1);
        var j = getRandomInt(0, gLevel.SIZE - 1);
        if (gBoard[i][j].isMine || gBoard[i][j].isShown) {
            t--
            continue;
        }
        var elCell = document.querySelector(`#cell-${i}-${j}`);
        elCell.classList.add('safe');
        gSafe--
        document.querySelector('.safe-count').innerText = `You got ${gSafe} safe clicks left`;
        setTimeout(() => {
            elCell.classList.remove('safe');
        }, 2000);
        return;
    }
}