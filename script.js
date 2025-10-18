let gameBoard = [];
const player1 = { marker: "X" };
const player2 = { marker: "O" };
let playerTurn = 1;

const getGameBoard = (function () {
    for (i = 0; i < 3; i++) {
      gameBoard[i] = [];
      for (j = 0; j < 3; j++) {
        gameBoard[i].push([]);
      }
    }
  })();

 function gameLogic(){

const printBoard = function () {
  for (const element of gameBoard) {
    console.log(element + "|");
  }
};

const playRound = function (row, column) {
  if (gameBoard[row - 1][column - 1] === "O" ||   gameBoard[row - 1][column - 1] === "X"
  ) {
    return "Position Taken"
  }
  if (playerTurn === 1) {
    gameBoard[row - 1][column - 1] = player1.marker;
    console.clear();
    printBoard();
    playerTurn = 2;
    return "Piece Placed"
  } else {
    gameBoard[row - 1][column - 1] = player2.marker;
    console.clear();
    printBoard();
    playerTurn = 1;
    return "Piece Placed"
  }

};
let winner;
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
       winner = winnerValue === "X" ? "Player1" : "Player2";
      return `The winner is ${winner}`;
    }
  }
  return `No winner yet`;
};

const gameOver = function(){
    let piecePlaced = 0
    for (const element of gameBoard) {
        for (const elem of element) {
            if (elem === "X" || elem === "O"){
                piecePlaced++
            }
        }
    }
    if (checkWinner() === `The winner is ${winner}` ){
        restartGame()
        return "Game Over"
    }
    else if(checkWinner() !== `The winner is ${winner}` && piecePlaced === 9){
        return "Game Over, It's a draw"
    }
   return "Game Not Over Yet"

}

const restartGame = function(){
    gameBoard = []
    for (i = 0; i < 3; i++) {
        gameBoard[i] = [];
        for (j = 0; j < 3; j++) {
          gameBoard[i].push([]);
        }
      }
}

const getValue = function (row, column) {
  return gameBoard[row - 1][column - 1];
};
return {printBoard,playRound,checkWinner,getValue,gameOver}
}



