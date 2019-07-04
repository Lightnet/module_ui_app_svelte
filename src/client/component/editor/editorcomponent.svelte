<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import EditorHeaderComponent from './editorheadercomponent.svelte';
    import ContentComponent from './contentcomponent.svelte';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";

    let idheader = generateId(20);

    function handle_viewport(event){
        //console.log("viewport:")
        //console.log(event.detail);
        viewport = event.detail;
    }
</script>

<style>
    .editorscreen{
        height:100%;
        width:100%;
    }
</style>
<div class="editorscreen">
    <EditorHeaderComponent idheader={idheader} viewport={viewport} on:viewport={handle_viewport}></EditorHeaderComponent>
    <ContentComponent viewport={viewport} idheader={idheader}></ContentComponent>
</div>