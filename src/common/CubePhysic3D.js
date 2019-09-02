import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

//let game = null;
//let p2 = null;

export default class CubePhysic3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.class = CubePhysic3D;
        //this.position = new ThreeVector(0, 0, 0);
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let scene;
        //let THREE;
        let camera;
        console.log("Add Cube");
        let game = this.gameEngine;
        let world;
        //console.log(game.renderer);
        this.Object3D =null;
        if(game.renderer !=null){
            //THREE = game.renderer.THREE;
            scene = game.renderer.scene;
            camera = game.renderer.camera;

            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            //console.log(this.position);
            cube.position.set(this.position.x,this.position.y,this.position.z);
            cube.scale.set( 32, 32, 32 );
            this.Object3D = cube;
            scene.add( cube );
            //Camera
            camera.position.z = 200;
            camera.position.y = 100;
        }
        var all = 0xffffffff;
        var config = [
            1, // The density of the shape.
            0.4, // The coefficient of friction of the shape.
            0.2, // The coefficient of restitution of the shape.
            1, // The bits of the collision groups to which the shape belongs.
            all // The bits of the collision groups with which the shape collides.
        ];
        world = game.physicsEngine.world;
        let x = this.position.x;
        let y = this.position.y;
        let z = this.position.z;

        let w = 32;
        let h = 32;
        let d = 32;
        console.log(this.position);

        this.physicsObj = world.add({type:'box', size:[w,h,d], pos:[x,y,z], move:true, config:config, name:'box'})
        console.log(this.physicsObj);
        if(this.Object3D !=null){
            this.Object3D.position.set(this.physicsObj.position.x,this.physicsObj.position.y,this.physicsObj.position.x);
        }
        //console.log(game.physicsEngine.OIMO);
    }

    updateRender(){
        if(this.Object3D !=null){
            this.Object3D.position.set(this.physicsObj.position.x,this.physicsObj.position.y,this.physicsObj.position.x);
        }
    }

    // on remove-from-world, remove the physics body
    onRemoveFromWorld() {
        //game.physicsEngine.world.removeBody(this.physicsObj);
    }

    syncTo(other) {
        super.syncTo(other);
        console.log("syncTo")
    }

    toString() {
        return `Asteroid::${super.toString()} Level${this.level}`;
    }

}