<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import SplitterComponent from './splittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte'
    import { generateId } from '../helper/generateid.js';

    let idcontent = generateId(20);
    let elementcontent;

    let id1 = generateId(20);
    let id2 = generateId(20);
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
        handle_divresize()
    });

    afterUpdate(()=>{
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_divresize);
    });
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

    .screenregion2 {
		background-color:grey;
        height:100%;
        width:45%;
        float:left;
        position:absolute;
    }
</style>
<div id="{idcontent}" class="panelregion">
    <div id="{id1}" class="screenregion">
        <EditorComponent viewport="3dviewport"></EditorComponent>
    </div>
    <SplitterComponent bhorizontal={true} bresize={true} iddiv1={id1} iddiv2={id2}></SplitterComponent>
    <div id="{id2}" class="screenregion2">
        <EditorComponent viewport="{screen2}"></EditorComponent>
    </div>
</div>
