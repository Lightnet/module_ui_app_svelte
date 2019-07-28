<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import CollapsePanelComponent from '../../base/CollapsePanelComponent.svelte';
    //import mjs from '../../../mjs.js';
    import {TopBarConfig} from '../../../mjs.js';
    const dispatch = createEventDispatcher();
    export let bCollapse = false;
    let config;

    const TopBarUnsubscribe = TopBarConfig.subscribe(value => {
		//console.log(value);
		config = value;
	});

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        TopBarUnsubscribe();
    });

    afterUpdate(()=>{
        //console.log("changes...???");
        TopBarConfig.set(config);
    })

    function handle_click(e){
        dispatch("click");
    }

</script>

<style>
    /*
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
    */

    input[type="color"]{
        -webkit-appearance: none;
        width: 22px;
	    height: 22px;
        border: none;
        padding: 0;
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
	    padding: 0;
    }
    input[type="color"]::-webkit-color-swatch {
    	border: none;
    }
    input[type="text"]{
        padding: 0px 0px;
    }

    div{
        color:white;
    }
</style>
<CollapsePanelComponent  btogglepanel={bCollapse} on:click={handle_click}>
    <span slot="header"> Top Bar </span>

    <div slot="content"> 
        Menu
        <br> Button Default: <input type="color" bind:value={config.menubtn.d}><input type="text" bind:value={config.menubtn.d}>
        <br> Button Hover:<input type="color" bind:value={config.menubtn.h}><input bind:value={config.menubtn.h}>
        <br> Workspace
        <br> Button Default: <input type="color" bind:value={config.workspacebtn.d}><input type="text" bind:value={config.workspacebtn.d}>
        <br> Button Hover:<input type="color" bind:value={config.workspacebtn.h}><input type="text" bind:value={config.workspacebtn.h}>
        <br> Button Active:<input type="color" bind:value={config.workspacebtn.a}><input type="text" bind:value={config.workspacebtn.a}>
        <br> Background:
        <br> Color:<input type="color" bind:value={config.bg.c}><input type="text" bind:value={config.bg.c}>

    </div>
</CollapsePanelComponent>





