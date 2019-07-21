<script>
    import { onMount, afterUpdate ,onDestroy, createEventDispatcher } from 'svelte';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';
    //import mjs from '../../../mjs.js';
    import {PropertiesConfig} from '../../../mjs.js';
    const dispatch = createEventDispatcher();
    export let bCollapse = true;
    let config;

    const PropertiesConfigUnsubscribe = PropertiesConfig.subscribe(value => {
		//console.log(value);
		config = value;
    });

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        PropertiesConfigUnsubscribe();
    });
    function handle_click(e){
        dispatch("click");
        PropertiesConfig.set(config);
    }
    afterUpdate(()=>{
        console.log("update changes...???");
        PropertiesConfig.set(config);
    })
    function handle_change(e){
        console.log("input change?");
    }

</script>

<style>
    
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
    <span slot="header"> Properties </span>

    <div slot="content"> 
        Menu
        <br> Button Default: <input type="color" bind:value={config.menubtn.d} on:change={handle_change}><input type="text" bind:value={config.menubtn.d} on:change={handle_change}>
        <br> Button Hover:<input type="color" bind:value={config.menubtn.h}><input type="text" bind:value={config.menubtn.h}>
        <br>Tab
        <br> Default: <input type="color" bind:value={config.tabbtn.d}><input type="text" bind:value={config.tabbtn.d}>
        <br> Hover:<input type="color" bind:value={config.tabbtn.h}><input type="text" bind:value={config.tabbtn.h}>
        <br> Active:<input type="color" bind:value={config.tabbtn.a}><input type="text" bind:value={config.tabbtn.a}>
        <br> bg:<input type="color" bind:value={config.tabbg.c}><input type="text" bind:value={config.tabbg.c}>
        <br> Panel:
        <br> Default:<input type="color" bind:value={config.panel.d}><input type="text" bind:value={config.panel.d}>
        <br> Hover:<input type="color" bind:value={config.panel.h}><input type="text" bind:value={config.panel.h}>
        <br> bg:<input type="color" bind:value={config.bg.c}><input type="text" bind:value={config.bg.c}>
    </div>
</CollapsePanelComponent>




