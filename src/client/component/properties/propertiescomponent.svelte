<script>
    //https://www.w3schools.com/howto/howto_css_tooltip.asp
    //https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp
    /*
    Information: odd bug when resizing with layout setup not setup correctly.
    */
    import { onMount, beforeUpdate, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    import MaterialComponent from './materialcomponent.svelte';
    import ModifiersComponent from './modifierscomponent.svelte';
    import ObjectComponent from './objectcomponent.svelte';
    import ObjectconstraintComponent from './objectconstraintcomponent.svelte';
    import ObjectdataComponent from './objectdatacomponent.svelte';
    import OutputComponent from './outputcomponent.svelte';
    import ParticlesComponent from './particlescomponent.svelte';
    import PhysicsComponent from './physicscomponent.svelte';
    import RenderComponent from './rendercomponent.svelte';
    import SceneComponent from './scenecomponent.svelte';
    import TextureComponent from './texturecomponent.svelte';
    import ToolComponent from './toolcomponent.svelte';
    import WorldComponent from './worldcomponent.svelte';
    import ViewlayerComponent from './viewlayercomponent.svelte';

    const dispatch = createEventDispatcher();

    let idtab = generateId(20);
    let elementtab;
    let idcontent = generateId(20);
    let elementcontent;
    let idcontext = generateId(20);
    let elementcontext;
    let tabwidth = 32;
    let m = {x:0, y:0};

    let activeobject;//props
    export let context = "OBJECT";
    let itemtabs = [];

    function handle_props_resize(event){
        //console.log("resize");
        if(elementcontext == null){
            elementcontext = document.getElementById(idcontext);
            elementtab = document.getElementById(idtab);
            elementcontent = document.getElementById(idcontent);
        }
        let parent = elementcontext.parentNode;
        //console.log("propsparent");
        //console.log(parent);
        if(parent){
            elementcontext.style.height = parent.clientHeight + 'px';
            elementcontext.style.width = parent.clientWidth + 'px';
            elementtab.style.height = parent.clientHeight + 'px';
            let pwidth = 0;
            //console.log(elementtab.clientWidth)
            if(elementtab.clientWidth !=tabwidth){
                elementtab.style.width = '32px';
                //console.log("default!")
                pwidth = parent.clientWidth - tabwidth;
            }else{
                pwidth = parent.clientWidth - elementtab.clientWidth;
            }
            elementcontent.style.width = pwidth + 'px';
            elementcontent.style.height = parent.clientHeight + 'px';
        }
        //console.log(pwidth);
    }
    
    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handle_props_resize);
        activeobject = mjs.context.view_layer.objects.active;

        elementcontext = document.getElementById(idcontext);
        elementtab = document.getElementById(idtab);
        elementcontent = document.getElementById(idcontent);

        //console.log(elementtab.style.width);
        //console.log(elementtab.clientWidth);
        elementtab.style.width = '32px';

        itemtabs = [
            {sm_label:"Active Tool and Workspace Setting",sm_context:"TOOLS",sm_icon:"fas fa-tools"},
            {sm_label:"Render",sm_context:"RENDER",sm_icon:"fa fa-desktop"},
            {sm_label:"Output",sm_context:"OUTPUT",sm_icon:"fa fa-print"},
            {sm_label:"Viewlayer",sm_context:"VIEWLAYER",sm_icon:"fas fa-images"},
            {sm_label:"Scene",sm_context:"SCENE",sm_icon:"fas fa-file-image"},
            {sm_label:"World",sm_context:"WORLD",sm_icon:"fa fa-globe"},
            {sm_label:"Object",sm_context:"OBJECT",sm_icon:"fa fa-vector-square"},
            {sm_label:"Modifiers",sm_context:"MODIFIERS",sm_icon:"fa fa-wrench"},
            {sm_label:"Particles",sm_context:"PARTICLES",sm_icon:"fab fa-hubspot"},
            {sm_label:"Physics",sm_context:"PHYSICS",sm_icon:"fab fa-digital-ocean"},
            {sm_label:"Object Constraint",sm_context:"OBJECTCONSTRAINT",sm_icon:"fas fa-map-marker-alt"},
            {sm_label:"Object Data",sm_context:"OBJECTDATA",sm_icon:"fab fa-rev"},
            {sm_label:"Material",sm_context:"MATERIAL",sm_icon:"fab fa-dribbble"},
            {sm_label:"Texture",sm_context:"TEXTURE",sm_icon:"fas fa-chess-board"}
        ];
        //fixed odd resize when swtiching views 
        window.dispatchEvent(new Event('resize'));
    });

    beforeUpdate(()=>{
        //console.log("beforeUpdate");
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

    function tabselect(value){
        //console.log(value);
        context = value;
        dispatch('context',value);
    }

    function handle_mousemove(event){
        //m.x = event.clientX;
        //m.y = event.clientY;
        m.x = event.pageX - event.offsetX;
        m.y = event.pageY - event.offsetY - 32;
        //console.log(event);
    }

    //fa fa-bars
    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_props_resize);
    });
    //tab
    //{console.log(itemtabs)}
    //{#each Object.keys(itemtabs) as tab }
    //top:{m.y};left:{m.x};

    function handle_mouse_over(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'PROPERTIES'});
    }
