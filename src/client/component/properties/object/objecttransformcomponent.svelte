<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import CollapsePanelComponent from '../../base/CollapsePanelComponent.svelte';
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
    div{
	    color:white;
    }
    input[type="number"]{ 
	    line-height: 22px; 
	    height: 100% !important;
    }
</style>
<CollapsePanelComponent  clpanel="propspanel" clpanelbg="propspanelbg">
    <span slot="header"> Transform </span>

    <div slot="content"> 
        {#if obj.name != null}
            <label> Location:
            x:<input type="number" bind:value={obj.position.x}>
            y:<input type="number" bind:value={obj.position.y}>
            z:<input type="number" bind:value={obj.position.z}>
            </label>

            <label> Rotation:
            x:<input type="number" bind:value={obj.rotation.x}>
            y:<input type="number" bind:value={obj.rotation.y}>
            z:<input type="number" bind:value={obj.rotation.z}>
            </label>

            <label> Scale:
            x:<input type="number" bind:value={obj.scale.x}>
            y:<input type="number" bind:value={obj.scale.y}>
            z:<input type="number" bind:value={obj.scale.z}>
            </label>
        {/if}
    </div>
</CollapsePanelComponent>



