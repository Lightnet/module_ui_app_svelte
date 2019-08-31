let singleton = null;

const TIME_RESET_THRESHOLD = 100;

class Renderer {

    static getInstance() {
        return singleton;
    }

    constructor(gameEngine, clientEngine) {
        this.gameEngine = gameEngine;
        this.clientEngine = clientEngine;
        //console.log(this.clientEngine);
        this.gameEngine.on('client__stepReset', () => { this.doReset = true; });
        gameEngine.on('objectAdded', this.addObject.bind(this));
        gameEngine.on('objectDestroyed', this.removeObject.bind(this));

        // the singleton renderer has been created
        singleton = this;
    }

    init() {
        if ((typeof window === 'undefined') || !document) {
            console.log('renderer invoked on server side.');
        }
        this.gameEngine.emit('client__rendererReady');
        return Promise.resolve(); // eslint-disable-line new-cap
    }

    reportSlowFrameRate() {
        this.gameEngine.emit('client__slowFrameRate');
    }

    draw(t, dt) {
        console.log("render draw")
        this.gameEngine.emit('client__draw');

        if (this.clientEngine.options.scheduler === 'render-schedule')
            this.runClientStep(t);
    }

    runClientStep(t) {
        let p = this.clientEngine.options.stepPeriod;
        let dt = 0;

        // reset step time if we passed a threshold
        if (this.doReset || t > this.clientEngine.lastStepTime + TIME_RESET_THRESHOLD) {
            this.doReset = false;
            this.clientEngine.lastStepTime = t - p / 2;
            this.clientEngine.correction = p / 2;
        }

        // catch-up missed steps
        while (t > this.clientEngine.lastStepTime + p) {
            this.clientEngine.step(this.clientEngine.lastStepTime + p, p + this.clientEngine.correction);
            this.clientEngine.lastStepTime += p;
            this.clientEngine.correction = 0;
        }

        // if not ready for a real step yet, return
        // this might happen after catch up above
        if (t < this.clientEngine.lastStepTime) {
            dt = t - this.clientEngine.lastStepTime + this.clientEngine.correction;
            if (dt < 0) dt = 0;
            this.clientEngine.correction = this.clientEngine.lastStepTime - t;
            this.clientEngine.step(t, dt, true);
            return;
        }

        // render-controlled step
        dt = t - this.clientEngine.lastStepTime + this.clientEngine.correction;
        this.clientEngine.lastStepTime += p;
        this.clientEngine.correction = this.clientEngine.lastStepTime - t;
        this.clientEngine.step(t, dt);
    }

    addObject(obj) {}

    removeObject(obj) {}

    stop() {}
}

export default Renderer;