"use strict";

const player = (mark) => {
  const marker = mark;
  let name = "";

  return { name, marker };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const getIndex = (index) => {
    return board[index];
  };

  const addMarker = (index, marker) => {
    if (!board[index]) {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const reset = () => {
    for (let index in board) {
      console.log(index, board);
      board[index] = "";
    }
  };

  return { addMarker, reset, getBoard, getIndex };
})();

const displayGrid = (() => {
  const grid = document.querySelectorAll(".grid-cell");

  const populateBoard = () => {
    for (let i = 0; i < 9; i++) {
      const gridData = document.querySelector(`#c${i}`);
      if (gameBoard.getIndex(i) === "X") gridData.classList.add("blue");
      if (gameBoard.getIndex(i) === "O") gridData.classList.add("red");
    }
  };

  const interactCell = () => {
    grid.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        let cellId = e.target.getAttribute("id");
        let cellIndex = cellId.at(1);

        if (game.getIsOver()) return;
        game.playRound(cellIndex);
        populateBoard();
      });
    });
  };

  const restart = () => {
    const winMsg = document.querySelector(".win-msg");
    const restartBtn = document.querySelector(".restart");

    restartBtn.addEventListener("click", () => {
      grid.forEach((cell) => {
        cell.classList.remove("blue");
        cell.classList.remove("red");
      });
      gameBoard.reset();
      populateBoard();
      winMsg.textContent = "";
      game.restartGame();
    });
  };

  return { interactCell, restart };
})();

const game = (() => {
  const player1 = player("X");
  const player2 = player("O");
  let gameOver = false;
  let activePlayer = player1;
  const gameEnd = document.querySelector(".game-end");
  const turnIndicator1 = document.querySelector(".p1-turn");
  const turnIndicator2 = document.querySelector(".p2-turn");
  turnIndicator1.classList.add("active");

  const playRound = (cellIndex) => {
    if (gameBoard.addMarker(cellIndex, activePlayer.marker)) {
      if (checkWin(activePlayer)) {
        gameOver = true;
        gameEnd.classList.add("active");
      } else {
        changePlayerTurn();
      }
    }
  };

  const populateNames = () => {
    let p1Name = "";
    let p2Name = "";
    const form = document.querySelector(".form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const popup = document.querySelector(".popup");
      const overlay = document.querySelector("#overlay");
      popup.classList.add("close");
      overlay.classList.add("close");

      p1Name = form.elements["p1-name"].value;
      p2Name = form.elements["p2-name"].value;

      const p1Turn = document.querySelector(".p1-turn");
      const p2Turn = document.querySelector(".p2-turn");

      if (p1Name === "") p1Name = "Player 1";
      if (p2Name === "") p2Name = "Player 2";
      p1Turn.textContent = p1Name;
      p2Turn.textContent = p2Name;

      player1.name = p1Name;
      player2.name = p2Name;
    });
  };

  const checkWin = (activePlayer) => {
    const check = (i) => gameBoard.getIndex(i) === activePlayer.marker;

    const winCondition =
      (check(0) && check(1) && check(2)) ||
      (check(3) && check(4) && check(5)) ||
      (check(6) && check(7) && check(8)) ||
      (check(0) && check(3) && check(6)) ||
      (check(1) && check(4) && check(7)) ||
      (check(2) && check(5) && check(8)) ||
      (check(0) && check(4) && check(8)) ||
      (check(2) && check(4) && check(6));

    const winMsg = document.querySelector(".win-msg");
    if (winCondition) {
      winMsg.textContent = `${activePlayer.name} takes the win!`;
      return true;
    } else if (!gameBoard.getBoard().includes("")) {
      winMsg.textContent = `Its a tie!`;
      return true;
    }
    return false;
  };

  const changePlayerTurn = () => {
    if (activePlayer === player1) {
      turnIndicator2.classList.add("active");
      turnIndicator1.classList.remove("active");
      activePlayer = player2;
    } else {
      turnIndicator1.classList.add("active");
      turnIndicator2.classList.remove("active");
      activePlayer = player1;
    }
  };

  const getIsOver = () => {
    return gameOver;
  };

  const restartGame = () => {
    gameOver = false;
    gameEnd.classList.remove("active");
  };

  const gameState = () => {
    populateNames();
    displayGrid.interactCell();
    displayGrid.restart();
  };

  return { getIsOver, restartGame, playRound, gameState };
})();

game.gameState();
