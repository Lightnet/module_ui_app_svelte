<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import ObjectSceneListComponent from './objectscenelistcomponent.svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    let scene;
    let entities = [];
    let bupdatetoggle = false;

    const sceneunsub = mjs.context.scene.subscribe(value => {
        scene = value;
        entities = scene.children;
		//console.log(value);
    });

    const updatetoggleunsub = mjs.context.updatetoggle.subscribe(value => {
        //console.log(value);
        bupdatetoggle = value;
        entities = scene.children;
        //console.log("update?");
    });
    
    function handle_outliner_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }
    
    onMount(() => {
        //console.log("mount")
        //scene = document.querySelector('a-scene').object3D;
        //console.log(scene);
        //entities = scene.children;
        //entities = document.querySelector('a-scene').object3D.children;
        //}
        //entities.forEach(function(item){
            //console.log(item);
        //});
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handle_outliner_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_outliner_resize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_outliner_resize);
        sceneunsub();
        updatetoggleunsub();
    });

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'OUTLINER'});
    }

    //{entities.length}
    //{console.log(entity)}
</script>
    
<style>
    .itempanel{
        height:100%;
        width:100%;
        overflow: auto;
    }

</style>
<div id="{idcontent}" class="itempanel" on:mousemove={handle_mousemove}>
    <span>Scene</span>
    <ObjectSceneListComponent entities={entities}></ObjectSceneListComponent>
</div>