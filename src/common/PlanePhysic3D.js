import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

//let game = null;
//let p2 = null;

export default class PlanePhysic3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);

        this.class = PlanePhysic3D;
        //this.position = new ThreeVector(0, 0, 0);
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let world;
        let scene;
        //let THREE;
        let camera;
        console.log("Add Cube");
        let game = this.gameEngine;
        console.log(game.renderer);
        if(game.renderer !=null){
            //THREE = game.renderer.THREE;
            scene = game.renderer.scene;
            camera = game.renderer.camera;
            console.log(game);

            //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            //var cube = new THREE.Mesh( geometry, material );

            let w = 32;
            let h = 32;
            var g = new THREE.PlaneBufferGeometry( 600, 600,  w-1, h-1 );
            g.applyMatrix(new THREE.Matrix4().makeRotationX( - Math.PI * 0.5 ));
            let terrain;
            this.plane = terrain = new THREE.Mesh(g, new THREE.MeshPhongMaterial ({color: 0x3D4143, shininess:60 }));

            terrain.castShadow = true;
            terrain.receiveShadow = true;
            scene.add(terrain);

            //scene.add( cube );
            //camera.position.z = 5;
        }
        //console.log(game.physicsEngine.OIMO);
        //this.physicsObj = gameEngine.physicsEngine.addSphere(RADIUS, MASS);
        world = game.physicsEngine.world;
        this.physicsObj = world.add({size:[50, 10, 50], pos:[0,0,0], density:1 });
        //console.log(this.physicsObj);
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