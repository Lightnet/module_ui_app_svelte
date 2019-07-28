<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/AutoSizeDivComponent.svelte';
    import mjs from '../../mjs.js';

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });
</script>

<style>

</style>

<AutosizeDivComponent>
    Object Data
</AutosizeDivComponent>