<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import EditorHeaderComponent from './editorheadercomponent.svelte';
    import ContentComponent from './contentcomponent.svelte';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";

    let idheader = generateId(20);
    let idcontent = generateId(20);
    let elementcontent;

    function handle_viewport(event){
        //console.log("viewport:")
        //console.log(event.detail);
        viewport = event.detail;
    }

    function handle_editor_resize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("onMount");
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handle_editor_resize);
        handle_editor_resize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

     onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_editor_resize);
    });
</script>

<style>
    .editorscreen{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="editorscreen">
    <EditorHeaderComponent idheader={idheader} viewport={viewport} on:viewport={handle_viewport}></EditorHeaderComponent>
    <ContentComponent viewport={viewport} idheader={idheader}></ContentComponent>
</div>