let board = [];
let currentPlayer = 'red';
let gameActive = true;

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < 6; ++row) {
        board[row] = [];
        for (let col = 0; col < 7; ++col) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.filled = 'empty';
            cell.addEventListener('click', () => playMove(col));
            boardElement.appendChild(cell);
            board[row][col] = cell;
        }
    }
}

function playMove(col) {
    if (!gameActive) return;
    for (let row = 5; row >= 0; --row) {
        if (board[row][col].dataset.filled === 'empty') {
            board[row][col].style.backgroundColor = currentPlayer;
            board[row][col].dataset.filled = currentPlayer;
            if (checkWin(row, col)) {
                document.getElementById('message').innerText = `${currentPlayer.toUpperCase()} has won!`;
                gameActive = false;
            } else if (checkDraw()) {
                document.getElementById('message').innerText = 'No winner!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

function checkWin(row, col) {
   
    if (checkHorizontalVertical(row, col)) {
        return true;
    }
  
    if (checkDiagonals(row, col)) {
        return true;
    }
    return false;
}


function checkDraw() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[row][col].dataset.filled === 'empty') {
                return false; 
            }
        }
    }
    return true;
}


function resetGame() {
    board.forEach(row => row.forEach(cell => {
        cell.style.backgroundColor = '#f0f0f0';
        cell.dataset.filled = 'empty';
    }));
    document.getElementById('message').innerText = '';
    currentPlayer = 'red';
    gameActive = true;
}

function checkHorizontalVertical(row, col) {
    const color = board[row][col].dataset.filled;

    let horizontalCount = 1;
    for (let i = col - 1; i >= 0 && board[row][i].dataset.filled === color; --i) {
        ++horizontalCount;
    }
    for (let i = col + 1; i < 7 && board[row][i].dataset.filled === color; ++i) {
        ++horizontalCount;
    }
    if (horizontalCount >= 4) return true;

    let verticalCount = 1;
    for (let i = row - 1; i >= 0 && board[i][col].dataset.filled === color; --i) {
        ++verticalCount;
    }
    for (let i = row + 1; i < 6 && board[i][col].dataset.filled === color; ++i) {
        ++verticalCount;
    }
    if (verticalCount >= 4) return true;

    return false;
}
function checkDiagonals(row, col) {
    const color = board[row][col].dataset.filled;

    let mainDiagonalCount = 1;
    for (let i = 1; row - i >= 0 && col - i >= 0 && board[row - i][col - i].dataset.filled === color; ++i) {
        ++mainDiagonalCount;
    }
    for (let i = 1; row + i < 6 && col + i < 7 && board[row + i][col + i].dataset.filled === color; ++i) {
        ++mainDiagonalCount;
    }
    if (mainDiagonalCount >= 4) return true;

    let secondaryDiagonalCount = 1;
    for (let i = 1; row - i >= 0 && col + i < 7 && board[row - i][col + i].dataset.filled === color; ++i) {
        ++secondaryDiagonalCount;
    }
    for (let i = 1; row + i < 6 && col - i >= 0 && board[row + i][col - i].dataset.filled === color; ++i) {
        ++secondaryDiagonalCount;
    }
    if (secondaryDiagonalCount >= 4) return true;

    return false;
}

createBoard();
