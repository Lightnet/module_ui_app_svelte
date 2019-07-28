<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';
    import {LogicNodeThemeConfig} from '../../../mjs.js';
    const dispatch = createEventDispatcher();
    export let bCollapse = true;
    let config;

    const LogicNodeConfigUnsub = LogicNodeThemeConfig.subscribe(value=>{
		config = value;
        //console.log("LogicNodeThemeConfig theme change?");
    });

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });

    afterUpdate(()=>{
        //console.log("changes...???");
        LogicNodeThemeConfig.set(config);
    })

    function handle_click(e){
        dispatch("click");
    }

    function handle_change(e){
        console.log("input change?");
    }

</script>

<style>
    input[type="number"]{
	    height: 22px;
        border: none;
        padding: 0;
    }
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
    <span slot="header"> Logic Node Editor </span>

    <div slot="content"> 
        Menu
        <br> Button Default: <input type="color" bind:value={config.menubtn.d}><input type="text" bind:value={config.menubtn.d}>
        <br> Button Hover:<input type="color" bind:value={config.menubtn.h}><input type="text" bind:value={config.menubtn.h}>
        <br> Panel:
        <br> Default:<input type="color" bind:value={config.panel.d}><input type="text" bind:value={config.panel.d}>
        <br> Hover:<input type="color" bind:value={config.panel.h}><input type="text" bind:value={config.panel.h}>
        <br> bg:<input type="color" bind:value={config.bg.c}><input type="text" bind:value={config.bg.c}>

        <br> Node:
        <br> Header Color:<input type="color" bind:value={config.node.headercolor}><input type="text" bind:value={config.node.headercolor}>
        <br> Panel Color:<input type="color" bind:value={config.node.panelcolor}><input type="text" bind:value={config.node.panelcolor}>
        <br> Font Color:<input type="color" bind:value={config.node.fontcolor}><input type="text" bind:value={config.node.fontcolor}>
        <br> Font Size:<input type="number" bind:value={config.node.fontsize}>
        <br> Font Family:<input type="text" bind:value={config.node.fontfamily}>
        <br> Stroke Connector:
        <br> Color:<input type="color" bind:value={config.node.strokecolor}><input type="text" bind:value={config.node.strokecolor}>
        <br> Width:<input type="number" bind:value={config.panel.strokewidth}>
        <br> Stroke Select:
        <br> Color:<input type="color" bind:value={config.node.strokecolors}><input type="text" bind:value={config.node.strokecolors}>
        <br> Width:<input type="number" bind:value={config.node.strokewidths}>
        <br> Connector:
        <br> Color:<input type="color" bind:value={config.node.pin.d}><input type="text" bind:value={config.node.pin.d}>
        <br> Hover:<input type="color" bind:value={config.node.pin.h}><input type="text" bind:value={config.node.pin.h}>
        <br> Size:<input type="number" bind:value={config.node.pinsize}>



    </div>
</CollapsePanelComponent>




