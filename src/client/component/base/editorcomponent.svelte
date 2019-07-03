<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_Mouseregion } from '../../stores.js';

    import mjs from '../../mjs.js';
    import { generateId } from '../helper/generateid.js';

    import EditorHeaderComponent from './editorheadercomponent.svelte';
    import ContentComponent from './contentcomponent.svelte';

    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";

    let idheader = generateId(20);

    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount")
    });

    //function handledivresize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
    //}

    afterUpdate(() => {
        //console.log("afterUpdate")
        //window.addEventListener('resize', handledivresize);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        //window.addEventListener('resize', handledivresize);
    });

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