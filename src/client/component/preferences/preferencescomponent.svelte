<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';

    import  InterfaceComponent from './inferfacecomponent.svelte';
    import  AddonsComponent from './addonscomponent.svelte';
    import  EditingComponent from './editingcomponent.svelte';
    import  AnimationComponent from './animationcomponent.svelte';
    import  FilePathComponent from './filepathcomponent.svelte';
    import  InputComponent from './inputcomponent.svelte';
    import  KeymapComponent from './keymapcomponent.svelte';
    import  LightsComponent from './lightscomponent.svelte';
    import  NavigationComponent from './navigationcomponent.svelte';
    import  SaveAndLoadComponent from './saveandloadcomponent.svelte';
    import  SystemComponent from './systemcomponent.svelte';
    import  ThemeComponent from './themecomponent.svelte';
    import  ViewportComponent from './viewportcomponent.svelte';

    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    let tabitem = [];

    let idcomponent = generateId(20);
    let elcomponent;

    let idtab = generateId(20);
    let eltab;
    let tabwidth = 128;
    let tabview = "addons";
    let viewcomponent;

    let idcontent = generateId(20);
    let elcontent;

    function handle_preferences_resize(event){
        //console.log("resize");
        if(elcomponent == null){
            return;
        }
        let parent = elcomponent.parentNode;
        elcomponent.style.height = parent.clientHeight + 'px';
        elcomponent.style.width = parent.clientWidth + 'px';

        if(parent){
            //idcontent.style.height = parent.clientHeight + 'px';
            //idcontent.style.width = parent.clientWidth + 'px';
            eltab.style.height = elcomponent.clientHeight + 'px';
            let pwidth = 0;
            //console.log(eltab.clientWidth)
            if(eltab.clientWidth != tabwidth){
                eltab.style.width = tabwidth +'px';
                //console.log("default!")
                pwidth = parent.clientWidth - tabwidth;
            }else{
                pwidth = parent.clientWidth - eltab.clientWidth;
            }
            elcontent.style.width = pwidth + 'px';
            elcontent.style.height = parent.clientHeight + 'px';
        }
    }

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        elcontent = document.getElementById(idcontent);
        eltab = document.getElementById(idtab);

        tabitem.push({sm_label:"Interface",sm_context:"interface",sm_component:InterfaceComponent});
        tabitem.push({sm_label:"Themes",sm_context:"themes",sm_component:ThemeComponent});
        tabitem.push({sm_label:"Viewport",sm_context:"viewport",sm_component:ViewportComponent});
        tabitem.push({sm_label:"Lights",sm_context:"lights",sm_component:LightsComponent});
        tabitem.push({sm_label:"Editing",sm_context:"editing",sm_component:EditingComponent});
        tabitem.push({sm_label:"Animation",sm_context:"animation",sm_component:AnimationComponent});
        tabitem.push({sm_label:"Add-ons",sm_context:"addons",sm_component:AddonsComponent});
        tabitem.push({sm_label:"Input",sm_context:"input",sm_component:InputComponent});
        tabitem.push({sm_label:"Navigation",sm_context:"navigation",sm_component:NavigationComponent});
        tabitem.push({sm_label:"Keymap",sm_context:"keymap",sm_component:KeymapComponent});
        tabitem.push({sm_label:"System",sm_context:"system",sm_component:SystemComponent});
        tabitem.push({sm_label:"Save & Load",sm_context:"save&load",sm_component:SaveAndLoadComponent});
        tabitem.push({sm_label:"File Paths",sm_context:"filepaths",sm_component:FilePathComponent});
        tabitem = tabitem;//need be here to update variable

        //console.log(tabview);
        tabselect(tabview);//init default context
        handle_preferences_resize();
        window.addEventListener('resize', handle_preferences_resize);
    });

    function tabselect(context){
        tabview = context;
        for(let i = 0; i < tabitem.length; i++){
            if(tabitem[i].sm_context == context){
                viewcomponent = tabitem[i].sm_component;
                break;
            }
        }
        //console.log(context);
    }

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_preferences_resize);
    });

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'PREFERENCES'});
    }

    //{console.log(viewcomponent)}
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

    .tab{
        float:left;
        min-width:32px;
        width:128px;
        height:100%;
        background-color: #4b4b4b;
        padding: 0px 0px 0px 0px;
        overflow: scroll;
        /*z-index: 1;*/
    }

    .dataprops{
        float:left;
        width:100%;
        height:100%;
        background-color: #424242;
        overflow: visible;
        overflow-x: hidden;
    }

    .perferences{
        background-color: #424242;
        color:white;
        padding: 0px 0px 0px 0px;
    }

    button{
		border:none;
        outline: none;
        background-color:#595959;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 4px 4px;
		display: inline-block;
		text-decoration: none;
    }

    .tabbtn{
        width:100%;
    }

	button:hover{
        background-color: #686868;
    }

	button:active {
  		background-color: #557bb6;
	}

    .active {
  		background-color: #557bb6;
	}

    .vertical-menu {
        width: 120px;
    }

    a{
        text-align: center;
        background-color:#595959;
        color:white;
    }
    a:active{
        background-color: #557bb6;
    }

    a:hover{
        background-color: #686868;
    }

    .vertical-menu a{
        display: block;
        /*padding: 12px;*/
        text-decoration: none;
    }

</style>

<div id="{idcomponent}" class="perferences" on:mousemove={handle_mousemove}>
    
    <div id={idtab} class="tab">
        <div  class="vertical-menu">
            {#each Object.keys(tabitem) as item}
                <a href="/#"
                    on:click={()=>{tabselect(tabitem[item].sm_context)}} 
                    class="tabbtn {tabview == tabitem[item].sm_context ? 'active' : ''} ">
                        {tabitem[item].sm_label}
                </a>
            {/each}
        </div>
    </div>

    <div id="{idcontent}" class="dataprops">
        {#if viewcomponent !=null}
            <svelte:component this={viewcomponent}/>
        {/if}
    </div>
</div>