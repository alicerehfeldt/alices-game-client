class Game {
    /**
     * @constructor
     * @param {HTMLElement} element - The HTMLElement where you should render game visuals
     * @param {Object} initialGameData - The initial game information
     * @return {void}
     */
    constructor(element, initialGameData, playerData) {
        // Setup the game and render any visuals
        this.element = element;
        this.gameData = initialGameData;
        this.player = playerData;
        this.initialSetup();
    }

    /**
     * initialSetup
     * Called during initialization
     */
    initialSetup(){
      // Do setup and initial rendering here
    }

    /**
     * gameDataUpdate
     * Callback called whenever game data is updated on the server
     * Use to update visuals based on game status
     * @param {Object} gameData - the new game status
     * @return {void}
     */
    gameDataUpdate(gameData) {
        // Game status changed
        this.gameData = gameData;
    }

    /**
     * inputRequested
     * Callback called when the game is requesting input from the current player
     * @param {Function} respond - Function to call to pass data back to the game with player's response
     * @param {Object} data - Additional info from the game about what input is required
     * @return {void}
     */
    inputRequested(respond, data) {
        // Game is requesting the current player's input (e.g: it is their turn)

        // Call respond() and pass response as JSON once player responds
    }

    /**
     * gameOver
     * Callback called when the game sends a game over signal
     * @param {Object} data - A final bit of game data
     * @return {void}
     */
     gameOver(data) {
      
     }
}
export default Game;
