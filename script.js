const ROWS = 6;
const COLUMNS = 7;
const START_ROW = 5;
const CONNECT_FOUR = 4;
const RESET_COLOR = '#f0f0f0';

let board = [];
let currentPlayer = 'red';
let gameActive = true;

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let row = 0; row < ROWS; ++row) {
        board[row] = [];
        for (let col = 0; col < COLUMNS; ++col) {
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
    for (let row = START_ROW; row >= 0; --row) {
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
    if (checkHorizontalVertical(row, col) || checkDiagonals(row, col)) {
        return true;
    }
    return false;
}

function checkDraw() {
    for (let row = 0; row < ROWS; ++row) {
        for (let col = 0; col < COLUMNS; ++col) {
            if (board[row][col].dataset.filled === 'empty') {
                return false;
            }
        }
    }
    return true;
}

function resetGame() {
    board.forEach(row => row.forEach(cell => {
        cell.style.backgroundColor = RESET_COLOR;
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
    for (let i = col + 1; i < COLUMNS && board[row][i].dataset.filled === color; ++i) {
        ++horizontalCount;
    }
    if (horizontalCount >= CONNECT_FOUR) return true;

    let verticalCount = 1;
    for (let i = row - 1; i >= 0 && board[i][col].dataset.filled === color; --i) {
        ++verticalCount;
    }
    for (let i = row + 1; i < ROWS && board[i][col].dataset.filled === color; ++i) {
        ++verticalCount;
    }
    if (verticalCount >= CONNECT_FOUR) return true;

    return false;
}

function checkDiagonals(row, col) {
    const color = board[row][col].dataset.filled;

    let mainDiagonalCount = 1;
    for (let i = 1; row - i >= 0 && col - i >= 0 && board[row - i][col - i].dataset.filled === color; ++i) {
        ++mainDiagonalCount;
    }
    for (let i = 1; row + i < ROWS && col + i < COLUMNS && board[row + i][col + i].dataset.filled === color; ++i) {
        ++mainDiagonalCount;
    }
    if (mainDiagonalCount >= CONNECT_FOUR) return true;

    let secondaryDiagonalCount = 1;
    for (let i = 1; row - i >= 0 && col + i < COLUMNS && board[row - i][col + i].dataset.filled === color; ++i) {
        ++secondaryDiagonalCount;
    }
    for (let i = 1; row + i < ROWS && col - i >= 0 && board[row + i][col - i].dataset.filled === color; ++i) {
        ++secondaryDiagonalCount;
    }
    if (secondaryDiagonalCount >= CONNECT_FOUR) return true;

    return false;
}

createBoard();
