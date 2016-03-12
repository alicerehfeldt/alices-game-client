module.exports = function(runner, gameDiv) {

  let currentPlayer = 34;

  let players = {
    34: {
      name: "Alice",
      id: 34
    },
    44: {
      name: "Laura",
      id: 44
    }
  };

  let gameData = {
    rolls: [],
    players: [34, 44],
    turn: players[44]
  }

  let {game, element} = runner.createGame('example', gameData, players[currentPlayer]);
  gameDiv.appendChild(element);

  let lauraTurnTime = 1000;

  let serverTick = function() {
    if (gameData.turn.id == currentPlayer) {
      return;
    } else {
      // Other player rolls
      let roll = {
        player: players[44].name,
        roll: Math.round(Math.random() * 19 + 1)
      }
      gameData.rolls.push(roll);
      // Laura won
      if (roll.roll === 20) {
        gameData.winner = players[44];
      } else {
        gameData.turn = players[34];
        setTimeout(() => {
          game.inputRequested(responseReceived);
        }, 10);
      }
    }
    game.gameDataUpdate(gameData);
  }

  let responseReceived = (response) => {
    let roll = {
      roll: response.roll,
      player: players[34].name
    }
    gameData.rolls.push(roll);
    if (roll.roll === 20) {
      gameData.winner = players[34];
    } else {
      gameData.turn = players[44];
      setTimeout(serverTick, lauraTurnTime);
    }
    game.gameDataUpdate(gameData);
  }

  setTimeout(serverTick, lauraTurnTime);
}
