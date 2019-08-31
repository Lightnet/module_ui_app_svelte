import Renderer from './Renderer';

export default class ThreeRenderer extends Renderer {

    // constructor
    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.antialias = true;
        this.elviewport = null;
    }

    onWindowResize(){
        //console.log("resize");
        //console.log(this.camera);
        //let w = window.innerWidth; //parent.clientWidth;
        //let h = window.innerHeight;//parent.clientHeight;
        let parent = this.elviewport.parentNode;
        let w = parent.clientWidth;
        let h = parent.clientHeight;
        //camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        //renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize( w, h );
    }

    // setup the 3D scene
    init() {
        

        // setup the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

        // setup the renderer and add the canvas to the body
        this.renderer = new THREE.WebGLRenderer({
            antialias: this.antialias
        });
        document.getElementById('viewport').appendChild(this.renderer.domElement);
        this.elviewport = document.getElementById('viewport');
        // a local raycaster
        this.raycaster = new THREE.Raycaster();

        // TODO: is this still needed?
        this.THREE = THREE;
        //need to place here for on event trigger correctly?
        super.init();

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
        this.onWindowResize();
        return Promise.resolve(); // eslint-disable-line new-cap
    }

    // single step
    draw() {
        //console.log("render draw");
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