import Runner from 'runner';


(function(){

  let gameDiv = document.createElement('DIV');
  gameDiv.id = "alices-game-framework";
  document.body.appendChild(gameDiv);

  let player = {
    id: 34,
    name: "alice"
  };

  // Override defaults with query string
  let playerId = location.search.match(/playerId=([0-9]*)/);
  let playerName = location.search.match(/playerName=([^&]*)/);
  if (playerId && playerId[1]) {
    player.id = playerId[1];
  }
  if (playerName && playerName[1]) {
    player.name = playerName[1];
  }
  console.log(player);

  const runner = new Runner(gameDiv, player);


  let startGame = document.createElement('BUTTON');
  startGame.id="DEBUGBUTTON";
  startGame.innerText = 'Start Game';
  startGame.addEventListener('click', function(){
    runner._debugCreateGame();
  });
  document.body.appendChild(startGame);




  // require('games/example/test-fake-server.js')(runner, gameDiv);
})();
