let gameBoard = [];
const player1 = { marker: "X" };
const player2 = { marker: "O" };
let playerTurn = 1;
const container = document.querySelector(".container");
let containerChildren = [];
const manageGame = gameLogic();

document.querySelector(".startBtn").addEventListener("click", restartGame);


// Display element upon clicking square

container.addEventListener("click", function (e) {
  const para = document.querySelector(".msg");
  if (para.textContent !== "") {
    return;
  }
  if (
    document.querySelector(".player1").value.trim() === "" ||
    document.querySelector(".player2").value.trim() === ""
  ) {
    document.querySelector(".startBtn").click();
    return;
  }
  DisplayValue(e);
});

function restartGame() {
  const para = document.querySelector(".msg");
  para.textContent = "";
  player1.name = document.querySelector(".player1").value.trim();
  player2.name = document.querySelector(".player2").value.trim();
  gameBoard = [];
  for (i = 0; i < 3; i++) {
    gameBoard[i] = [];
    for (j = 0; j < 3; j++) {
      gameBoard[i].push([]);
    }
  }
  mapElementsToDOM();
  playerTurn = 1;
}

function DisplayValue(e) {
  let elemClickedClass = e.target.className;
  switch (elemClickedClass) {
    case "one":
      manageGame.playRound(1, 1);
      break;
    case "two":
      manageGame.playRound(1, 2);
      break;
    case "three":
      manageGame.playRound(1, 3);
      break;
    case "four":
      manageGame.playRound(2, 1);
      break;
    case "five":
      manageGame.playRound(2, 2);
      break;
    case "six":
      manageGame.playRound(2, 3);
      break;
    case "seven":
      manageGame.playRound(3, 1);
      break;
    case "eight":
      manageGame.playRound(3, 2);
      break;
    case "nine":
      manageGame.playRound(3, 3);
      break;
    default:
      break;
  }
  const p = document.querySelector(".msg");
  mapElementsToDOM();
  p.textContent = manageGame.checkWinner();
}

for (const element of container.children) {
  containerChildren.push(element);
}


const mapElementsToDOM = function () {
  for (let i = 0; i < 3; i++) {
    containerChildren[i].textContent = gameBoard[0][i];
  }
  for (let i = 0; i < 3; i++) {
    containerChildren[i + 3].textContent = gameBoard[1][i];
  }
  for (let i = 0; i < 3; i++) {
    containerChildren[i + 6].textContent = gameBoard[2][i];
  }
};

const getGameBoard = (function () {
  for (i = 0; i < 3; i++) {
    gameBoard[i] = [];
    for (j = 0; j < 3; j++) {
      gameBoard[i].push([]);
    }
  }
  mapElementsToDOM();
})();


// Factory Functions

function gameLogic() {
  const printBoard = function () {
    for (const element of gameBoard) {
      console.log(element + "|");
    }
  };

  const playRound = function (row, column) {
    if (
      gameBoard[row - 1][column - 1] === "O" ||
      gameBoard[row - 1][column - 1] === "X"
    ) {
      return "Position Taken";
    }
    if (playerTurn === 1) {
      gameBoard[row - 1][column - 1] = player1.marker;
      console.clear();
      printBoard();
      playerTurn = 2;
      mapElementsToDOM();
      return "Piece Placed";
    } else {
      gameBoard[row - 1][column - 1] = player2.marker;
      console.clear();
      printBoard();
      playerTurn = 1;
      mapElementsToDOM();
      return "Piece Placed";
    }
  };

  let winner;
  const checkWinner = function () {
    let piecePlaced = 0;
    for (const element of gameBoard) {
      for (const elem of element) {
        if (elem === "X" || elem === "O") {
          piecePlaced++;
        }
      }
    }
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
        winner = winnerValue === "X" ? player1.name : player2.name;
        return `The winner is ${winner}, Game Over`;
      }
    }
    if (piecePlaced === 9) {
        return "Game Over, It's a draw";
      }
    return;
  };

  const getValue = function (row, column) {
    return gameBoard[row - 1][column - 1];
  };
  return { printBoard, playRound, checkWinner, getValue };
}
