<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let scene;
    let entities = [];

    const sceneunsub = mjs.context.scene.subscribe(value => {
        scene = value;
        entities = scene.children;
		//console.log(value);
	});
    
    onMount(() => {
        //console.log("mount")
        //scene = document.querySelector('a-scene').object3D;
        console.log(scene);
        //entities = scene.children;
        //entities = document.querySelector('a-scene').object3D.children;
        //}
        //entities.forEach(function(item){
            //console.log(item);
        //});
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });

    function selectentity(obj){
        //console.log(obj);
        //mjs.context.view_layer.objects.active = obj //do not used this will not effect other editor panels
        mjs.context.view_layer.objects.active.set(obj);
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
    label{
        font-size: 12px;
        float:left;
    }
    input{
        font-size: 12px;
    }

    button{
        background-color:#333;
        font-size: 12px;
        color:white;
        height:22px;
        /*align-self: auto;*/
        /*text-align: center;*/
        /*padding-bottom:10px;*/
        padding: 0px 4px 10px 4px;
    }

    button:hover{
        background-color: lightslategrey;
    }

    input{
        background-color:grey;
        font-size: 12px;
        height:22px;
    }
    /*
    .checkbox {
	    padding: 15px;
	    border-radius: 3px;
	    display: inline-block;
	    position: relative;
    }
    */
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

    /**
    * Framework starts from here ...
    * ------------------------------
    */

    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
        position: relative;
    }
    li {
        border-left: 2px solid #000;
        margin-left: 1em;
        padding-left: 1em;
        position: relative;
    }
    li li {
        margin-left: 0;
    }

    ul li:nth-child(even) {
        background-color:darkolivegreen;
    }

    ul li:nth-child(odd) {
        background-color:grey;
    }

    li::before {
        content:'┗';
        color: #000;
        position: absolute;
        top: -6px;
        left: -9px;
    }
    ul > li:last-child {
        border-left: 2px solid transparent;
    }

</style>
<div class="itempanel">
    <p>Scene</p>
    {#if entities != null}

        <ul class="tree">
            {#each entities as entity}
                
                {#if entity != null}
                    {#if entity.type != null}
                        <li>
                        <button on:click={()=>{selectentity(entity)}}> {entity.name == "" ? "Name:None" : entity.name}</button>
                        <!--<button on:click={()=>{entity.visible = !entity.visible}}>visible:{entity.visible}</button>-->
                        visible:<input type=checkbox bind:checked={entity.visible}>
                        <span>type: {entity.type} </span>
                        <!--
                        {#if entity.children.length > 0}
                            <ul>
                            {#each entity.children as entitychild}
                                <li> 
                                <button> {entitychild.el.localName} </button>
                                <button on:click={()=>{entitychild.visible = !entitychild.visible}}> visible | {entitychild.visible} </button>
                                <button> type | {entitychild.type} </button>
                                </li>
                            {/each}
                            </ul>
                        {/if}
                        -->
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>


        <!--
            AFRAME
        <ul class="tree">
            {#each entities as entity}
                {console.log(entity)}
                {#if entity.el != null}
                    {#if entity.el.localName != null}
                        <li>
                        <button on:click={()=>{selectentity(entity)}}> {entity.el.localName}</button>
                        <button on:click={()=>{entity.visible = !entity.visible}}>visible:{entity.visible}</button>
                        <button>type: {entity.type} </button>
                        
                        {#if entity.children.length > 0}
                            <ul>
                            {#each entity.children as entitychild}
                                <li> 
                                <button> {entitychild.el.localName} </button>
                                <button on:click={()=>{entitychild.visible = !entitychild.visible}}> visible | {entitychild.visible} </button>
                                <button> type | {entitychild.type} </button>
                                </li>
                            {/each}
                            </ul>
                        {/if}
                        
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>
        -->
    {/if}
    

    <!--
    {#each entities as entity}
        <div class="">
            {#if entity.el != null}
                {#if entity.el.localName != null}
                    <button on:click={()=>{selectentity(entity)}}> {entity.el.localName}</button>
                    <button on:click={()=>{entity.visible = !entity.visible}}>visible: {entity.visible} </button>
                {/if}
            {/if}
        </div>
    {/each}
    -->
</div>