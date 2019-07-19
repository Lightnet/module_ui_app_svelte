<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import B280DA11 from '../icon/b280DA11.svelte';
    import B280DA12 from '../icon/b280DA12.svelte';
    const dispatch = createEventDispatcher();
    export let obj;
    export let btogglepanel = true;

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
        btogglepanel = btogglepanel;
        dispatch("click");
        //console.log(btogglepanel);
    }
</script>

<style>
    .panel{
        width: 100%;
    }

    .header{
        /*background-color: lightblue;*/
        background-color: #424242;
        color: white;
        width:100%;
        height:10px;
        cursor: pointer;
        padding: 0px 0px 10px 4px;
        font-size: 12px;
    }
    
    .context{
        background-color:#383838;
        width:100%;
    }
</style>
<div class="panel">
    <div class="header" on:click={togglepanal}>
        {#if btogglepanel == true }
            <B280DA11></B280DA11>
        {:else}
            <B280DA12></B280DA12>
        {/if}
        <slot name='header'></slot>
    </div>
    {#if !btogglepanel}
    <div class="context">
        <slot name='content'></slot>
    </div>
    {/if}
</div>