const Player = (mark) => {
  const marker = mark;
  let name = "";

  return { name, marker };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const addMarker = (index, marker) => {
    if (!board[index]) board[index] = marker;
  };

  const checkWin = (player) => {
    const check = (i) => board[i] === player.marker;
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
      winMsg.textContent = `${player.name} wins!`;
    } else if (!board.includes("")) {
      winMsg.textContent = `Its a tie!`;
    }
  };

  return { board, addMarker, checkWin };
})();

const game = (() => {
  let playing = false;

  return {};
})();

const displayGrid = (() => {
  const player1 = Player("X");
  const player2 = Player("O");
  let activePlayer = player1;

  const populateNames = () => {
    let p1Name = "",
      p2Name = "";
    const form = document.querySelector(".form");
    form.addEventListener("submit", () => {
      p1Name = form.elements["p1-name"];
      p2Name = form.elements["p2-name"];
    });
    const p1Turn = document.querySelector(".p1-turn");
    const p2Turn = document.querySelector(".p2-turn");

    if (p1Name === "") p1Name = "Player 1";
    if (p2Name === "") p2Name = "Player 2";
    p1Turn.textContent = p1Name;
    p2Turn.textContent = p2Name;

    player1.name = p1Name;
    player2.name = p2Name;
  };

  const populateBoard = () => {
    for (let i = 0; i < 9; i++) {
      const gridData = document.querySelector(`#c${i}`);
      gridData.textContent = gameBoard.board[i];
    }
  };

  const getCellClick = () => {
    const grid = document.querySelectorAll(".grid-cell");

    grid.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        let cellId = e.target.getAttribute("id");
        let cellIndex = cellId.at(1);
        gameBoard.addMarker(cellIndex, activePlayer.marker);
        populateBoard();
        gameBoard.checkWin(activePlayer);
        changePlayerTurn();
      });
    });
  };

  const changePlayerTurn = () => {
    activePlayer === player1
      ? (activePlayer = player2)
      : (activePlayer = player1);
  };

  return { populateNames, getCellClick };
})();

displayGrid.populateNames();
displayGrid.getCellClick();
