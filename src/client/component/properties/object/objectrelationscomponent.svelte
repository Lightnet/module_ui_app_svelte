<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';

    import CollapsePanelComponent from '../../base/CollapsePanelComponent.svelte';

    export let obj;
    export let btogglepanel = true;

    //const dispatch = createEventDispatcher();

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

    function togglepanal(){
        btogglepanel = !btogglepanel;
        //console.log(btogglepanel);
    }

</script>

<style>
    /*
    input{
        font-size: 12px;
        height:22px;
    }
    */

    div{
        color:white;
    }
</style>
<CollapsePanelComponent>
    <span slot="header"> Relations </span>

    <div slot="content"> 
        {#if obj != null}
            Parent:
            <br>Parent Type:
        {/if}
    </div>
</CollapsePanelComponent>
