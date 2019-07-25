<script>
    import {onMount, onDestroy, createEventDispatcher } from 'svelte';
    import AlignRegionComponent from './alignregioncomponent.svelte';
    import ScreenRegionComponent from './screenregioncomponent.svelte'
    import SplitterComponent from './headersplittercomponent.svelte';
    import EditorMainComponent from '../editor/EditorMainComponent.svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    import DivDividerVComponent from './divdividervcomponent.svelte';

    let idcontent = generateId(20);
    let elementcontent;

    let idalignregion1 = generateId(20);

    let idscreen1 = generateId(20);
    let screen = "properties";
    //screen = "outliner"
    screen = "preferences"
    let elementscreen;
    

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
        elementcontent = document.getElementById(idcontent);
        elementscreen = document.getElementById(idscreen1);
        handle_divider_resize();
        window.addEventListener('resize', handle_divider_resize);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_divider_resize);
    });

    function handle_screenregion(event){
        mjs.context.screenregion = elementscreen;
    }

    //<div id="{idscreen1}" class="screenregion" on:mousemove={handle_screenregion}>
</script>

<style>
    .panelregion{
		background-color: dimgrey;
        height:100%;
        width:100%;
        float:left;
        position:absolute;
    }
</style>
<div id="{idcontent}" class="panelregion">
    <SplitterComponent bhorizontal={false} bresize={false} iddiv1={idalignregion1}></SplitterComponent>
    <AlignRegionComponent idcomponent={idalignregion1} align="v">
        <ScreenRegionComponent>
            <EditorMainComponent viewport="{screen}"></EditorMainComponent>
        </ScreenRegionComponent>
    </AlignRegionComponent>
</div>
