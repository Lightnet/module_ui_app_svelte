<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
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
    }

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

    input{
        /*background-color:grey;*/
        font-size: 12px;
        height:22px;
    }

    div{
        color:white;
    }
    
    .colorpanel{
        float:left;
        height:32px;
        width:32px;
    }

</style>
<CollapsePanelComponent  btogglepanel={bCollapse} on:click={handle_click}>
    <span slot="header"> Properties </span>

    <div slot="content"> 
        Menu
        <br> Button Default: <div class="colorpanel" style="background-color:{config.menubtn.d};"></div><input bind:value={config.menubtn.d}>
        <br> Button Hover:<div class="colorpanel" style="background-color:{config.menubtn.h};"></div><input bind:value={config.menubtn.h}>
        <br> Background:
        <br> Color:<div class="colorpanel" style="background-color:{config.bg.c};"></div><input bind:value={config.bg.c}>
    </div>
</CollapsePanelComponent>




