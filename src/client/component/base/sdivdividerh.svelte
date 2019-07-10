<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import SplitterComponent from './splittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    let idcontent = generateId(20);
    let elementcontent;

    let id1 = generateId(20);
    let screenregion1;
    let id2 = generateId(20);
    let screenregion2;
    let screen2 = "properties";
    //let screen2 = "outliner"

    function handle_divresize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        if(parent){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
        }
    }

    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handle_divresize);
        elementcontent = document.getElementById(idcontent);
        screenregion1 = document.getElementById(id1);
        screenregion2 = document.getElementById(id2);
        handle_divresize()
    });

    afterUpdate(()=>{
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_divresize);
    });

    function handle_screenregion1(event){
        mjs.context.screenregion = screenregion1;
    }

    function handle_screenregion2(event){
        mjs.context.screenregion = screenregion2;
    }
</script>

<style>
    .panelregion{
		background-color: dimgrey;
        height:100%;
        width:100%;
        float:left;
        position:absolute;
    }

    .screenregion {
		background-color: dimgrey;
        height:100%;
        width:45%;
        float:left;
        position:absolute;
    }
    /*
    .screenregion2 {
		background-color:grey;
        height:100%;
        width:45%;
        float:left;
        position:absolute;
    }
    */
</style>
<div id="{idcontent}" class="panelregion">
    <div id="{id1}" class="screenregion" on:mousemove={handle_screenregion1}>
        <EditorComponent viewport="3dviewport"></EditorComponent>
    </div>
    <SplitterComponent bhorizontal={true} bresize={true} iddiv1={id1} iddiv2={id2}></SplitterComponent>
    <div id="{id2}" class="screenregion" on:mousemove={handle_screenregion2}>
        <EditorComponent viewport="{screen2}"></EditorComponent>
    </div>
</div>
