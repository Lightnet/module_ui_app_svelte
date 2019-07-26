<script>
    import {onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AlignRegionComponent from './AlignRegionComponent.svelte';
    import HeaderSplitterComponent from './headersplittercomponent.svelte';
    import SplitterComponent from './splittercomponent.svelte';
    import EditorMainComponent from '../editor/EditorMainComponent.svelte';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import DivDividerVComponent from './divdividervcomponent.svelte';
    import OffsetDivDividerVComponent from './testdividecomponent.svelte';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;
    let id1 = generateId(20);
    let id2 = generateId(20);

    let idalignregion1 = generateId(20);

    let screenregion2;
    let screen2 = "properties";
    //let screen2 = "outliner"

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
        screenregion2 = document.getElementById(id2);
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
</style>
<div id="{idcontent}" class="panelregion">
    <HeaderSplitterComponent bhorizontal={false} bresize={false} iddiv1={idalignregion1} />
    <AlignRegionComponent idcomponent={idalignregion1} align="v">
        <div id="{id1}" class="screenregion">
            <EditorMainComponent viewport="3dviewport"></EditorMainComponent>
        </div>
        <SplitterComponent bhorizontal={true} bresize={true} iddiv1={id1} iddiv2={id2}></SplitterComponent>
        <div id="{id2}" class="screenregion" on:mousemove={handle_screenregion}>
            <EditorMainComponent viewport="properties"></EditorMainComponent>
        </div>
    </AlignRegionComponent>
</div>
