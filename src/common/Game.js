import GameEngine from "../GameEngine";
import PhysicsEngine from "../physics/OimoPhysicsEngine";

import CubePhysic3D from "./CubePhysic3D";
import PlanePhysic3D from "./PlanePhysic3D";

import ThreeVector from "../serialize/ThreeVector";

export default class Game extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new PhysicsEngine({ gameEngine: this });
        //console.log(this.physicsEngine);
        // common code
        this.on('postStep', this.gameLogic.bind(this));
        // server-only code
        this.on('server__init', this.serverSideInit.bind(this));
        this.on('server__playerJoined', this.serverSidePlayerJoined.bind(this));
        this.on('server__playerDisconnected', this.serverSidePlayerDisconnected.bind(this));
        // client-only code
        this.on('client__rendererReady', this.clientSideInit.bind(this));
        this.on('client__draw', this.clientSideDraw.bind(this));
        //do touch above?
    }

    registerClasses(serializer) {
        //console.log("=========================================")
        console.log("Register GameObject!")
        //serializer.registerClass(YourGameObject);
        serializer.registerClass(CubePhysic3D);
        serializer.registerClass(PlanePhysic3D);
    }

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
        //this.addObjectToWorld(new CubePhysic3D(this, {}, { playerID: 0, position: new ThreeVector(0, 0, 0) }));
        //this.addObjectToWorld(new CubePhysic3D(this, {}, { playerID: 0 }));
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
        //testing add scene objects
        //this.addObjectToWorld(new Paddle(this, null, { playerID: 0, position: new TwoVector(PADDING, 0) }));
        this.addObjectToWorld(new CubePhysic3D(this, {}, { playerID: 0 ,position: new ThreeVector(0, 100, 0)}));

        this.addObjectToWorld(new PlanePhysic3D(this, {}, { }));
        //CubePhysic3D
        
        //this.controls = new KeyboardControls(this.renderer.clientEngine);
        //this.controls.bindKey('up', 'up', { repeat: true } );
        //this.controls.bindKey('down', 'down', { repeat: true } );
    }

    clientSideDraw() {
        //console.log("update draw?");
        let cubePhysics = this.world.queryObjects({ instanceType: CubePhysic3D });
        //console.log(cubePhysics);
        for(let idx in cubePhysics){
            //console.log(cubePhysics[idx]);
            cubePhysics[idx].updateRender();
        }

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