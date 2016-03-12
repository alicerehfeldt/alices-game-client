require('base.styl');
const requireGame = require.context('games', true);

class Runner {
  constructor () {

  }

  createGame (type, initialData, playerData) {
    try {
      let element = document.createElement('DIV');
      element.setAttribute('data-game-type', type);

      let GameClass = requireGame(`./${type}/index.js`).default;
      let game = new GameClass(element, initialData, playerData);
      return {
        game: game,
        element: element
      }
    } catch(e) {
      console.log('Could not load game:', type);
      console.log(e);
      return false;
    }
  }

  
}

export default Runner;
