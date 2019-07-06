<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let scene;
    let entities = [];
    
    onMount(() => {
        //console.log("mount")
        scene = document.querySelector('a-scene').object3D;
        //entities = scene.children;
        entities = document.querySelector('a-scene').object3D.children;

        //for(var obj in entities){

        //}
        entities.forEach(function(item){
            console.log(item);
        });
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
</script>
    
<style>
    .itempanel{
        height:100%;
        width:100%;
        overflow: auto;
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
    <ul class="tree">
        {#each entities as entity}
            {#if entity.el != null}
                {#if entity.el.localName != null}
                    <li>
                    <button on:click={()=>{selectentity(entity)}}> {entity.el.localName}</button>
                    <button on:click={()=>{entity.visible = !entity.visible}}>Visible:{entity.visible}</button>

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



    <!--
    {#each entities as entity}
        <div class="objitem">
            {#if entity.el != null}
                {#if entity.el.localName != null}
                    <button on:click={()=>{selectentity(entity)}}> {entity.el.localName} </button> <button on:click={()=>{entity.visible = !entity.visible}}> visible | {entity.visible} </button>
                {/if}
            {/if}
        </div>
    {/each}
    -->
</div>