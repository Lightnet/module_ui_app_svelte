
//https://github.com/lance-gg/lance/tree/master/src

import Scheduler from './lib/Scheduler';
const GAME_UPS = 60; // default number of game steps per second

class ClientEngine{
    constructor(gameEngine, inputOptions, Renderer) {
        this.gameEngine = gameEngine;
        this.options = Object.assign({
            autoConnect: true,
            healthCheckInterval: 1000,
            healthCheckRTTSample: 10,
            stepPeriod: 1000 / GAME_UPS,
            scheduler: 'render-schedule',
            serverURL: null,
        }, inputOptions);

        //this.serializer = new Serializer();
        this.gameEngine = gameEngine;
        //this.gameEngine.registerClasses(this.serializer);
        //this.networkTransmitter = new NetworkTransmitter(this.serializer);
        //this.networkMonitor = new NetworkMonitor();
        //this.inboundMessages = [];
        //this.outboundMessages = [];

        // create the renderer
        this.renderer = this.gameEngine.renderer = new Renderer(gameEngine, this);

        // step scheduler
        this.scheduler = null;
        this.lastStepTime = 0;
        this.correction = 0;

        if (this.options.standaloneMode !== true) {
            //this.configureSynchronization();
        }

        // create a buffer of delayed inputs (fifo)
        if (inputOptions && inputOptions.delayInputCount) {
            this.delayedInputs = [];
            for (let i = 0; i < inputOptions.delayInputCount; i++)
                this.delayedInputs[i] = [];
        }

        this.gameEngine.emit('client__init');
    }

    // configure the Synchronizer singleton
    configureSynchronization() {

        // the reflect syncronizer is just interpolate strategy,
        // configured to show server syncs
        let syncOptions = this.options.syncOptions;
        if (syncOptions.sync === 'reflect') {
            syncOptions.sync = 'interpolate';
            syncOptions.reflect = true;
        }

        //this.synchronizer = new Synchronizer(this, syncOptions);
    }

    start() {
        console.log("start render");
        this.stopped = false;
        this.resolved = false;
        // initialize the renderer
        // the render loop waits for next animation frame
        if (!this.renderer) alert('ERROR: game has not defined a renderer');
        console.log("init loop?")
        let renderLoop = (timestamp) => {
            //console.log("loop?");
            if (this.stopped) {
                this.renderer.stop();
                return;
            }
            //console.log("loop?");
            this.lastTimestamp = this.lastTimestamp || timestamp;
            this.renderer.draw(timestamp, timestamp - this.lastTimestamp);
            this.lastTimestamp = timestamp;
            window.requestAnimationFrame(renderLoop);
        };

        return this.renderer.init().then(() => {
            this.gameEngine.start();

            if (this.options.scheduler === 'fixed') {
                // schedule and start the game loop
                this.scheduler = new Scheduler({
                    period: this.options.stepPeriod,
                    tick: this.step.bind(this),
                    delay: STEP_DELAY_MSEC
                });
                this.scheduler.start();
            }

            if (typeof window !== 'undefined')
                window.requestAnimationFrame(renderLoop);
            if (this.options.autoConnect && this.options.standaloneMode !== true) {
                /*
                return this.connect()
                    .catch((error) => {
                        this.stopped = true;
                        throw error;
                    });
                    */
            }
        }).then(() => {
            /*
            return new Promise((resolve, reject) => {
                this.resolveGame = resolve;
                if (this.socket) {
                    this.socket.on('disconnect', () => {
                        if (!this.resolved && !this.stopped) {
                            if (this.options.verbose)
                                console.log('disconnected by server...');
                            this.stopped = true;
                            reject();
                        }
                    });
                }
            });
            */
        });
    }

    /**
     * Disconnect from game server
     */
    disconnect() {

    }

    // execute a single game step.  This is normally called by the Renderer
    // at each draw event.
    step(t, dt, physicsOnly) {
        console.log("step render/physics")

        if (!this.resolved) {
            const result = this.gameEngine.getPlayerGameOverResult();
            if (result) {
                this.resolved = true;
                this.resolveGame(result);
                // simulation can continue...
                // call disconnect to quit
            }
        }

        // physics only case
        if (physicsOnly) {
            this.gameEngine.step(false, t, dt, physicsOnly);
            return;
        }

        // first update the trace state
        this.gameEngine.trace.setStep(this.gameEngine.world.stepCount + 1);

        // skip one step if requested
        if (this.skipOneStep === true) {
            this.skipOneStep = false;
            return;
        }

        this.gameEngine.emit('client__preStep');
        //while (this.inboundMessages.length > 0) {
            //this.handleInboundMessage(this.inboundMessages.pop());
            //this.checkDrift('onServerSync');
        //}

        // check for server/client step drift without update
        this.checkDrift('onEveryStep');

        // perform game engine step
        if (this.options.standaloneMode !== true) {
            this.handleOutboundInput();
        }
        this.applyDelayedInputs();
        this.gameEngine.step(false, t, dt);
        this.gameEngine.emit('client__postStep', { dt });

        if (this.options.standaloneMode !== true && this.gameEngine.trace.length && this.socket) {
            // socket might not have been initialized at this point
            //this.socket.emit('trace', JSON.stringify(this.gameEngine.trace.rotate()));
        }
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