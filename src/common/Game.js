import GameEngine from "../GameEngine";

import PhysicsEngine from "../physics/OimoPhysicsEngine";

export default class Game extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new PhysicsEngine({ gameEngine: this });

        // common code
        this.on('postStep', this.gameLogic.bind(this));

        // server-only code
        this.on('server__init', this.serverSideInit.bind(this));
        this.on('server__playerJoined', this.serverSidePlayerJoined.bind(this));
        this.on('server__playerDisconnected', this.serverSidePlayerDisconnected.bind(this));

        // client-only code
        this.on('client__rendererReady', this.clientSideInit.bind(this));
        this.on('client__draw', this.clientSideDraw.bind(this));
    }

    //registerClasses(serializer) {
        //serializer.registerClass(YourGameObject);
    //}

    gameLogic() {

    }

    //processInput(inputData, playerId) {
        //super.processInput(inputData, playerId);
    //}

    // /////////////////////////////////////////////////////////
    //
    // SERVER ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    serverSideInit() {
        // create the objects
    }

    serverSidePlayerJoined(ev) {

    }

    serverSidePlayerDisconnected(ev) {
    }


    // /////////////////////////////////////////////////////////
    //
    // CLIENT ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    clientSideInit() {
        //this.controls = new KeyboardControls(this.renderer.clientEngine);
        //this.controls.bindKey('up', 'up', { repeat: true } );
        //this.controls.bindKey('down', 'down', { repeat: true } );
    }

    clientSideDraw() {
        //function updateEl(el, obj) {
            //let health = obj.health>0?obj.health:15;
            //el.style.top = obj.position.y + 10 + 'px';
            //el.style.left = obj.position.x + 'px';
            //el.style.background = `#ff${health.toString(16)}f${health.toString(16)}f`;
        //}

        //let paddles = this.world.queryObjects({ instanceType: Paddle });
        //let ball = this.world.queryObject({ instanceType: Ball });
        //if (!ball || paddles.length !== 2) return;
        //updateEl(document.querySelector('.ball'), ball);
        //updateEl(document.querySelector('.paddle1'), paddles[0]);
        //updateEl(document.querySelector('.paddle2'), paddles[1]);
    }
}