
import EventEmitter from 'event-emitter';
import GameWorld from './GameWorld';
import Timer from './game/Timer';
import Trace from './lib/Trace';

class GameEngine {

    constructor(options) {

        // place the game engine in the LANCE globals
        const isServerSide = (typeof window === 'undefined');
        const glob = isServerSide ? global : window;

        glob.LANCE = { gameEngine: this };

        // set options
        //const defaultOpts = { traceLevel: Trace.TRACE_NONE };
        var defaultOpts = { };
        if (!isServerSide) defaultOpts.clientIDSpace = 1000000;
        this.options = Object.assign(defaultOpts, options);


        /**
         * client's player ID, as a string. If running on the client, this is set at runtime by the clientEngine
         * @member {String}
         */
        this.playerId = NaN;

        // set up event emitting and interface
        let eventEmitter = this.options.eventEmitter;
        if (typeof eventEmitter === 'undefined')
            eventEmitter = new EventEmitter();
        /**
         * Register a handler for an event
         *
         * @method on
         * @memberof GameEngine
         * @instance
         * @param {String} eventName - name of the event
         * @param {Function} eventHandler - handler function
         */
        this.on = eventEmitter.on;

        /**
         * Register a handler for an event, called just once (if at all)
         *
         * @method once
         * @memberof GameEngine
         * @instance
         * @param {String} eventName - name of the event
         * @param {Function} eventHandler - handler function
         */
        this.once = eventEmitter.once;

        /**
         * Remove a handler
         *
         * @method removeListener
         * @memberof GameEngine
         * @instance
         * @param {String} eventName - name of the event
         * @param {Function} eventHandler - handler function
         */
        this.removeListener = eventEmitter.off;
        this.off = eventEmitter.off;

        this.emit = eventEmitter.emit;

        // set up trace
        this.trace = new Trace({ traceLevel: this.options.traceLevel });

    }

    findLocalShadow(serverObj) {

    }

    initWorld(worldSettings) {
        this.world = new GameWorld();
        // on the client we have a different ID space
        if (this.options.clientIDSpace) {
            this.world.idCount = this.options.clientIDSpace;
        }

        this.worldSettings = Object.assign({}, worldSettings);
    }

    start() {
        this.initWorld();
        console.log("init world");
        // create the default timer
        this.timer = new Timer();
        this.timer.play();
        this.on('postStep', (step, isReenact) => {
            //console.log("step");
            if (!isReenact) this.timer.tick();
        });

        this.emit('start', { timestamp: (new Date()).getTime() });
    }

    step(isReenact, t, dt, physicsOnly) {
        //console.log("step world");
        // physics-only step
        if (physicsOnly) {
            if (dt) dt /= 1000; // physics engines work in seconds
            this.physicsEngine.step(dt, objectFilter);
            return;
        }

        // emit preStep event
        if (isReenact === undefined)
            throw new Error('game engine does not forward argument isReenact to super class');

        isReenact = Boolean(isReenact);
        let step = ++this.world.stepCount;
        let clientIDSpace = this.options.clientIDSpace;
        this.emit('preStep', { step, isReenact, dt });

        // skip physics for shadow objects during re-enactment
        function objectFilter(o) {
            return !isReenact || o.id < clientIDSpace;
        }

        // physics step
        if (this.physicsEngine && !this.ignorePhysics) {
            if (dt) dt /= 1000; // physics engines work in seconds
            this.physicsEngine.step(dt, objectFilter);
        }

        // for each object
        // - apply incremental bending
        // - refresh object positions after physics
        this.world.forEachObject((id, o) => {
            if (typeof o.refreshFromPhysics === 'function')
                o.refreshFromPhysics();
            this.trace.trace(() => `object[${id}] after ${isReenact ? 'reenact' : 'step'} : ${o.toString()}`);
        });

        // emit postStep event
        this.emit('postStep', { step, isReenact });
    }

    addObjectToWorld(object) {
        // if we are asked to create a local shadow object
        // the server copy may already have arrived.
        if (Number(object.id) >= this.options.clientIDSpace) {
            let serverCopyArrived = false;
            this.world.forEachObject((id, o) => {
                if (o.hasOwnProperty('inputId') && o.inputId === object.inputId) {
                    serverCopyArrived = true;
                    return false;
                }
            });
            if (serverCopyArrived) {
                this.trace.info(() => `========== shadow object NOT added ${object.toString()} ==========`);
                return null;
            }
        }

        this.world.addObject(object);

        // tell the object to join the game, by creating
        // its corresponding physical entities and renderer entities.
        if (typeof object.onAddToWorld === 'function')
            object.onAddToWorld(this);

        this.emit('objectAdded', object);
        this.trace.info(() => `========== object added ${object.toString()} ==========`);

        return object;
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
        if (typeof objectId === 'object') objectId = objectId.id;
        let object = this.world.objects[objectId];

        if (!object) {
            throw new Error(`Game attempted to remove a game object which doesn't (or never did) exist, id=${objectId}`);
        }
        this.trace.info(() => `========== destroying object ${object.toString()} ==========`);

        if (typeof object.onRemoveFromWorld === 'function')
            object.onRemoveFromWorld(this);

        this.emit('objectDestroyed', object);
        this.world.removeObject(objectId);
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