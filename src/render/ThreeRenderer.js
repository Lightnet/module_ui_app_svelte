import Renderer from './Renderer';

export default class ThreeRenderer extends Renderer {

    // constructor
    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.antialias = true;
    }

    // setup the 3D scene
    init() {
        super.init();

        // setup the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

        // setup the renderer and add the canvas to the body
        this.renderer = new THREE.WebGLRenderer({
            antialias: this.antialias
        });
        document.getElementById('viewport').appendChild(this.renderer.domElement);

        // a local raycaster
        this.raycaster = new THREE.Raycaster();

        // TODO: is this still needed?
        this.THREE = THREE;
        return Promise.resolve(); // eslint-disable-line new-cap
    }

    // single step
    draw() {
        //console.log("draw");
        this.renderer.render(this.scene, this.camera);
    }

    // add one object
    addObject(id) {
        // this.scene.add(sphere);
        // return sphere;
    }

    removeObject(o) {
        this.scene.remove(o);
    }
}