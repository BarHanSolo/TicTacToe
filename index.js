class Board {
  fieldsElements = document.querySelectorAll(".board__item");
  panel = document.querySelector(".panel");
  button = document.querySelector(".reset-button");

  constructor(onItemClick, onButtonClick) {
    this.onButtonClick = onButtonClick;
    this.button.addEventListener("click", this.handleButtonClick);
    this.fieldsElements.forEach((field) => {
      field.addEventListener("click", onItemClick);
    });
  }

  resetBoardClasses = () => {
    this.fieldsElements.forEach((field) => {
      field.classList.remove("board__item--filled-X", "board__item--filled-O");
    });
  };

  displayWinMessage = (activePlayer) => {
    this.panel.innerText = `Gratulacje ${activePlayer}, Wygrałeś`;
  };

  displayTieMessage = () => {
    this.panel.innerText = `Remis`;
  };

  clearMessage = () => {
    this.panel.innerText = "";
  };

  handleButtonClick = () => {
    this.resetBoardClasses();
    this.clearMessage();
    this.onButtonClick();
  };
}

class Game {
  fields;
  activePlayer;
  gameActive;
  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  constructor() {
    this.board = new Board(this.handleItemClick, this.handleButtonClick);
    this.setDefaults();
  }

  setDefaults = () => {
    this.fields = ["", "", "", "", "", "", "", "", ""];
    this.activePlayer = "X";
    this.gameActive = true;
  };

  validateGame = () => {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = this.winningConditions[i];
      const value1 = this.fields[posA];
      const value2 = this.fields[posB];
      const value3 = this.fields[posC];
      if (value1 !== "" && value1 === value2 && value1 === value3) {
        gameWon = true;
        break;
      }
    }
    if (gameWon) {
      this.gameActive = false;
      this.board.displayWinMessage(this.activePlayer);
    } else if (this.isBoardFull()) {
      this.gameActive = false;
      this.board.displayTieMessage();
    }
  };

  isBoardFull = () => {
    return this.fields.find((field) => field === "") === undefined;
  };

  handleItemClick = (e) => {
    const { pos } = e.target.dataset;
    if (this.gameActive && this.fields[pos] === "") {
      this.fields[pos] = this.activePlayer;
      e.target.classList.add(`board__item--filled-${this.activePlayer}`);
      this.validateGame();
      this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    }
  };

  handleButtonClick = () => {
    this.setDefaults();
  };
}

const game = new Game();
