<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();
    let activeobject;//objectc

    let idcontent = generateId(20);
    let elementcontent;
    //activeobject = mjs.context.view_layer.objects.active;
    const bloginunsub = mjs.context.view_layer.objects.active.subscribe(value => {
		activeobject = value;
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
        handle_object_resize();
        window.addEventListener('resize', handle_object_resize);
        elementcontent = document.getElementById(idcontent);
        //activeobject = mjs.context.view_layer.objects.active;
        
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        //activeobject = mjs.context.view_layer.objects.active;
        //handle_object_resize();
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_object_resize);
        bloginunsub();
    });
    //{console.log(activeobject)}
</script>

<style>
    button{
        background-color:grey;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 10px 4px;
    }

    button:hover{
        background-color: lightslategrey;
    }

    .objectcomponent{
        height: 100%;
        width: 100%;
    }

    input{
        background-color:grey;
        font-size: 12px;
        height:22px;
    }

    .checkbox {
	    /*padding: 0px 0px 0px 0px;*/
        padding-left: 0.4em;
	    /*border-radius: 3px;*/
	    display: inline-block;
	    position: relative;
    }

    input[type="checkbox"],
    input[type="radio"] {
        /*  Reset to static positioning (ideally, remove the position: absolute; from Bootstrap) */
        position: static;
        /* Properly align using flex */
        align-self: center;
        /* Align in the case where flex doesn't apply (checkbox & radio addons, mostly) */
        vertical-align: middle;
        /* Setting width and height is optional; alignment works without. However, setting it allows for more predictable layouts. */
        min-width: 16px;
        min-height: 16px;
    }

</style>
<div id="{idcontent}" class="objectcomponent">
    <label>Object</label>
    {#if activeobject != null}
        {#if activeobject.name != null}
            <label>ID: {activeobject.id}</label>
            <label>Name: <input bind:value={activeobject.name} placeholder="None"> 
            visible:<input class="checkbox" type=checkbox bind:checked={activeobject.visible}>
            </label>

            <label> Position:
            x:<input bind:value={activeobject.position.x}>
            y:<input bind:value={activeobject.position.y}>
            z:<input bind:value={activeobject.position.z}>
            </label>

            <label> Rotation:
            x:<input bind:value={activeobject.rotation.x}>
            y:<input bind:value={activeobject.rotation.y}>
            z:<input bind:value={activeobject.rotation.z}>
            </label>

            <label> Scale:
            x:<input bind:value={activeobject.scale.x}>
            y:<input bind:value={activeobject.scale.y}>
            z:<input bind:value={activeobject.scale.z}>
            </label>

            {console.log(activeobject)}
        {/if}
    {/if}
    <!--
    AFRAME
    {#if activeobject != null}
        {#if activeobject.el != null}
            <label> Name: {activeobject.el.localName}  </label>
            <button on:click={()=>{activeobject.visible = !activeobject.visible}}> Visible: {activeobject.visible}  </button>
        {/if}
    {/if}
    -->
</div>