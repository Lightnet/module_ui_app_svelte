<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';

    export let obj;

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
</script>

<style>
    input{
        background-color:grey;
        font-size: 12px;
        height:22px;
    }
</style>
<div>

    <div>
        {#if obj.name != null}
            <label> Location:
            x:<input bind:value={obj.position.x}>
            y:<input bind:value={obj.position.y}>
            z:<input bind:value={obj.position.z}>
            </label>

            <label> Rotation:
            x:<input bind:value={obj.rotation.x}>
            y:<input bind:value={obj.rotation.y}>
            z:<input bind:value={obj.rotation.z}>
            </label>

            <label> Scale:
            x:<input bind:value={obj.scale.x}>
            y:<input bind:value={obj.scale.y}>
            z:<input bind:value={obj.scale.z}>
            </label>
        {/if}
    </div>
</div>