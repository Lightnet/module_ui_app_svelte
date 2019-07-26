<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/AlignRegionComponent.svelte';
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
    Modifiers Component
</AutosizeDivComponent>