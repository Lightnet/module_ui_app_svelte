<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let scene;
    let entities = [];
    
    onMount(() => {
        //console.log("mount")
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        scene = document.querySelector('a-scene').object3D;
        entities = scene.children;
        //console.log(scene.children);
        //console.log(scene);
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });

    function selectentity(obj){
        //console.log(obj);
        mjs.context.view_layer.objects.active = obj;
    }

    //{entities.length}
</script>
    
<style>
    .itempanel{
        height:100%;
        width:100%;
    }
    .objitem{
        width:100%;
        /*float:left;*/
    }

    .objitem button{
        background-color:#333;
        font-size: 12px;
        color:white;
        height:22px;
        /*align-self: auto;*/
        /*text-align: center;*/
        /*padding-bottom:10px;*/
        padding: 0px 4px 10px 4px;
    }

    .objitem button:hover{
        background-color: lightslategrey;
    }

</style>
<div class="itempanel">
    
    {#each entities as entity}
        <div class="objitem">
            {#if entity.el != null}
                {#if entity.el.localName != null}
                    <button on:click={()=>{selectentity(entity)}}> {entity.el.localName} </button> <button on:click={()=>{entity.visible = !entity.visible}}> visible | {entity.visible} </button>
                {/if}
            {/if}
        </div>
    {/each}
</div>