</script>

<style>
    .tab::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        /*background-color: darkgrey;*/
        /*background: #666; */
    }

    .tab::-webkit-scrollbar-thumb{
        background-color: #333;
    }

    .contextprops{
        position: absolute;
        float:left;
        width:100%;
        height:100%;
        overflow: hidden;
    }

    .tab{
        float:left;
        min-width:32px;
        width:32px;
        height:100%;
        background-color: dimgrey;
        padding: 0px 0px 0px 0px;
        overflow: scroll;
        /*overflow: auto;*/
        /*overflow-y: hidden;*/
        /*overflow-x: hidden;*/
        /*z-index: 1;*/
        z-index: 1;
        /*overflow-x: hidden;*/
    }

    .dataprops{
        float:left;
        width:100%;
        height:100%;
        background-color: gray;
        overflow: visible;
        overflow-x: hidden;
    }

    button{
        background-color:grey;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 10px 4px;
    }

     button:hover{
        background-color: lightslategrey;
    }

    .tabbutton{
        height:28px;
        width:28px;
        background-color:#333;
        padding: 0px 0px 0px 0px;
    }

    .active, .tabbutton:hover{
        background-color: lightslategrey;
    }

    .tooltip {
        /*position: relative;*/
        /*position: fixed;
        top:0px;
        left:0px;
        */
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        /*width: 120px;*/
        /*background-color: #555;*/
        background-color: black;
        /*background-color: orange;*/
        color: #fff;
        /*color: black;*/
        text-align: center;
        /*border-radius: 6px;*/
        /*padding: 5px 0;*/
        padding: 5px 5px 5px 5px;
        /*position: absolute; #fail*/
        /*position: sticky; #fail*/
        position: fixed; /*#pass*/
        /*position: relative; #fail*/
        /*top:5px;
        left:5px;*/
        /*z-index: 1;*/
        /*
        top: -5px;
        left: 105%;*/
        /*bottom: 125%;*/
        /*left: 50%;*/
        /*margin-left: -60px;*/
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
        z-index: 3;
    }

    i{
        height:32px;
        width:32px;
        padding: 0px 0px 0px 0px;
    }

</style>
<div id="{idcontext}" class="contextprops" on:mousemove={handle_mouse_over}>
    
    <div id={idtab} class="tab">
        
        {#each itemtabs as tab }
            <button class="tabbutton tooltip {context === tab.sm_context ? 'active' : ''}" on:mousemove={handle_mousemove} on:click={()=>{tabselect(tab.sm_context)}}>
                <i class="{tab.sm_icon}"></i>
                <span class="tooltiptext" style="top:{m.y}px;left:{m.x}px;">{tab.sm_label}</span>
            </button>
        {/each}
        
    </div>

    <div id="{idcontent}" class="dataprops">
        
        {#if context == 'MATERIAL'}
            <MaterialComponent />
        {/if}

        {#if context == 'MODIFIERS'}
            <ModifiersComponent />
        {/if}

        {#if context == 'OBJECT'}
            <ObjectComponent />
        {/if}

        {#if context == 'OBJECTCONSTRAINT'}
            <ObjectconstraintComponent />
        {/if}

        {#if context == 'OBJECTDATA'}
            <ObjectdataComponent />
        {/if}

        {#if context == 'OUTPUT'}
            <OutputComponent />
        {/if}

        {#if context == 'PARTICLES'}
            <ParticlesComponent />
        {/if}

        {#if context == 'PHYSICS'}
            <PhysicsComponent />
        {/if}

        {#if context == 'RENDER'}
            <RenderComponent />
        {/if}

        {#if context == 'SCENE'}
            <SceneComponent />
        {/if}

        {#if context == 'TEXTURE'}
            <TextureComponent />
        {/if}

        {#if context == 'TOOLS'}
            <ToolComponent />
        {/if}

        {#if context == 'WORLD'}
            <WorldComponent />
        {/if}

        {#if context == 'VIEWLAYER'}
            <ViewlayerComponent />
        {/if}
        
    </div>
    
</div>