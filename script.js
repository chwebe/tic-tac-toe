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

  const resetBoard = () => {
    board.forEach((row) => row.forEach((cell) => cell.reset()))
  }

  return {
    getBoard,
    printBoard,
    resetBoard
  };
}

// value is 0, X or O

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      if (!player || !player.token || !(player.token in TOKENS)) {
        throw new Error('Invalid player. Must provide a valid player with X or O token');
      }
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

  const switchPlayer = () => {
    activePlayer = activePlayer === players.players[0] ? players.players[1] : players.players[0];
  }

  const getActivePlayer = () => activePlayer;

  const setPlayerToken = (row, col) => {
    const board = gameboard.getBoard();
    const cell = board[row][col];
    cell.addToken(activePlayer);
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

      if (cellA === cellB && cellA === cellC) {
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
  


  return {
    getActivePlayer,
    switchPlayer,
    setPlayerToken,
    checkWin,
    checkDraw
  }
}


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

const board = Gameboard();
board.getBoard()[0][0].addToken(players[0]);
board.getBoard()[0][1].addToken(players[0]);
board.getBoard()[0][2].addToken(players[0]);

const winningCombinations = [
  [[0, 0], [0, 1], [0, 2]],
];

for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const cellA = board.getBoard()[a[0]][a[1]].getValue();
    const cellB = board.getBoard()[b[0]][b[1]].getValue();
    const cellC = board.getBoard()[c[0]][c[1]].getValue();
    
    if(cellA === cellB && cellA === cellC) {
      console.log('winner');
    }
}