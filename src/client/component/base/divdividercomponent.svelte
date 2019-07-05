<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { Sl_Mouseregion } from '../../stores.js';
    import SplitterComponent from './splittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte'
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

    function handle_divresize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
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
        //handledivresize();
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handle_divresize);
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
        height:100%;
        width:45%;
        float:left;
        position:absolute;
    }

    .panel2 {
		background-color:grey;
        height:100%;
        width:45%;
        float:left;
        position:absolute;
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
