<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
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
        console.log(obj);
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
        Visibility
    </div>
    {#if btogglepanel}
    <div class="context">
        {#if obj != null}
            Show in Viewport:<input type="checkbox" on:click={togglevisible} bind:checked={obj.visible}>
            Show in Render:<input type="checkbox">
            Selectable:<input type="checkbox">
        {/if}
    </div>
    {/if}
</div>