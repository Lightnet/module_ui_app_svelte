
//https://github.com/lance-gg/lance/tree/master/src
const GAME_UPS = 60; // default number of game steps per second

class ClientEngine{
    constructor(gameEngine, inputOptions, Renderer) {
        this.gameEngine = gameEngine;

    }

    start() {

    }

    /**
     * Disconnect from game server
     */
    disconnect() {

    }

    // execute a single game step.  This is normally called by the Renderer
    // at each draw event.
    step(t, dt, physicsOnly) {

    }

    // apply a user input on the client side
    doInputLocal(message) {
        // some synchronization strategies (interpolate) ignore inputs on client side
        if (this.gameEngine.ignoreInputs) {
            return;
        }
    }

    // apply user inputs which have been queued in order to create
    // an artificial delay
    applyDelayedInputs() {

    }

    sendInput(input, inputOptions) {

    }

    // handle a message that has been received from the server
    handleInboundMessage(syncData) {

    }

    // emit an input to the authoritative server
    handleOutboundInput() {

    }
}

export default ClientEngine;