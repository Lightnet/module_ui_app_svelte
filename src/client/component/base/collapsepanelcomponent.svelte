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

    .header{
        background-color: lightblue;
        width:100%;
        cursor: pointer;
    }
    .context{
        background-color:lightslategray;
        width:100%;
    }
</style>
<div class="panel">
    <div class="header" on:click={togglepanal}>
        <i class="fa {btogglepanel == true ? "fa-caret-down" : "fa-caret-right"}"></i>
        <slot name='header'></slot>
    </div>
    {#if btogglepanel}
    <div class="context">
        <slot name='content'></slot>
    </div>
    {/if}
</div>