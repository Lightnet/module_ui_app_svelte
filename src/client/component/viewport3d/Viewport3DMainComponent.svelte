<script>
    //https://aframe.io/docs/0.9.0/introduction/models.html
    //https://aframe.io/docs/0.9.0/introduction/developing-with-threejs.html
    //https://aframe.io/docs/0.9.0/introduction/javascript-events-dom-apis.html
    //https://stackoverflow.com/questions/39771690/reducing-the-size-of-the-a-frame-canvas-to-show-other-html-elements
    //https://stackoverflow.com/questions/38858418/how-do-i-hide-the-vr-mode-goggles-icon-for-a-frame
    //https://github.com/aframevr/aframe/blob/master/docs/components/renderer.md
    //https://aframe.io/docs/0.9.0/core/entity.html
    //https://threejs.org/docs/#api/en/scenes/Scene
    //https://stackoverflow.com/questions/52503165/hide-mouse-pointer-small-hand-in-a-frame-scene
    //https://stackoverflow.com/questions/50795874/aframe-disable-raycaster-of-the-mouse/50800065
    //https://stackoverflow.com/questions/51380941/aframe-size-of-model/51381516
    //
    //
    //
    //
    //cursor

    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    //import 'aframe';
    //require('aframe');

    const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;
    let scene;

    const sceneunsub = mjs.context.scene.subscribe(value => {
		scene = value;
		//console.log(value);
	});

    function handle_viewport3d_resize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementcontent.parentNode;
        //elementcontent.style.height = parent.clientHeight - elementheader.clientHeight + 'px';
        if(parent){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
        }
    }
    
    onMount(() => {
        //console.log("mount")
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handle_viewport3d_resize);
        let ascene = document.querySelector('a-scene').object3D;
        //console.dir(ascene);
        //console.log(scene);
        //ascene.add(scene);
    });
    //do not put it here it will over lap
    //AFRAME.registerComponent('natural-size', {
        //init(){
            //console.log(this.el);
        //},
        //update(){
        //},
        //remove() {
            //console.log(this.el);
        //}
    //});

    afterUpdate(() => {
        //console.log("afterUpdate");
        //console.log(document.querySelector('a-scene').object3D);
        //scene = document.querySelector('a-scene').object3D;
        //console.log(scene)
        //console.dir(scene)
        //scene.addEventListener("loaded", (e)=> { (.a-canvasReference).style.cursor = "none")})
    });

    onDestroy(() => {
        //console.log("onDestroy")
        let ascene = document.querySelector('a-scene');
        //console.log(ascene);
        //console.dir(ascene.object3D);
        if(ascene !=null){
            //let scene = ascene.object3D;
            if(scene !=null){
                //ascene.object3D.remove(scene)//remove scene from renderer
            }
            //console.log(scene);
            //console.log(ascene.object3D)
            //scene.dispose();
        }
        sceneunsub();
        //console.log(scene);
        window.removeEventListener('resize', handle_viewport3d_resize);
    });

    function handle_mouse_over(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'VIEWPORT3D'});
    }
    //https://github.com/aframevr/aframe/issues/3211
    /*
    look-controls-enabled="false" 
    wasd-controls-enabled="false"
    look-controls="pointerLockEnabled: false;"
    mouse-cursor
    natural-size
    light="defaultLightsEnabled:false"

    */
</script>

<style>
    .viewport3dscreen{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="viewport3dscreen" on:mousemove={handle_mouse_over}>
    <a-scene 
    embedded
    vr-mode-ui="enabled:false"
    light="defaultLightsEnabled: false"
    >
        <a-camera look-controls-enabled="true">
            <a-entity mouse-cursor></a-entity>
        </a-camera>
        <!--
        <a-entity mouse-cursor></a-entity>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        <a-sky color="#ECECEC"></a-sky>
        -->
    </a-scene>
</div>