<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import SSplitter from './splitter.svelte';

    import EditorComponent from './editorcomponent.svelte'

    //const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    
    //onMount(() => {
        //console.log("mount")
    //});

    let id1 = "test1";
    let id2 = "test2";
</script>

<style>
    .panel1 {
		background-color: dimgrey;
        height:100%;
        width:50%;
        float:left;
        position:absolute;
    }

    .panel2 {
		background-color:goldenrod;
        height:100%;
        width:15%;
        float:left;
        position:absolute;
    }
</style>

<div id="{id1}" class="panel1">
    <EditorComponent viewport="3dviewport"></EditorComponent>
</div>
<SSplitter bhorizontal={false} bresize={true} iddiv1={id1} iddiv2={id2}></SSplitter>
<div id="{id2}" class="panel2">
    <EditorComponent viewport="properties"></EditorComponent>
</div>
