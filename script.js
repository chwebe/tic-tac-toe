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
      value = player;
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
  const players = [
    {
      name: playerX,
      token: X 
    },
    {
      name: playerO,
      token: O
    }
  ]
  return {
    players
  }
}
  