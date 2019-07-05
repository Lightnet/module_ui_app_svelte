<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import SplitterComponent from './splittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte';
    import { generateId } from '../helper/generateid.js';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    //let id1 = "test1";
    //let id2 = "test2";
    let id1 = generateId(20);
    let id2 = generateId(20);
    let screen2 = "properties";
    //let screen2 = "outliner"

    function handle_layout_resize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementcontent.parentNode;
        if(parent != null){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
        }
    }

    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handle_layout_resize);
        elementcontent = document.getElementById(idcontent);
        handle_layout_resize()
    });

    afterUpdate(()=>{
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_layout_resize);
    });
</script>

<style>
    .panel0{
		background-color: dimgrey;
        height:100%;
        width:100%;
        float:left;
        position:absolute;
    }

    .panel1 {
		background-color: dimgrey;
        height:40%;
        width:100%;
        float:left;
        position:absolute;
        overflow: hidden;
    }

    .panel2 {
		background-color:grey;
        height:45%;
        width:100%;
        float:left;
        position:absolute;
        overflow: hidden;
    }
</style>
<div id="{idcontent}" class="panel0">
    <div id="{id1}" class="panel1">
        <EditorComponent viewport="3dviewport"></EditorComponent>
    </div>
    <SplitterComponent bhorizontal={false} bresize={true} iddiv1={id1} iddiv2={id2}></SplitterComponent>
    <div id="{id2}" class="panel2">
        <EditorComponent viewport="{screen2}"></EditorComponent>
    </div>
</div>
