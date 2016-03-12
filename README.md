# Alice's Game Client

JS Framework for turn-based games. This is the client half, there is the corresponding [server](https://github.com/alicerehfeldt/alices-game-server) repo as well.

## How to write a game

Games are included in the `src/games/` folder. The folder name is used as the `type` identifier for the game. See the provided [example](src/games/example) game.

## Game API

The main interface for games is implemented in the [`Game` class](src/class-game.js) which you should inherit from in your game class. Each instance of a `Game` represents the client for a single player.

### Properties

These properties are set up in the [default constructor](src/class-game.js#L8). Normally you should not need to override the constructor, but usage of these is not mandatory, do what you want.

#### `Game.element`
The root `HTMLElement` for your game. It will look like this:

````html
<div class="game" data-game-type="your_game_type_here"></div>
````

#### `Game.gameData`
The default location where game data is stored.

#### `Game.player`
The current player's information, an instance of the [Player](#player) object.

#### `Game#constructor`
By default, sets up the three parameters as properties on the Game instance then calls `Game.initialSetup()`. We recommend just extending `initialSetup()` and leaving this be.

* `@param {HTMLElement} element` - The root HTMLElement for the game
* `@param {Object} initialGameData` - The initial game data
* `@param {Object} player` - The player object for the player represented by this instance of the class.

#### `Game#initalSetup`
A method for child classes to use for setup to avoid having to override the default constructor.

#### `Game#gameDataUpdate`
A method called whenever game data is updated. Whether this is a full game data set or incremental updates is up to you!

* `@param {Object} data` - New game data from the server.

#### `Game#inputRequested(respond, data)`

A callback when the game is requesting the current player's input. This might mean it is the current player's turn, or they need to answer a question.

* `@param {Function} respond` - Method to send the player's response back to the server as JSON (`respond(playerResponse)`)
* `@param {Object} data` - A JSON object with more context about what kind of input the game is requesting

### `Player`
The default object format and mandatory fields for player data:

````json
{
  "id": 123,
  "name": "Alice"
}
````

## Development

`make develop` - Runs webpack dev server, with client available on http://127.0.0.1:8888/

## Build

`make dist`
