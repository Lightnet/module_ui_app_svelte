<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    //import { UserName } from '../../stores.js';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';
    //import mjs from '../../../mjs.js';
    import {TopBarConfig} from '../../../mjs.js';
    //const dispatch = createEventDispatcher();
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

    function handle_change(e){
        //console.log("input???");
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

    /*input{font-size: 12px;height:22px;}*/

    div{
        color:white;
    }

    .colorpanel{
        float:left;
        height:32px;
        width:32px;
    }

</style>
<CollapsePanelComponent  btogglepanel={bCollapse}>
    <span slot="header"> Top Bar </span>

    <div slot="content"> 
        Menu
        <br> Button Default: <div class="colorpanel" style="background-color:{config.menubtn.d};"></div><input bind:value={config.menubtn.d}>
        <br> Button Hover:<div class="colorpanel" style="background-color:{config.menubtn.h};"></div><input bind:value={config.menubtn.h}>
        <br> Workspace
        <br> Button Default: <div class="colorpanel" style="background-color:{config.workspacebtn.d};"></div><input bind:value={config.workspacebtn.d}>
        <br> Button Hover:<div class="colorpanel" style="background-color:{config.workspacebtn.h};"></div><input bind:value={config.workspacebtn.h}>
        <br> Button Active:<div class="colorpanel" style="background-color:{config.workspacebtn.a};"></div><input bind:value={config.workspacebtn.a}>
        <br> Background:
        <br> Color:<div class="colorpanel" style="background-color:{config.bg.c};"></div><input bind:value={config.bg.c}>

    </div>
</CollapsePanelComponent>





