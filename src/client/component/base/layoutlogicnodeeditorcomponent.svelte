<script>
    import {onMount, onDestroy, createEventDispatcher } from 'svelte'
    import SplitterComponent from './headersplittercomponent.svelte';
    import EditorMainComponent from '../editor/EditorMainComponent.svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    import DivDividerVComponent from './divdividervcomponent.svelte';

    let idcontent = generateId(20);
    let elementcontent;

    let id2 = generateId(20);
    let screen = "properties";
    //screen = "outliner"
    //screen = "logicnodeeditor"
    screen = "access"
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
        handle_divider_resize();
        elementscreen = document.getElementById(id2);

        window.addEventListener('resize', handle_divider_resize);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_divider_resize);
    });

    function handle_screenregion(event){
        mjs.context.screenregion = elementscreen;
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
        /*margin-top: +10px;*/
        height:100%;
        width:100%;
        float:left;
        position:absolute;
    }

</style>
<div id="{idcontent}" class="panelregion">
    <SplitterComponent bhorizontal={false} bresize={false} iddiv1={id2}></SplitterComponent>
    <div id="{id2}" class="screenregion" on:mousemove={handle_screenregion}>
        <EditorMainComponent viewport="{screen}"></EditorMainComponent>
    </div>
</div>
