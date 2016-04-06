import SocketIOClient from 'socket.io-client';
require('base.styl');

const requireGame = require.context('games', true);

class Runner {
  constructor (playerData) {
    this.playerData = playerData;
    this.socket = SocketIOClient('http://localhost:3000');
    this._attachSocketListeners();
  }

  _attachSocketListeners() {
    this.socket.on('connect', () => {
      console.log('CONNECTED');
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
      let game = {
        type: 'example', 
        playerIds: [34, 44]
      }
      this.socket.emit('createGame', game);
    });

    this.socket.on('connectedToGame', (data) => {
      console.log('connectedToGame', data);
      let type = data.type;
      let gameData = data.gameData;
      this.setupGame(type, gameData);
    });

    this.socket.on('gameDataUpdate', (data) => {
      console.log('gameDataUpdate', data);
    });

    this.socket.on('inputRequested', (data) => {
      console.log('inputRequested', data);
    });
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

  
}

export default Runner;
