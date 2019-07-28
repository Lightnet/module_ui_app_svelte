<script>
    import {onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import HeaderSplitterComponent from './headersplittercomponent.svelte';
    import ScreenRegionComponent from './ScreenRegionComponent.svelte';
    import AlignRegionComponent from './AlignRegionComponent.svelte';
    import SplitterComponent from './SplitterComponent.svelte';
    import EditorMainComponent from '../editor/EditorMainComponent.svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import DivDividerVComponent from './divdividervcomponent.svelte';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;
    let idalignregion1 = generateId(20);
    let id1 = generateId(20);
    let id2 = generateId(20);
    let screen2 = "properties";
    //let screen2 = "outliner"
    //screen2 = "tools"

    function handle_divider_resize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        if(parent){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
        }
    }

    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handle_divider_resize);
        elementcontent = document.getElementById(idcontent);
        handle_divider_resize()
    });

    afterUpdate(()=>{
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_divider_resize);
    });

    function handle_screenregion(event){
        //mjs.context.screenregion = screenregion2;
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
    /*
    .screenregion {
		background-color: dimgrey;
        height:100%;
        width:100%;
        float:left;
        position:absolute;
    }
    */
</style>
<div id="{idcontent}" class="panelregion">
    <HeaderSplitterComponent bhorizontal={false} bresize={false} iddiv1={idalignregion1} />
    <AlignRegionComponent idcomponent={idalignregion1} align="v">
        
        <ScreenRegionComponent idcomponent={id1}>
            <EditorMainComponent viewport="3dviewport"></EditorMainComponent>
        </ScreenRegionComponent>

        <SplitterComponent bhorizontal={true} bresize={true} iddiv1={id1} iddiv2={id2}></SplitterComponent>

        <DivDividerVComponent idcomponent={id2}></DivDividerVComponent>
        
    </AlignRegionComponent>

</div>
