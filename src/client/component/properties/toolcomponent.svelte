<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import mjs from '../../mjs.js';

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });
    //viewbox="0 0 64 64"
</script>

<style>
    /*
    div{
        color: azure;
    }
    */
</style>

<AutosizeDivComponent>
    Tools Component
</AutosizeDivComponent>