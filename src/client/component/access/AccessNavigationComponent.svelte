<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import AutoSizeDivComponent from "../base/AlignRegionComponent.svelte";
    import DisplayUser from "./account/DisplayUserComponent.svelte";
    
    import { generateId } from '../helper/generateid.js';

    let idcomponent = generateId(20);

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

</style>
<div>
    <DisplayUser/>
    <button>Access</button>

</div>
