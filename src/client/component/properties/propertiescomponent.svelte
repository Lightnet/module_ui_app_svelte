<script>
    //https://www.w3schools.com/howto/howto_css_tooltip.asp
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
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
    let activeobject;
    export let context = "OBJECT";
    let itemtabs = [];

    function handledivresize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth - elementtab.clientWidth + 'px';
    }
    
    onMount(() => {
        //console.log("mount")
        window.addEventListener('resize', handledivresize);
        activeobject = mjs.context.view_layer.objects.active;
        //itemtabs[0].sm_label = "object";
        //itemtabs[0].sm_icon = "fa fa-bars";
        //itemtabs[1].sm_label = "object";
        //itemtabs[1].sm_icon = "fa fa-bars";
    });

    afterUpdate(() => {
        //console.log("afterUpdate")
        elementtab = document.getElementById(idtab);
        elementcontent = document.getElementById(idcontent);
        activeobject = mjs.context.view_layer.objects.active;

        //itemtabs['object'] = {sm_label:"object",sm_icon:"fa fa-bars"};
        //itemtabs.push({sm_label:"edit",sm_icon:"fa fa-bars"});
        //itemtabs['object'] = {sm_label:"object",sm_icon:"fa fa-bars"};
        //itemtabs['edit'] = {sm_label:"edit",sm_icon:"fa fa-bars"};
        itemtabs = [
            {sm_label:"activetoolandworkspacesetting",sm_context:"TOOLS",sm_icon:"fas fa-tools"},
            {sm_label:"render",sm_context:"RENDER",sm_icon:"fa fa-desktop"},
            {sm_label:"output",sm_context:"OUTPUT",sm_icon:"fa fa-print"},
            {sm_label:"viewlayer",sm_context:"VIEWLAYER",sm_icon:"fas fa-images"},
            {sm_label:"scene",sm_context:"SCENE",sm_icon:"fas fa-file-image"},
            {sm_label:"world",sm_context:"WORLD",sm_icon:"fa fa-globe"},
            {sm_label:"object",sm_context:"OBJECT",sm_icon:"fa fa-vector-square"},
            {sm_label:"modifiers",sm_context:"MODIFIERS",sm_icon:"fa fa-wrench"},
            {sm_label:"particles",sm_context:"PARTICLES",sm_icon:"fab fa-hubspot"},
            {sm_label:"physics",sm_context:"PHYSICS",sm_icon:"fab fa-digital-ocean"},
            {sm_label:"objectconstraint",sm_context:"OBJECTCONSTRAINT",sm_icon:"fas fa-map-marker-alt"},
            {sm_label:"objectdata",sm_context:"OBJECTDATA",sm_icon:"fab fa-rev"},
            {sm_label:"material",sm_context:"MATERIAL",sm_icon:"fab fa-dribbble"},
            {sm_label:"texture",sm_context:"TEXTURE",sm_icon:"fas fa-chess-board"}
            //{sm_label:"edit",sm_icon:"fab fa-dribbble"}
        ]
    });

    function tabselect(value){
        console.log(value)
        context = value
        dispatch('context',value);
    }

    //fa fa-bars
    onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handledivresize);
    });
    //tab
    //{console.log(itemtabs)}
    //{#each Object.keys(itemtabs) as tab }
</script>

<style>
    .context{
        position: absolute;
        float:left;
        width:100%;
        height:100%;
    }
    .tab{
        float:left;
        width:32px;
        height:100%;
        background-color: dimgrey;
        padding: 0px 0px 0px 0px;
    }
    .panel{
        float:left;
        width:90%;
        height:100%;
        background-color: gray;
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

    .tabbutton:hover{
        background-color: lightslategrey;
    }

    .tooltip {
        position: relative;
        display: inline-block;
        border-bottom: 1px dotted black;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        /*width: 120px;*/
        /*background-color: #555;*/
        background-color: black;
        color: #fff;
        text-align: center;
        /*border-radius: 6px;*/
        /*padding: 5px 0;*/
        padding: 5px 5px 5px 5px;
        position: absolute;
        z-index: 1;
        top: -5px;
        left: 105%;
        /*bottom: 125%;*/
        /*left: 50%;*/
        /*margin-left: -60px;*/
        opacity: 0;
        transition: opacity 0.3s;
    }

    /*
    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;  
    }
    */
    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }


</style>
<div class="context">
    
    <div id={idtab} class="tab">
        {#each itemtabs as tab }
            <button class="tabbutton tooltip" on:click={()=>{tabselect(tab.sm_context)}}>
                <i class="{tab.sm_icon}"></i>
                <span class="tooltiptext">{tab.sm_label}</span>
            </button>
        {/each}
        <!--
        <button class="tabbutton" on:click={()=>{}}>
            <i class="fa fa-bars"></i>
        </button>
        -->
    </div>

    <div id="{idcontent}" class="panel">
        <!--
        {#if activeobject != null}
            {#if activeobject.el != null}
                <label> Name: {activeobject.el.localName}  </label>
                <button on:click={()=>{activeobject.visible = !activeobject.visible}}> Visible: {activeobject.visible}  </button>
            {/if}
        {/if}
        -->
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