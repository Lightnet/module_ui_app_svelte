<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';
    import { get } from 'svelte/store';
    import mjs from '../../../mjs.js';

    export let obj;
    export let btogglepanel = true;
    let bvisible = "true";
    //let count = 0;

    //const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount")
        //console.log(obj);
        //bvisible =  obj.visible == true ? "false" : "false";
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});

    function togglepanal(){
        btogglepanel = !btogglepanel;
        //console.log(btogglepanel);
    }

    function togglevisible(){
        obj.visible = !obj.visible;
        //count += 1;
        //mjs.context.updateui.set(count);
        let va = get(mjs.context.updatetoggle);
        console.log(va);
        va = !va;
        mjs.context.updatetoggle.set(va)
    }

</script>

<style>

    div{
        color:white;
    }
    
    input{
        /*background-color:grey;*/
        font-size: 12px;
        height:22px;
    }

</style>
<CollapsePanelComponent>
    <span slot="header"> Visibility </span>

    <div slot="content"> 
        {#if obj != null}
            Show in Viewport:<input type="checkbox" on:click={togglevisible} bind:checked={obj.visible}>
            Show in Render:<input type="checkbox">
            Selectable:<input type="checkbox">
        {/if}
    </div>
</CollapsePanelComponent>



        

