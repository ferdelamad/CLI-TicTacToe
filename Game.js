const inquirer = require("inquirer");

class Game {
  constructor() {
    this.playerOne;
    this.playerTwo;
    this.board = [];
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
  }

  getPlayer(player) {
    return inquirer
      .prompt([
        { name: "name", message: `What's the name of Player ${player}?` }
      ])
      .then(answer => answer);
  }
}

const newGame = new Game();
