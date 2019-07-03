<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    const dispatch = createEventDispatcher();

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
</script>

<style>
    .context{
        position: absolute;
        float:left;
        width:100%;
        height:100%;
    }
    .tab{
        float:left;
        width:48px;
        height:100%;
        background-color: dimgrey;
    }
    .panel{
        float:left;
        width:90%;
        height:100%;
        background-color: gray;
    }
</style>
<div class="context">
    <div class="tab">
        tab
    </div>

    <div class="panel">
        panel
    </div>
    
</div>