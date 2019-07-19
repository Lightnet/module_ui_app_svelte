<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import ScreenRegionComponent from './screenregioncomponent.svelte';
    import AlignRegionComponent from './alignregioncomponent.svelte';
    import SplitterComponent from './splittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte';
    import { generateId } from '../helper/generateid.js';
    //const dispatch = createEventDispatcher();

    export let idcomponent = generateId(20);
    let elementcontent;

    let id1 = generateId(20);
    let id2 = generateId(20);
    let screen1 = "outliner";
    let screen2 = "properties";
    //let screen2 = "outliner"

    function handle_layout_resize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        //if(parent != null){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
            //console.log("....");
        //}
    }

    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handle_layout_resize);
        elementcontent = document.getElementById(idcomponent);
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
</style>

<AlignRegionComponent idcomponent={idcomponent} align="v">
    
    <ScreenRegionComponent idcomponent={id1}>
    
        <EditorComponent viewport="{screen1}"></EditorComponent>

    </ScreenRegionComponent>
    <SplitterComponent bhorizontal={false} bresize={true} position="fixed" iddiv1={id1} iddiv2={id2}></SplitterComponent>
    <ScreenRegionComponent idcomponent="{id2}">
        
        <EditorComponent viewport="{screen2}"></EditorComponent>
        
    </ScreenRegionComponent>
    
</AlignRegionComponent>
