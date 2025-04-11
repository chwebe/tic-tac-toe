// Gameboard
function Gameboard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  // Accept a player's token to change the value of the cell
  const addTokenToCell = (row, col, player) => {
    const selectedCell = board[row][col];
    if (!selectedCell) {
      throw new Error('Invalid cell. Must provide a valid cell');
    }
    if (selectedCell.getValue() !== 0) {
      throw new Error('Cell already has a token. Must provide an empty cell');
    }
    selectedCell.addToken(player);
  };

  const resetBoard = () => {
    board.forEach((row) => row.forEach((cell) => cell.reset()))
  }

  return {
    getBoard,
    printBoard,
    resetBoard,
    addTokenToCell
  };
}

// value is 0, X or O

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player.token;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
    
    const reset = () => {
      value = 0;
    }

    return {
      addToken,
      getValue,
      reset
    };
}


function Player() {
  const TOKENS = {
    X: 'X',
    O: 'O'
  };

  const players = [
    {
      name: 'playerX',
      token: TOKENS.X 
    },
    {
      name: 'playerO',
      token: TOKENS.O
    }
  ]
  return {
    players
  }
}

function GameController() {
  const gameboard = Gameboard();
  const players = Player();

  let activePlayer = players.players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players.players[0] ? players.players[1] : players.players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, col) => {
    gameboard.addTokenToCell(row, col, activePlayer);
    
    if (checkWin()) {
      console.log(`${getActivePlayer().name} wins!`);
    }
    if (checkDraw()) {
      console.log('Draw!');
    }
    if (checkWin() || checkDraw()) {
      console.log('Game over!');
      gameboard.printBoard();
      gameboard.resetBoard();
      activePlayer = players.players[0]; 
      return;
    }
    switchPlayerTurn();
    printNewRound();
  }

  //      Column 0   Column 1   Column 2
  // Row 0   [0,0]  |  [0,1]  |  [0,2]
  // -------------------
  // Row 1   [1,0]  |  [1,1]  |  [1,2]
  // -------------------
  // Row 2   [2,0]  |  [2,1]  |  [2,2]

  const checkWin = () => {
    const board = gameboard.getBoard();
    const winningCombinations = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const cellA = board[a[0]][a[1]].getValue();
      const cellB = board[b[0]][b[1]].getValue();
      const cellC = board[c[0]][c[1]].getValue();

      if (cellA === cellB && cellA === cellC && cellA !== 0) {
        return true;
      }
    }
    return false;
  }

  // Check if the board is full
  const checkDraw = () => {
    const board = gameboard.getBoard();
    const isFull = board.every(row => row.every(cell => cell.getValue() !== 0));
    return isFull;
  }
  
  const resetGame = () => {
    gameboard.resetBoard();
    activePlayer = players.players[0];
  }

  return {
    getActivePlayer,
    playRound,
    resetGame
  }
}

const gameController = GameController();

// testing draw
gameController.playRound(0, 0);
gameController.playRound(0, 1);
gameController.playRound(0, 2);
gameController.playRound(1, 1);
gameController.playRound(1, 2);
gameController.playRound(2, 0);
gameController.playRound(2, 1);
gameController.playRound(2, 2);
gameController.playRound(1, 0);


// testing win
gameController.playRound(0, 0);
gameController.playRound(1, 0);
gameController.playRound(0, 1);
gameController.playRound(1, 1);
gameController.playRound(0, 2);
