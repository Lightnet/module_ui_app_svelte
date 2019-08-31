import PhysicsEngine from './PhysicsEngine';
//import OIMO from "oimo/build/oimo.js";
//var OIMO={World:{}};
var isServer = false;
var OIMO;
if(typeof window !== "undefined"){
    console.log("client");
    //OIMO = require("oimo/build/oimo.js");
}else{
    console.log("server");
    OIMO = require('../common/oimo');
    //require('../common/oimo');
    //console.log(global.OIMO);
    //OIMO = require("oimo/build/oimo.js");
    //console.log(global.OIMO);
}
//console.log(OIMO);
//console.log("test");
class OimoPhysicsEngine extends PhysicsEngine {

    constructor(options) {
        super(options);
        //console.log("physics engine?")
        this.options.dt = this.options.dt || (1 / 60);
        //console.log(global.OIMO);
        let world = this.world = new OIMO.World({ 
        //let world = this.world = new World({ 
            timestep: this.options.dt,
            timestep: 0.01,
            iterations: 8, 
            broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
            worldscale: 1, // scale full world 
            random: true,  // randomize sample
            info: false,   // calculate statistic or not
            gravity: [0,-9.8,0] 
        });
        
        //world.quatNormalizeSkip = 0;
        //world.quatNormalizeFast = false;
        //world.gravity.set(0, -10, 0);
        //world.broadphase = new CANNON.NaiveBroadphase();
        this.OIMO = OIMO;
        //console.log(OIMO);
    }

    // entry point for a single step of the Simple Physics
    step(dt, objectFilter) {
        //console.log('step physics world');
        this.world.step(dt || this.options.dt);
    }

}
export default OimoPhysicsEngine;