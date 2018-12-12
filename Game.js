const inquirer = require("inquirer");

class Game {
  constructor() {
    this.playerOneToken = "X";
    this.playerOne;
    this.playerTwoToken = "O";
    this.playerTwo;
    this.currentPlayer = this.playerOneToken;
    this.board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    this.winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    this.range = RegExp("^([0-8])$");
    this.gameStart();
  }

  async gameStart() {
    const playerOne = await this.getPlayer("One");
    this.playerOne = playerOne.name;
    const playerTwo = await this.getPlayer("Two");
    this.playerTwo = playerTwo.name;
    console.log(
      `You started the game with ${this.playerOne} as Player One and ${
        this.playerTwo
      } as Player Two`
    );
    this.printBoard();
    this.makeMove();
  }

  getPlayer(player) {
    return inquirer
      .prompt([
        { name: "name", message: `What's the name of Player ${player}?` }
      ])
      .then(answer => answer);
  }

  printBoard() {
    console.log(
      `\n  ${this.board[0]}  |  ${this.board[1]}  |  ${this.board[2]}\n` +
        `-----|-----|------\n` +
        `  ${this.board[3]}  |  ${this.board[4]}  |  ${this.board[5]}\n` +
        `-----|-----|------\n` +
        `  ${this.board[6]}  |  ${this.board[7]}  |  ${this.board[8]}  \n`
    );
  }

  async makeMove() {
    const { location } = await this.getLocation();
    const validLocation = this.validateLocation(location);
    if (validLocation === "valid") {
      this.board[location] = this.currentPlayer;
      this.changePlayer();
      this.printBoard();
    } else if (validLocation === "taken") {
      console.log("You selected a location that is already taken! Try again");
    } else if (validLocation === "invalid") {
      console.log("You typed an invalid input! Try numbers from 0-8");
    }
    this.makeMove();
  }

  getLocation() {
    return inquirer
      .prompt([
        { name: "location", message: `Where do you want to put your token?` }
      ])
      .then(answer => answer);
  }

  validateLocation(location) {
    const isValid = this.range.test(location);
    if (!isValid) {
      return "invalid";
    } else if (this.board[location] !== location) {
      return "taken";
    } else {
      return "valid";
    }
  }

  changePlayer() {
    this.currentPlayer === "X"
      ? (this.currentPlayer = "O")
      : (this.currentPlayer = "X");
  }

  checkForWinner() {
    //loop over the possible winning combinations
    for (let i = 0; i < this.winCombos.length; i++) {
      const combo = this.winCombos[i];
      //check if any combination has all tree spots for current player
      let counter = 0;
      for (let j = 0; j < combo.length; j++) {
        if (combo[j] === this.currentPlayer) {
          counter++;
        }
      }
      //return true if this is valid
      if (counter === 3) {
        return true;
      }
    }
    //otherwise return false
    return false;
  }
}

const newGame = new Game();
