<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';

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

    .panel{
        width: 100%;
    }
    input{
        /*background-color:grey;*/
        font-size: 12px;
        height:22px;
    }

    .header{
        background-color: lightblue;
        width:100%;
    }
    .context{
        background-color:lightslategray;
        width:100%;
    }
</style>
<div class="panel">
    <div class="header" on:click={togglepanal}>
        Relations
    </div>
    {#if btogglepanel}
    <div class="context">
        {#if obj != null}
            Parent:
            <br>Parent Type:
        {/if}
    </div>
    {/if}
</div>
