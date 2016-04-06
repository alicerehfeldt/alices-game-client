require('./style.styl');
import Game from 'class-game';

/**
 * First To 20
 *
 * A simple game where each player rolls a 20-sided die. First to roll a 20 wins!
 */
class Example extends Game {
  initialSetup() {
    // Load our html from our template
    this.element.innerHTML = require('./board.html');
    this.render();
  }

  gameDataUpdate(data) {
    super.gameDataUpdate(data);
    // This is a simple example where we re-render everything any time
    // the game data changes. You might want to be more nuanced.
    this.render();
  }

  inputRequested(respond, data) {
    // Show the roll button to the current player
    let rollButton = this.element.querySelector('#roll-button');
    rollButton.style.display = 'inline-block';
    rollButton.onclick = () => {
      // Roll a D20
      let roll = Math.round(Math.random() * 19 + 1);
      // Report it back to the server
      // Note: this is a bad example, we should probably roll on the server
      // but then this is a simple example ^_^
      respond({roll: roll});
      rollButton.style.display = 'none';
    }
  }

  render() {
    // Update the board with the current game info
    let rollsEl = this.element.querySelector('#example-rolls');
    let currentTurnEl = this.element.querySelector('#example-turn');
    let newRollsHTML = '';
    // Only show the last 20 rolls
    let rolls = this.gameData.rolls.slice(-20);
    rolls.forEach((roll) => {
      newRollsHTML += `<div>${roll['player']} rolled a ${roll['roll']}</div>`;
    });
    rollsEl.innerHTML = newRollsHTML;

    // Show whose turn it is
    let currentTurn = this.gameData.turn;
    let name = (currentTurn.id === this.player.id) ? "your" : `${currentTurn.name}'s`;
    currentTurnEl.innerHTML = `It is ${name} turn`;
  }

  gameOver(data) {
    this.gameData = data;
    this.render();
    let currentTurnEl = this.element.querySelector('#example-turn');
    currentTurnEl.innerHTML = `${this.gameData.winner.name} wins!`;
  }
}

export default Example;
