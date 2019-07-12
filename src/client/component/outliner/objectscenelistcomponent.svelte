<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
    import ObjectSceneListComponent from './objectscenelistcomponent.svelte'
    import mjs from '../../mjs.js';
    
    export let entities;

    //onMount(async () => {	
    //});
    
    //onMount(() => {
        //console.log("mount")
    //});

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});

    function selectentity(obj){
        //console.log(obj);
        //mjs.context.view_layer.objects.active = obj //do not used this will not effect other editor panels
        mjs.context.view_layer.objects.active.set(obj);
    }
</script>

<style>
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

    input[type="checkbox"]{
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
{#if entities != null}
    <ul class="tree">
        {#each entities as entity}
            {#if entity != null}
                {#if entity.type != null}
                    <li>
                        <button on:click={()=>{selectentity(entity)}}> {entity.name == "" ? "Name:None" : entity.name}</button>
                        visible:<input type="checkbox" bind:checked={entity.visible}>
                        <span>type: {entity.type} </span>
                        
                        {#if entity.children.length > 0}
                            <ObjectSceneListComponent entities={entity.children}></ObjectSceneListComponent>
                        {/if}
                    
                    </li>
                {/if}
            {/if}
        {/each}
    </ul>
{/if}