<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import EditorNavmenuComponent from "./EditorNavmenuComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();
    
    export let idheader;
    export let viewport = "3dviewport";
    let navmenu;
    export let items = [];

    onMount(() => {

        selectviewnavmenu(viewport);
    });

    function selectviewnavmenu(view){
        //console.log(view);
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == view){
                navmenu = items[i].sm_navmenu;
                break;
            }
        }
    }

    onDestroy(() => {
        items = [];
    });

    function handle_viewport(e){
        dispatch('viewport', e.detail);
        //console.log(e.detail);
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == e.detail){
                navmenu = items[i].sm_navmenu;
                break;
            }
        }
    }

</script>

<style>
    .navbar {
        overflow: hidden;
        background-color: #3b3b3b;
        font-family: Arial, Helvetica, sans-serif;
        width:100%;
    }

    .navbar a {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar a:hover {
        background-color: #424242;
    }

    .navbar a:hover {
        background-color: #424242;
    }
    
</style>

<div id="{idheader}" class="navbar">
    <a href="/#">Editor</a>
    
    <EditorNavmenuComponent items={items} on:viewport={handle_viewport} viewport={viewport}></EditorNavmenuComponent>
    
    {#if navmenu != null}
        <svelte:component this={navmenu} />
    {/if}
</div>