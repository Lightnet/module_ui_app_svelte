<script>
    //https://svelte.dev/docs#svelte_self
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
    //import ObjectSceneListComponent from './objectscenelistcomponent.svelte';
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

    /**
    * Framework starts from here ...
    * ------------------------------
    */

    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
        position: relative;
        color:#ededed;
    }
    li {
        border-left: 2px solid #000;
        margin-left: 1em;
        padding-left: 1em;
        position: relative;
    }
    /*
    li li {
        margin-left: 0;
    }
    */

    ul li:nth-child(even) {
        background-color:#282828;
    }

    ul li:nth-child(odd) {
        background-color:#2d2d2d;
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
                            <svelte:self entities={entity.children} />
                        {/if}
                    
                    </li>
                {/if}
            {/if}
        {/each}
    </ul>
{/if}