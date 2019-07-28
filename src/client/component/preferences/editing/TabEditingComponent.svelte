<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../../base/AutoSizeDivComponent.svelte';
    import ObjectsComponent from "./PrefsObjectsComponent.svelte";
    import mjs from '../../../mjs.js';
    //const dispatch = createEventDispatcher();
    
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

<AutosizeDivComponent>
    <ObjectsComponent />
</AutosizeDivComponent>