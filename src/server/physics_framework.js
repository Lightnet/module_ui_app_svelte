/*
 * prototype test physics

 http://lo-th.github.io/Oimo.js/index.html#basic
*/
var gun;
const OIMO = require('../common/oimo');
var world;
export function initPhysics(arg){
    arg = arg || {};

    if(arg.gun !=null){
        gun = arg.gun;
    }else{
        console.log("NULL gun!");
        return;
    }
    //console.log(gun);
    //console.log(OIMO);
    initWorld();//setup world

    initTest();//setup test object

    initPostLoop();//start world physics

    // and copy position and rotation to three mesh
    //myMesh.position.copy( body.getPosition() );
    //myMesh.quaternion.copy( body.getQuaternion() );
}
function initWorld(){
    world = new OIMO.World({ 
        timestep: 1/60, 
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });
    console.log("init world physics...");
}

function initTest(){
    var body = world.add({ 
        type:'sphere', // type of shape : sphere, box, cylinder 
        size:[1,1,1], // size of shape
        pos:[0,0,0], // start position in degree
        rot:[0,0,90], // start rotation in degree
        move:true, // dynamic or statique
        density: 1,
        friction: 0.2,
        restitution: 0.2,
        belongsTo: 1, // The bits of the collision groups to which the shape belongs.
        collidesWith: 0xffffffff, // The bits of the collision groups with which the shape collides.
    });

    var ground = world.add({size:[50, 10, 50], pos:[0,-5,0], density:1 });

    //var body = world.add({ 
        //type:'jointHinge', // type of joint : jointDistance, jointHinge, jointPrisme, jointSlide, jointWheel
        //body1: "b1", // name or id of attach rigidbody
        //body2: "b1", // name or id of attach rigidbody
    //});

    // update world
    world.step();
}

function initbodies(){

}

function initPostLoop(){
    world.postLoop = postLoop;
    world.play();//start physics
}

function postLoop () {
    //world.step();
    //console.log("loop world?")

}

export default {
    initPhysics
}