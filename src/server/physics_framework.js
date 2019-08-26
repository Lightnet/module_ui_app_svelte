/*
 * prototype test physics

 http://lo-th.github.io/Oimo.js/index.html#basic
*/

const uuidv4 = require('uuid/v4');
const OIMO = require('../common/oimo');
var world;
var gun;

// The Bit of a collision group
var group1 = 1 << 0;  // 00000000 00000000 00000000 00000001
var group2 = 1 << 1;  // 00000000 00000000 00000000 00000010
var group3 = 1 << 2;  // 00000000 00000000 00000000 00000100
var all = 0xffffffff; // 11111111 11111111 11111111 11111111

var config = [
    1, // The density of the shape.
    0.4, // The coefficient of friction of the shape.
    0.2, // The coefficient of restitution of the shape.
    1, // The bits of the collision groups to which the shape belongs.
    all // The bits of the collision groups with which the shape collides.
];

var bodies=[];
var gunworld;

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

    initGun();//init gun

    initTest();//setup test object

    initPostLoop();//start world physics

    // and copy position and rotation to three mesh
    //myMesh.position.copy( body.getPosition() );
    //myMesh.quaternion.copy( body.getQuaternion() );
}
function initWorld(){
    world = new OIMO.World({ 
        timestep: 1/60,
        //timestep: 0.01,
        //iterations: 8, 
        //broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        //worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: [0,-9.8,0] 
    });
    console.log("init world physics...");
}

function initGun(){
    gun.get('action').on(ack=>{
        //console.log(ack);
        if(ack.reset == true){
            console.log("reset world!");
            resetPosition();
        }
    });
    gunworld = gun.get('world').get('objects');

    //gunworld = gun.get('world').get('objects').get({'.':{'*':"*"}}).on(data=>{
        //console.log(data);
    //})
}

function resetPosition(){
    bodies[0].resetPosition(0,100,0);
}

function initTest(){
    /*
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
    */
    let x = 0;
    let y = 200;
    let z = 0;
    let w = 32;
    let h = 32;
    let d = 32;
    var cube = world.add({type:'box', size:[w,h,d], pos:[x,y,z], move:true, config:config, name:'box'});
    //cube.uuid = uuidv4();
    //cube.uuid = uuidv4();
    cube.uuid = "57bb5a1f-d879-411c-b228-809439f5752a";
    //console.log(cube);
    bodies.push(cube);
    var ground = world.add({size:[50, 10, 50], pos:[0,0,0], density:1 });

    //var body = world.add({ 
        //type:'jointHinge', // type of joint : jointDistance, jointHinge, jointPrisme, jointSlide, jointWheel
        //body1: "b1", // name or id of attach rigidbody
        //body2: "b1", // name or id of attach rigidbody
    //});

    // update world
    world.step();
    //console.log(world);
}

function initbodies(){

}

function initPostLoop(){
    world.postLoop = postLoop;
    world.play();//start physics
}

function postLoop () {
    //world.step();
    //console.log("loop world?");
    for(let idx in bodies){
        //console.log(bodies[idx])
        //console.log(body.position[1])
        //console.dir(body.position)
        //console.log(bodies[idx].position);
        //console.log("update?")
        //console.log(bodies[idx].uuid)
        //gunworld.get(bodies[idx].uuid).put({
        gun.get('world').get('objects').get(bodies[idx].uuid).put({
            position:{
                x:bodies[idx].position.x,
                y:bodies[idx].position.y,
                z:bodies[idx].position.z,
            }
        });
    }
}

export default {
    initPhysics
}