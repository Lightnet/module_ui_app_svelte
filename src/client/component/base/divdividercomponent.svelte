<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { Sl_Mouseregion } from '../../stores.js';
    import SplitterComponent from './splittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte'
    import { generateId } from '../helper/generateid.js';
    //const dispatch = createEventDispatcher();
    //onMount(async () => {	
    //});
    


    let idcontent = generateId(20);
    let elementcontent;

    //let id1 = "test1";
    //let id2 = "test2";
    let id1 = generateId(20);
    let id2 = generateId(20);

    function handledivresize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
    }

    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handledivresize);
    });

    afterUpdate(()=>{
        elementcontent = document.getElementById(idcontent);
        handledivresize();
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handledivresize);
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
        <EditorComponent viewport="properties"></EditorComponent>
    </div>
</div>
