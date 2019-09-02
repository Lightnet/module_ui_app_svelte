import Renderer from './Renderer';
import { ImprovedNoise } from '../common/ImprovedNoise';

let ToRad = Math.PI / 180;

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

    //----------------------------------
    //  TEXTURES
    //----------------------------------
    gradTexture(color) {
        var c = document.createElement("canvas");
        var ct = c.getContext("2d");
        c.width = 16; c.height = 256;
        var gradient = ct.createLinearGradient(0,0,0,256);
        var i = color[0].length;
        while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
        ct.fillStyle = gradient;
        ct.fillRect(0,0,16,256);
        var texture = new THREE.Texture(c);
        texture.needsUpdate = true;
        return texture;
    }

    // setup the 3D scene
    init() {
        if ((typeof window === 'undefined') || !document) {
            console.log('renderer invoked on server side.');
        }
        
        // setup the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

        // setup the renderer and add the canvas to the body
        this.renderer = new THREE.WebGLRenderer({
            antialias: this.antialias
        });
        //
        // background
        var buffgeoBack = new THREE.BufferGeometry();
        buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(8000,1) );
        var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:this.gradTexture([[1,0.75,0.5,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false }  ));
        back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*ToRad));
        this.scene.add( back );
        //controls
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        //this.controls.target.set(0, 20, 0);
        this.controls.target.set(0, 0, 0);
        
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.autoRotate = true;
        this.controls.update();

        document.getElementById('viewport').appendChild(this.renderer.domElement);
        this.elviewport = document.getElementById('viewport');
        // a local raycaster
        this.raycaster = new THREE.Raycaster();

        // TODO: is this still needed?
        this.THREE = THREE;
        //need to place here for on event trigger correctly?
        //super.init();

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
        this.onWindowResize();
        this.gameEngine.emit('client__rendererReady');
        // an immediately resolved promise
        let promise = new Promise(resolve => resolve("done!"));
        return promise;
    }

    // single step
    draw(t, dt) {
        super.draw(t, dt)
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