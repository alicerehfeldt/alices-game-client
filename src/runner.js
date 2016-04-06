import SocketIOClient from 'socket.io-client';
require('base.styl');

const requireGame = require.context('games', true);

class Runner {
  constructor (gameElement, playerData) {
    this.gameElement = gameElement;
    this.playerData = playerData;
    this.currentGame = null;
    this.socket = SocketIOClient('http://yrmom.com:3000');
    this._attachSocketListeners();
  }

  _attachSocketListeners() {
    this.socket.on('connect', () => {
      console.log('CONNECTED');
      this.clearGameElement();
    });
    this.socket.on('needPlayerData', () => {
      this.socket.emit('sendPlayerData', this.playerData);
    });

    this.socket.on('serverError', (message) => {
      console.error('SERVER SENT ERROR: ', message);
      alert('Something went wrong 😭😭😭');
    });

    this.socket.on('notAttachedToGame', () => {
      console.log('notAttachedToGame');
      // TODO: Show game select here?
    });

    this.socket.on('connectedToGame', (data) => {
      console.log('connectedToGame', data);
      let type = data.type;
      let gameData = data.gameData;
      let game = this.setupGame(type, gameData);
      this.currentGame = game.game;
      this.clearGameElement();
      this.gameElement.appendChild(game.element);
    });

    this.socket.on('gameDataUpdate', (data) => {
      if (!this.currentGame) {
        return;
      }
      console.log('gameDataUpdate', data, this.currentGame);
      this.currentGame.gameDataUpdate(data);
    });

    this.socket.on('inputRequested', (data) => {
      if (!this.currentGame) {
        return;
      }
      console.log('inputRequested', data, this.currentGame);
      this.currentGame.inputRequested(this.sendInput.bind(this), data);
    });

    this.socket.on('gameOver', (data) => {
      if (!this.currentGame) {
        return;
      }
      console.log('gameOver', data, this.currentGame);
      this.currentGame.gameOver(data);
    });
  }

  sendInput(playerResponse) {
    console.log('sendInput', playerResponse);
    this.socket.emit('playerInput', playerResponse);
  }

  setupGame (type, initialData) {
    try {
      let element = document.createElement('DIV');
      element.setAttribute('data-game-type', type);

      let GameClass = requireGame(`./${type}/index.js`).default;
      let game = new GameClass(element, initialData, this.playerData);
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

  clearGameElement() {
    this.gameElement.innerHTML = '';
  }

  
  _debugCreateGame() {
    let game = {
      type: 'example', 
      playerIds: [34, 44]
    }
    this.socket.emit('createGame', game);
  }

}

export default Runner;
