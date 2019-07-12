<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import ObjectTransformComponent from './object/objecttransformcomponent.svelte'
    import ObjectRelationsComponent from './object/objectrelationscomponent.svelte'
    import ObjectCollectionsComponent from './object/objectcollectionscomponent.svelte'
    import ObjectVisibilityComponent from './object/objectvisibilitycomponent.svelte'
    import ObjectSelectComponent from './object/objectselectcomponent.svelte'

    import mjs from '../../mjs.js';

    //const dispatch = createEventDispatcher();
    let idcontent = generateId(20);
    let elementcontent;

    let activeobject;//objectc
    let scene;
    let entities = [];

    const activeobjunsub = mjs.context.view_layer.objects.active.subscribe(value => {
		activeobject = value;
    	//console.log(value);
    });
    
    const sceneunsub = mjs.context.scene.subscribe(value => {
        scene = value;
        entities = scene.children;
		//console.log(value);
    });

    function handle_object_resize(event){
        //console.log("resize");
        //console.log(elementcontent);
        if(elementcontent == null){
            return;
        }
        
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("mount");
        elementcontent = document.getElementById(idcontent);
        if(activeobject == null){
           activeobject = entities[0];
           //console.log(activeobject);
        }
        handle_object_resize();
        window.addEventListener('resize', handle_object_resize);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_object_resize);
        activeobjunsub();
        sceneunsub();
    });

    // on event handle for object select list
    function handle_objselect(e){
        console.log(e);
        activeobject = e.detail;
    }

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function toggle_objselect() {
		//console.log("toggle");
        bobjselecttoggle = !bobjselecttoggle;
    }

</script>

<style>

</style>

<div id="{idcontent}" class="objectcomponent">

    {#if activeobject != null}

        <ObjectSelectComponent activeobject={activeobject} entities={entities} on:objectselect={handle_objselect}></ObjectSelectComponent>
        <ObjectTransformComponent obj={activeobject}></ObjectTransformComponent>
        <ObjectRelationsComponent obj={activeobject}></ObjectRelationsComponent>
        <ObjectCollectionsComponent obj={activeobject}></ObjectCollectionsComponent>
        <ObjectVisibilityComponent obj={activeobject}></ObjectVisibilityComponent>

    {/if}

</div>