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
        //console.log("init physics engine");
        this.isServer = false;
        if(typeof window !== "undefined"){
            this.isServer = false;
        }else{
            this.isServer = true;
        }
        console.log("Server: ",this.isServer);
        this.objects=[];
        //this.options.dt =10;
        console.log("STEP TIME:",this.options.dt);
        this.options.dt = this.options.dt || (1 / 60);
        console.log("STEP TIME:",this.options.dt);
        //console.log(global.OIMO);
        let world = this.world = new OIMO.World({
        //client stepPeriod 1000/60
        //physics step 0.05
        //let world = this.world = new World({ 
            //timestep: this.options.dt,
            //timestep: 1/60,
            //timestep: 0.01,//works slow
            //timestep: 0.1,//works //to fast?//frame and physics different time update?
            timestep: 0.05,//works //about right
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

    add(o){
        this.objects.push(o);
    }

    remove(o){
        this.objects.push(o);
    }

    // entry point for a single step of the Simple Physics
    step(dt, objectFilter) {
        if(this.isServer == false){//client checks
            //console.log('step physics world');
            //console.log(dt);
        }
        this.world.step(dt || this.options.dt);
    }

}
export default OimoPhysicsEngine;