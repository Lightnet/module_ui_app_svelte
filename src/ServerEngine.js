
import fs from 'fs';
import Scheduler from './lib/Scheduler';
import Serializer from './serialize/Serializer';


class ServerEngine {
    constructor(io, gameEngine, options) {
        this.options = Object.assign({
            updateRate: 6,
            stepRate: 60,
            fullSyncRate: 20,
            timeoutInterval: 180,
            updateOnObjectCreation: true,
            tracesPath: '',
            countConnections: true,
            debug: {
                serverSendLag: false
            }
        }, options);

        this.io = io;
        /**
         * reference to game engine
         * @member {GameEngine}
         */
        this.serializer = new Serializer();
        this.gameEngine = gameEngine;
        this.gameEngine.registerClasses(this.serializer);
        //this.networkTransmitter = new NetworkTransmitter(this.serializer);
        //this.networkMonitor = new NetworkMonitor(this);


        this.DEFAULT_ROOM_NAME = '/lobby';
        this.rooms = {};
        //this.createRoom(this.DEFAULT_ROOM_NAME);
        this.connectedPlayers = {};
        this.playerInputQueues = {};
        this.objMemory = {};
    }

    // start the ServerEngine
    start() {
        this.gameEngine.start();
        this.gameEngine.emit('server__init');

        let schedulerConfig = {
            tick: this.step.bind(this),
            period: 1000 / this.options.stepRate,
            delay: 4
        };
        this.scheduler = new Scheduler(schedulerConfig).start();
    }

    // every server step starts here
    step() {
        //console.log("step server engine");
        // first update the trace state
        //this.gameEngine.trace.setStep(this.gameEngine.world.stepCount + 1);
        this.gameEngine.emit('server__preStep', this.gameEngine.world.stepCount + 1);

        this.serverTime = (new Date().getTime());

        // for each player, replay all the inputs in the oldest step
        /*
        for (let playerIdStr of Object.keys(this.playerInputQueues)) {
            let playerId = Number(playerIdStr);
            let inputQueue = this.playerInputQueues[playerId];
            let queueSteps = Object.keys(inputQueue);
            let minStep = Math.min.apply(null, queueSteps);

            // check that there are inputs for this step,
            // and that we have reached/passed this step
            if (queueSteps.length > 0 && minStep <= this.gameEngine.world.stepCount) {
                inputQueue[minStep].forEach(input => {
                    this.gameEngine.emit('server__processInput', { input, playerId });
                    this.gameEngine.emit('processInput', { input, playerId });
                    this.gameEngine.processInput(input, playerId, true);
                });
                delete inputQueue[minStep];
            }
        }
        */

        // run the game engine step
        this.gameEngine.step(false, this.serverTime / 1000);

        // synchronize the state to all clients
        //Object.keys(this.rooms).map(this.syncStateToClients.bind(this));

        // remove memory-objects which no longer exist
        //for (let objId of Object.keys(this.objMemory)) {
            //if (!(objId in this.gameEngine.world.objects)) {
                //delete this.objMemory[objId];
            //}
        //}

        // step is done on the server side
        this.gameEngine.emit('server__postStep', this.gameEngine.world.stepCount);

        //if (this.gameEngine.trace.length) {
            //let traceData = this.gameEngine.trace.rotate();
            //let traceString = '';
            //traceData.forEach(t => { traceString += `[${t.time.toISOString()}]${t.step}>${t.data}\n`; });
            //fs.appendFile(`${this.options.tracesPath}server.trace`, traceString, err => { if (err) throw err; });
        //}
    }

    syncStateToClients(roomName) {

    }

    /**
     * Create a room
     *
     * There is a default room called "/lobby".  All newly created players
     * and objects are assigned to the default room.  When the server sends
     * periodic syncs to the players, each player is only sent those objects
     * which are present in his room.
     *
     * @param {String} roomName - the new room name
     */
    createRoom(roomName) {
        this.rooms[roomName] = { syncCounter: 0, requestImmediateSync: false };
    }

    /**
     * Assign an object to a room
     *
     * @param {Object} obj - the object to move
     * @param {String} roomName - the target room
     */
    assignObjectToRoom(obj, roomName) {
        obj._roomName = roomName;
    }

    /**
     * Assign a player to a room
     *
     * @param {Number} playerId - the playerId
     * @param {String} roomName - the target room
     */
    assignPlayerToRoom(playerId, roomName) {

    }

    // handle the object creation
    onObjectAdded(obj) {

    }

    // handle the object creation
    onObjectDestroyed(obj) {

    }

    getPlayerId(socket) {

    }

    // handle new player connection
    onPlayerConnected(socket) {
        let that = this;

    }

    // handle player timeout
    onPlayerTimeout(socket) {
        console.log(`Client timed out after ${this.options.timeoutInterval} seconds`, socket.id);
        socket.disconnect();
    }

    // handle player dis-connection
    onPlayerDisconnected(socketId, playerId) {
        delete this.connectedPlayers[socketId];
        console.log('Client disconnected');
    }

    // resets the idle timeout for a given player
    resetIdleTimeout(socket) {

    }

    // add an input to the input-queue for the specific player
    // each queue is key'd by step, because there may be multiple inputs
    // per step
    queueInputForPlayer(data, playerId) {

    }

    // an input has been received from a client, queue it for next step
    onReceivedInput(data, socket) {

    }

    /**
     * Report game status
     * This method is only relevant if the game uses MatchMaker functionality.
     * This method must return the game status.
     *
     * @return {String} Stringified game status object.
     */
    gameStatus() {
        let gameStatus = {
            numPlayers: Object.keys(this.connectedPlayers).length,
            upTime: 0,
            cpuLoad: 0,
            memoryLoad: 0,
            players: {}
        };

        for (let p of Object.keys(this.connectedPlayers)) {
            gameStatus.players[p] = {
                frameRate: 0,
            };
        }

        return JSON.stringify(gameStatus);
    }
}
export default ServerEngine;