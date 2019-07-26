<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/AlignRegionComponent.svelte';
    import PreferencesComponent from "./keymap/preferencescomponent.svelte";
    import mjs from '../../mjs.js';
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
    <PreferencesComponent />
</AutosizeDivComponent>