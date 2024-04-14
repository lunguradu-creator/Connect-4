let board = [];
let currentPlayer = 'red';
let gameActive = true;

// Funcția pentru a crea tabla de joc și a adăuga evenimente de click
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

// Funcția pentru a efectua o mutare
function playMove(col) {
    if (!gameActive) return;
    for (let row = 5; row >= 0; --row) {
        if (board[row][col].dataset.filled === 'empty') {
            board[row][col].style.backgroundColor = currentPlayer;
            board[row][col].dataset.filled = currentPlayer;
            if (checkWin(row, col)) {
                document.getElementById('message').innerText = `${currentPlayer.toUpperCase()} a câștigat!`;
                gameActive = false;
            } else if (checkDraw()) {
                document.getElementById('message').innerText = 'Remiză!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

// verifica dacă jocul s-a terminat cu o victorie
function checkWin(row, col) {
   return false;
}

// verifica dacă jocul s-a terminat cu remiză
function checkDraw() {
    return false;
}

// Funcția pentru a reseta jocul
function resetGame() {
    board.forEach(row => row.forEach(cell => {
        cell.style.backgroundColor = '#f0f0f0';
        cell.dataset.filled = 'empty';
    }));
    document.getElementById('message').innerText = '';
    currentPlayer = 'red';
    gameActive = true;
}

function checkWin(row, col) {
    const color = board[row][col].dataset.filled;
    // Verificăm pe orizontală
    let count = 1;
    for (let i = col - 1; i >= 0; --i) {
        if (board[row][i].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    for (let i = col + 1; i < 7; ++i) {
        if (board[row][i].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    if (count >= 4) return true;

    // Verificăm pe verticală
    count = 1;
    for (let i = row - 1; i >= 0; --i) {
        if (board[i][col].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    for (let i = row + 1; i < 6; ++i) {
        if (board[i][col].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    if (count >= 4) return true;

    // Verificăm pe diagonală (stânga-sus la dreapta-jos)
    count = 1;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
        if (board[i][j].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    for (let i = row + 1, j = col + 1; i < 6 && j < 7; ++i, ++j) {
        if (board[i][j].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    if (count >= 4) return true;

    // Verificăm pe diagonală (dreapta-sus la stânga-jos)
    count = 1;
    for (let i = row - 1, j = col + 1; i >= 0 && j < 7; --i, ++j) {
        if (board[i][j].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    for (let i = row + 1, j = col - 1; i < 6 && j >= 0; ++i, --j) {
        if (board[i][j].dataset.filled === color) {
            ++count;
        } else {
            break;
        }
    }
    if (count >= 4) return true;

    return false;
}

// Creăm tabla de joc noua
createBoard();
