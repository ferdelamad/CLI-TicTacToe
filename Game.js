const inquirer = require("inquirer");

class Game {
  constructor() {
    this.playerOne;
    this.playerTwo;
    this.board = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
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
}

const newGame = new Game();
