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
    let idcontent = generateId(20);
    let elementcontent;

    function handle_viewport(event){
        //console.log("viewport:")
        //console.log(event.detail);
        viewport = event.detail;
    }

    function handledivresize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("mount")
        window.addEventListener('resize', handledivresize);
        handledivresize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate")
        //elementheader = document.getElementById(idheader);
        elementcontent = document.getElementById(idcontent);
        //let parent = elementcontent.parentNode;
        //console.log("parent");
        //console.log(parent);
        //console.dir(parent);
        //elementcontent.style.height = parent.clientHeight + 200 + 'px';
        //console.log(parent.clientWidth)
        //elementcontent.style.width = parent.clientWidth + 'px';
        //console.log(elementcontent.style.width)
        //console.log(elementcontent);
        //console.log(elementheader);
        //console.log(elementheader.clientHeight);
        handledivresize();
        window.dispatchEvent(new Event('resize'));
    });

     onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handledivresize);
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