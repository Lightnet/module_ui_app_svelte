<script>
    //https://www.w3schools.com/howto/howto_css_tooltip.asp
    //https://www.w3schools.com/howto/howto_css_custom_scrollbar.asp
    /*
    Information: odd bug when resizing with layout setup not setup correctly.
    */
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import { PropertiesConfig } from '../../mjs.js';

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

    import B280X1 from '../icon/b280X1.svelte';
    import B280X2 from '../icon/b280X2.svelte';
    import B280X3 from '../icon/b280X3.svelte';
    import B280X4 from '../icon/b280X4.svelte';
    import B280X5 from '../icon/b280X5.svelte';
    import B280X20 from '../icon/b280X20.svelte';

    import B280AA2 from '../icon/b280AA2.svelte';
    import B280AA3 from '../icon/b280AA3.svelte';
    import B280AA6 from '../icon/b280AA6.svelte';
    import B280AA7 from '../icon/b280AA7.svelte';
    import B280AA11 from '../icon/b280AA11.svelte';
    import B280AA12 from '../icon/b280AA12.svelte';
    import B280AA15 from '../icon/b280AA15.svelte';
    import B280AA17 from '../icon/b280AA17.svelte';

    const dispatch = createEventDispatcher();

    let idtab = generateId(20);
    let elementtab;
    let tabwidth = 32;
    let viewcomponent;

    let idcontent = generateId(20);
    let elementcontent;

    let idcontext = generateId(20);
    let elementcontext;
    let idstyle = generateId(20);
    
    let m = {x:0, y:0};

    let activeobject;//props
    export let context = "OBJECT";
    let itemtabs = [];

    let PropertiesStyle = {};

    const PropertiesConfigUnsub = PropertiesConfig.subscribe(value=>{
		PropertiesStyle = value;
		//console.log("PropertiesStyle theme change?");
		checktheme();
    });
    
    function checktheme(){
		if(elementcontext ==null){
			return;
		}
		let css = `
		.propsbtn {background-color: ${PropertiesStyle.menubtn.h} !important; }
		.propsbtn:hover { background-color: ${PropertiesStyle.menubtn.h} !important; } 
        .propsbtn:active { background-color: ${PropertiesStyle.menubtn.a} !important; }
        .propstabbtn { background-color: ${PropertiesStyle.tabbtn.d} !important; }
		.propstabbtn:hover { background-color: ${PropertiesStyle.tabbtn.h} !important; } 
        .propstabbtn:active { background-color: ${PropertiesStyle.tabbtn.a} !important; }
        .propstabactive { background-color: ${PropertiesStyle.tabbtn.a} !important; }
        .propstabbg { background-color: ${PropertiesStyle.tabbg.c} !important; }
		.propspanel { background-color: ${PropertiesStyle.panel.d} !important; }
		.propspanel:hover { background-color: ${PropertiesStyle.panel.h} !important; } 
		.propspanel:active { background-color: ${PropertiesStyle.panel.a} !important; }
		.propspanelbg { background-color: ${PropertiesStyle.bg.c} !important;}
        `;
        //console.log(css);
		//console.log(css);
		createstyle(elementcontext,css);
	}

	function createstyle(element,_css){
		//let css = '.menubtn:hover{ background-color: white !important; }';
		//remove element to update style
		let css = _css;
		let elsytle = document.getElementById(idstyle);
		if(elsytle){
			elsytle.remove();
			elsytle =null;
		}
		if(elsytle == null){
			//console.log("create style");
			elsytle = document.createElement('style');
			elsytle.setAttribute("id",idstyle);
			elsytle.appendChild(document.createTextNode(css));
			//console.log(elsytle);
			element.appendChild(elsytle);
		}
    }

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
        
        activeobject = mjs.context.view_layer.objects.active;

        elementcontext = document.getElementById(idcontext);
        elementtab = document.getElementById(idtab);
        elementcontent = document.getElementById(idcontent);
        checktheme();

        //console.log(elementtab.style.width);
        //console.log(elementtab.clientWidth);
        elementtab.style.width = '32px';

        itemtabs = [
            {sm_label:"Active Tool and Workspace Setting",sm_context:"TOOLS",sm_component:ToolComponent,sm_icon:B280AA15},
            {sm_label:"Render",sm_context:"RENDER",sm_component:RenderComponent,sm_icon:B280AA6},
            {sm_label:"Output",sm_context:"OUTPUT",sm_component:OutputComponent,sm_icon:B280AA7},
            {sm_label:"Viewlayer",sm_context:"VIEWLAYER",sm_component:ViewlayerComponent,sm_icon:B280X2},
            {sm_label:"Scene",sm_context:"SCENE",sm_component:SceneComponent,sm_icon:B280X1},
            {sm_label:"World",sm_context:"WORLD",sm_component:WorldComponent,sm_icon:B280X3},
            {sm_label:"Object",sm_context:"OBJECT",sm_component:ObjectComponent,sm_icon:B280X4},
            {sm_label:"Modifiers",sm_context:"MODIFIERS",sm_component:ModifiersComponent,sm_icon:B280AA17},
            {sm_label:"Particles",sm_context:"PARTICLES",sm_component:ParticlesComponent,sm_icon:B280AA11},
            {sm_label:"Physics",sm_context:"PHYSICS",sm_component:PhysicsComponent,sm_icon:B280AA12},
            {sm_label:"Object Constraint",sm_context:"OBJECTCONSTRAINT",sm_component:ObjectconstraintComponent,sm_icon:B280X20},
            {sm_label:"Object Data",sm_context:"OBJECTDATA",sm_component:ObjectdataComponent,sm_icon:B280X5},
            {sm_label:"Material",sm_context:"MATERIAL",sm_component:MaterialComponent,sm_icon:B280AA2},
            {sm_label:"Texture",sm_context:"TEXTURE",sm_component:TextureComponent,sm_icon:B280AA3}
        ];

        tabselect(context);
        window.addEventListener('resize', handle_props_resize);
        //fixed odd resize when swtiching views 
        window.dispatchEvent(new Event('resize'));
    });

    function tabselect(value){
        //console.log(value);
        context = value;
        dispatch('context',value);

        for(let i = 0; i < itemtabs.length; i++){
            if(itemtabs[i].sm_context == context){
                viewcomponent = itemtabs[i].sm_component;
                break;
            }
        }
    }

    function handle_mousemove(event){
        //m.x = event.clientX;
        //m.y = event.clientY;
        m.x = event.pageX - event.offsetX;
        m.y = event.pageY - event.offsetY - 32;
    }

    onDestroy(() => {
        window.removeEventListener('resize', handle_props_resize);
        PropertiesConfigUnsub();
    });

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
        background-color: #232323;
        padding: 0px 0px 0px 0px;
        overflow: scroll;
        /*z-index: 1;*/
    }

    .dataprops{
        float:left;
        width:100%;
        height:100%;
        background-color: #383838;
        overflow: visible;
        overflow-x: hidden;
    }

    button{
        border:none;
        outline: none;
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
        border:none;
        outline: none;
        height:28px;
        width:28px;
        background-color:#2b2b2b;
        padding: 0px 0px 0px 0px;
        display:block;
    }

    .active, .tabbutton:hover{
        background-color: #3a3a3a;
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
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
        z-index: 3;
    }
    /*
    i{
        height:32px;
        width:32px;
        padding: 0px 0px 0px 0px;
    }
    */
    /*.propsbtn{background-color: aquamarine;}*/

</style>
<div id="{idcontext}" class="contextprops" on:mousemove={handle_mouse_over}>
    
    <div id={idtab} class="tab propstabbg">
        {#each itemtabs as tab }
            <button class="tabbutton tooltip {context === tab.sm_context ? 'active propstabactive' : ''}  propstabbtn" on:mousemove={handle_mousemove} on:click={()=>{tabselect(tab.sm_context)}}>
                <svelte:component this={tab.sm_icon} on:click={()=>{tabselect(tab.sm_context)}} />
                <span class="tooltiptext" style="top:{m.y}px;left:{m.x}px;">{tab.sm_label}</span>
            </button>
        {/each}
        
    </div>

    <div id="{idcontent}" class="dataprops">

        {#if viewcomponent !=null}
            <svelte:component this={viewcomponent}/>
        {/if}
        
    </div>
    
</div>