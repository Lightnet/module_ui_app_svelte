<script>
    import {onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import SplitterComponent from './headersplittercomponent.svelte';
    import EditorComponent from '../editor/editorcomponent.svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    import DivDividerVComponent from './divdividervcomponent.svelte';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    let id1 = generateId(20);
    let id2 = generateId(20);
    let screen2 = "properties";
    let elementscreen;
    //let screen2 = "outliner"

    let idpr1 = generateId(20);
    let placeregion1;
    let idpr2 = generateId(20);
    let placeregion2;

    function handle_divider_resize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        if(parent){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
        }
    }

    let bmovedivide = false;

    function handle_divider(event){
        //console.log("down");
        //console.log(event);
        if(event.button == 0){
            createdivider(event);
            if(bmovedivide == false){
                bmovedivide = true;
                window.addEventListener('mousemove',movedivide);
            }
        }

        if(event.button == 2){
            removedivider(event);
            if(bmovedivide == true){
                bmovedivide = false;
                window.removeEventListener('mousemove',movedivide);
            }
        }
    }

    function createdivider(event){
        placeregion1.style.display = 'initial';
        //elementscreen.clientWidth
        console.log("add?");
        //console.log(elementscreen)
        console.dir(elementscreen)

        let split_width = 0;
        let split_height = 10;

        //placeregion1.style
        //placeregion1.style.top = elementscreen.offsetTop + split_height + 'px';
        placeregion1.style.top = elementscreen.offsetParent.offsetTop + elementscreen.offsetTop + 'px';

        //
        placeregion1.style.left = elementscreen.offsetLeft + 'px';
        placeregion1.style.width = elementscreen.clientWidth + 'px';
        placeregion1.style.height = elementscreen.clientHeight + split_height + 'px';
        //console.log(placeregion1);
        //console.log(elementscreen.clientHeight);
    }

    function movedivide(event){
        //let x = event.clientX;
        let x = event.pageX;
        //console.log(x);
        //console.log(elementscreen)
        //console.dir(elementscreen)
        if((event.pageX - elementscreen.offsetWidth) < 0){

            placeregion1.style.width = event.pageX + 'px';
        }else{
            if((event.pageX - elementscreen.offsetWidth) > elementscreen.offsetWidth){
                return;
            }
            placeregion1.style.width = event.pageX - elementscreen.offsetWidth + 'px';
        }
        //console.log(elementscreen.offsetLeft - x);
        //console.log(elementscreen.offsetWidth);
        //console.log(event.pageX - elementscreen.offsetWidth);
        //console.log(event.pageX);
    }

    function removedivider(event){
        placeregion1.style.display = 'none';
    }

    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handle_divider_resize);
        elementcontent = document.getElementById(idcontent);
        handle_divider_resize();
        //window.addEventListener('mousedown',handle_divider);

        placeregion1 = document.getElementById(idpr1);
        placeregion2 = document.getElementById(idpr2);
        elementscreen = document.getElementById(id2);
    });

    afterUpdate(()=>{
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_divider_resize);
        window.removeEventListener('mousedown',handle_divider)
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

    .placeregion{
        opacity: 0.5;
        /*background-color: red;*/
        filter: alpha(opacity=50); /* For IE8 and earlier */
        position:absolute;
    }
</style>
<div id="{idcontent}" class="panelregion">
    <SplitterComponent bhorizontal={false} bresize={false} iddiv1={id2}></SplitterComponent>
    <div id="{id2}" class="screenregion" on:mousemove={handle_screenregion}>
        <EditorComponent viewport="{screen2}"></EditorComponent>
        <!--
        <DivDividerVComponent></DivDividerVComponent>
        -->
    </div>
</div>
<div id={idpr1} class="placeregion"></div>
<div id={idpr2} class="placeregion"></div>
