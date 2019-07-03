<script>
    //https://aframe.io/docs/0.9.0/introduction/models.html
    //https://aframe.io/docs/0.9.0/introduction/developing-with-threejs.html
    //https://aframe.io/docs/0.9.0/introduction/javascript-events-dom-apis.html
    //https://stackoverflow.com/questions/39771690/reducing-the-size-of-the-a-frame-canvas-to-show-other-html-elements
    //https://stackoverflow.com/questions/38858418/how-do-i-hide-the-vr-mode-goggles-icon-for-a-frame
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    //import 'aframe';
    //require('aframe');

    const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    
    onMount(() => {
        console.log("mount")
    });

    afterUpdate(() => {
        console.log("afterUpdate");
        //console.log(document.querySelector('a-scene').object3D);
        //let scene = document.querySelector('a-scene').object3D;
        //console.log(scene)
        //console.dir(scene)
    });

    onDestroy(() => {
        console.log("onDestroy")
        let scene = document.querySelector('a-scene').object3D;
        scene.dispose();
        console.log(scene);
    });
</script>

<style>
    .viewport3dscreen{
        height:100%;
        width:100%;
    }
    a-scene{
        height:100%;
        width:100%;
    }
</style>
<div class="viewport3dscreen">
    <a-scene embedded log="Hello, Scene!" vr-mode-ui="enabled:false">
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
</div>