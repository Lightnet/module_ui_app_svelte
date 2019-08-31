import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

let game = null;
let p2 = null;

export default class CubePhysic3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.position = new ThreeVector(0, 0, 0);
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let scene;
        //let THREE;
        let camera;
        console.log("Add Cube");
        game = this.gameEngine;
        console.log(game.renderer);
        if(game.renderer !=null){
            //THREE = game.renderer.THREE;
            scene = game.renderer.scene;
            camera = game.renderer.camera;

            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
            camera.position.z = 5;
        }
        //p2 = game.physicsEngine.p2;
        //console.log(game.physicsEngine.OIMO);
        
    }

    // on remove-from-world, remove the physics body
    onRemoveFromWorld() {
        //game.physicsEngine.world.removeBody(this.physicsObj);
    }

    syncTo(other) {
        super.syncTo(other);
    }

    toString() {
        return `Asteroid::${super.toString()} Level${this.level}`;
    }

}