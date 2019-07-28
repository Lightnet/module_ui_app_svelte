<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../../base/AutoSizeDivComponent.svelte';
    import TimeLineComponent from "./PrefsTimeLineComponent.svelte";
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
    <TimeLineComponent />
</AutosizeDivComponent>