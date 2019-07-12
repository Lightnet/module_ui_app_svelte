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
        <i class="fa {btogglepanel == true ? "fa-caret-down" : "fa-caret-right"}"></i>
        <slot name='header'></slot>
    </div>
    {#if btogglepanel}
    <div class="context">
        <slot name='content'></slot>
    </div>
    {/if}
</div>