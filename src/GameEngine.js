




class GameEngine {

    constructor(options) {

    }

    findLocalShadow(serverObj) {

    }

    initWorld(worldSettings) {

    }

    start() {

    }

    step(isReenact, t, dt, physicsOnly) {

    }

    addObjectToWorld(object) {

    }

    processInput(inputDesc, playerId, isServer) {
        //this.trace.info(() => `game engine processing input[${inputDesc.messageIndex}] <${inputDesc.input}> from playerId ${playerId}`);
    }

    /**
     * Remove an object from the game world.
     *
     * @param {Object|String} objectId - the object or object ID
     */
    removeObjectFromWorld(objectId) {

    }

    /**
     * Check if a given object is owned by the player on this client
     *
     * @param {Object} object the game object to check
     * @return {Boolean} true if the game object is owned by the player on this client
     */
    isOwnedByPlayer(object) {
        return (object.playerId == this.playerId);
    }

}

export default GameEngine;