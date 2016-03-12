import Runner from 'runner';


(function(){

  let gameDiv = document.createElement('DIV');
  gameDiv.id = "alices-game-framework";
  document.body.appendChild(gameDiv);

  const runner = new Runner();

  require('games/example/test-fake-server.js')(runner, gameDiv);
})();
