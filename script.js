const gameBoard = [];
const player1 = { marker: "X" };
const player2 = { marker: "O" };
const manageGame = {};
let playerTurn = 1;
const getGameBoard = (function () {
  for (i = 0; i < 3; i++) {
    gameBoard[i] = [];
    for (j = 0; j < 3; j++) {
      gameBoard[i].push([]);
    }
  }
})();

console.log(gameBoard);

const printBoard = function () {
  for (const element of gameBoard) {
    console.log(element + "|");
  }
};

const playRound = function (row, column) {
  if (gameBoard[row - 1][column - 1] === "O" ||   gameBoard[row - 1][column - 1] === "X"
  ) {
    console.log("Position Taken")
    return
  }
  if (playerTurn === 1) {
    gameBoard[row - 1][column - 1] = player1.marker;
    console.clear();
    printBoard();
    playerTurn = 2;
  } else {
    gameBoard[row - 1][column - 1] = player2.marker;
    console.clear();
    printBoard();
    playerTurn = 1;
  }
  console.log(gameBoard[row - 1][column - 1])

};

const checkWinner = function () {
  const winSituations = [
    [
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    [
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
    [
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    [
      [1, 3],
      [2, 2],
      [3, 1],
    ],
  ];

  for (const i of winSituations) {
    if (
      getValue(i[0][0], i[0][1]) === getValue(i[1][0], i[1][1]) &&
      getValue(i[1][0], i[1][1]) === getValue(i[2][0], i[2][1]) &&
      i[0][0] !== ""
    ) {
      let winnerValue = getValue(i[0][0], i[0][1]);
      let winner = winnerValue === "X" ? "Player1" : "Player2";
      return `The winner is ${winner}`;
    }
  }
  return `No winner yet`;
};

const getValue = function (row, column) {
  return gameBoard[row - 1][column - 1];
};

playRound(1, 2);
playRound(2, 3);
playRound(2, 3);
playRound(1, 2);

// playRound(2,3)
// playRound(3,2)
// playRound(2,1)
console.log(gameBoard[1 - 1][2 - 1].length)
console.log(checkWinner());
