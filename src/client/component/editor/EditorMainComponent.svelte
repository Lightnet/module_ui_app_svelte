<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    import EditorHeaderComponent from './EditorHeaderComponent.svelte';
    import EditorContentComponent from './EditorContentComponent.svelte';
    //import EditorNavmenuComponent from "./EditorNavmenuComponent.svelte";

    import LogicNodeNavigationComponent from "../logicnodeeditor/LogicNodeNavigationComponent.svelte";
    import TextEditorNavigationComponent from "../texteditor/TextEditorNavigationComponent.svelte";
    import AccessNavigationComponent from "../access/AccessNavigationComponent.svelte";

    import AccessMainComponent from '../access/AccessMainComponent.svelte';
    import Viewport3DMainComponent from '../viewport3d/Viewport3DMainComponent.svelte';
    import LogicNodeEditorMainComponent from '../logicnodeeditor/LogicNodeEditorMainComponent.svelte';
    import TextEditorMainComponent from '../texteditor/TextEditorMainComponent.svelte';
    import ScriptConsoleMainComponent from '../scriptconsole/ScriptConsoleMainComponent.svelte';
    import InfoMainComponent from '../info/InfoMainComponent.svelte';
    import OutlinerMainComponent from '../outliner/OutlinerMainComponent.svelte';
    import PropertiesMainComponent from '../properties/PropertiesMainComponent.svelte';
    import FileBrowserMainComponent from '../filebrowser/FileBrowserMainComponent.svelte';
    import PreferencesMainComponent from '../preferences/PreferencesMainComponent.svelte';

    import b280K26 from '../icon/b280K26.svelte';
    import b280V24 from '../icon/b280V24.svelte';
    import b280Z1 from '../icon/b280Z1.svelte';
    import b280Z3 from '../icon/b280Z3.svelte';
    import b280Z4 from '../icon/b280Z4.svelte';
    import b280Z5 from '../icon/b280Z5.svelte';
    import b280Z7 from '../icon/b280Z7.svelte';
    import b280Z9 from '../icon/b280Z9.svelte';
    import b280Z14 from '../icon/b280Z14.svelte';
    import b280Z16 from '../icon/b280Z16.svelte';
    import b280Z18 from '../icon/b280Z18.svelte';

    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";
    let items = [];

    let idheader = generateId(20);
    let idcontent = generateId(20);
    let elementcontent;
    let contexteditor = Viewport3DMainComponent;


    function selectview(view){
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == view){
                //console.log(view);
                contexteditor = items[i].comp;
                break;
            }
        }
    }

    async function handle_viewport(event){
        viewport = event.detail.context;
        /*
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == event.detail){
                if(items[i].comp !=null){
                    contexteditor = items[i].comp;
                }
                break;
            }
        }
        */
    }

    function handle_editor_resize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("onMount");
        items.push({sm_label:"Access",sm_context:"access",sm_category:"general",icon:b280V24,sm_navmenu:AccessNavigationComponent,comp:AccessMainComponent});
        items.push({sm_label:"Viewport 3D",sm_context:"3dviewport",sm_category:"general",icon:b280Z1,sm_navmenu:null,comp:Viewport3DMainComponent});
        //items.push({sm_label:"imageeditor",sm_context:"imageeditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"uveditor",sm_context:"uveditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"shadereditor",sm_context:"shadereditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"compositor",sm_context:"compositor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        items.push({sm_label:"Logic Node Editor",sm_context:"logicnodeeditor",sm_category:"general",icon:b280Z16,sm_navmenu:LogicNodeNavigationComponent,comp:LogicNodeEditorMainComponent});
        //items.push({sm_label:"Texture Node Editor",sm_context:"texturenodeeditor",sm_category:"general,icon:null",sm_navmenu:null,comp:null});
        //items.push({sm_label:"Video Sequencer",sm_context:"videosequencer",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Movie Clip Editor",sm_context:"movieclipeditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});

        //items.push({sm_label:"Dope Sheet",sm_context:"dopesheet",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Time Line",sm_context:"timeline",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Graph Editor",sm_context:"grapheditor",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Drivers",sm_context:"drivers",sm_category:"animation",icon:b280K26,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Nonlinear Animation",sm_context:"nonlinearanimation",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});

        items.push({sm_label:"Text Editor",sm_context:"texteditor",sm_category:"scripting",icon:b280Z9,sm_navmenu:TextEditorNavigationComponent,comp:TextEditorMainComponent});
        //items.push({sm_label:"Script Console",sm_context:"scriptconsole",sm_category:"scripting",icon:b280Z18,sm_navmenu:null,comp:ScriptConsoleMainComponent});
        //items.push({sm_label:"Info",sm_context:"info",sm_category:"scripting",icon:b280Z7,sm_navmenu:null,comp:InfoMainComponent});

        items.push({sm_label:"Outliner",sm_context:"outliner",sm_category:"data",icon:b280Z3,sm_navmenu:null,comp:OutlinerMainComponent});
        items.push({sm_label:"Properties",sm_context:"properties",sm_category:"data",icon:b280Z4,sm_navmenu:null,comp:PropertiesMainComponent});
        //items.push({sm_label:"File Browser",sm_context:"filebrowser",sm_category:"data",icon:b280Z5,sm_navmenu:null,comp:FileBrowserMainComponent});
        items.push({sm_label:"Preferences",sm_context:"preferences",sm_category:"data",icon:b280Z14,sm_navmenu:null,comp:PreferencesMainComponent});
        items = items;

        elementcontent = document.getElementById(idcontent);

        selectview(viewport)
        window.addEventListener('resize', handle_editor_resize);
        handle_editor_resize();
    });

     onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_editor_resize);
    });
</script>

<style>
    .editorscreen{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="editorscreen">
    <EditorHeaderComponent idheader={idheader} viewport={viewport} on:viewport={handle_viewport} items={items}>

    </EditorHeaderComponent>
    <!--<EditorContentComponent viewport={viewport} idheader={idheader}>-->
    <EditorContentComponent idheader={idheader}>
         <!--
        {#if contexteditor != null}
            <svelte:component this={contexteditor}/>
        {/if}
        Fail to load need to rework layout...
        
        
        {#await contexteditor}
            <div> Loading... </div>
        {:then editorcomp}
            <svelte:component this={editorcomp}/>
        {/await}
        -->

        
        {#if viewport === 'access'}
            <AccessMainComponent></AccessMainComponent>
        {/if}
        
        {#if viewport === '3dviewport'}
        <Viewport3DMainComponent />
        {/if}

        {#if viewport === 'logicnodeeditor'}
            <LogicNodeEditorMainComponent />
        {/if}

        {#if viewport === 'texteditor'}
            <TextEditorMainComponent />
        {/if}

        {#if viewport === 'info'}
            <InfoMainComponent />
        {/if}

        {#if viewport === 'outliner'}
            <OutlinerMainComponent />
        {/if}

        {#if viewport === 'properties'}
            <PropertiesMainComponent />
        {/if}

        {#if viewport === 'filebrowser'}
            <FileBrowserMainComponent />
        {/if}

        {#if viewport === 'preferences'}
            <PreferencesMainComponent />
        {/if}

        {#if viewport === 'scriptconsole'}
            <ScriptConsoleMainComponent />
        {/if}
        
    </EditorContentComponent>
</div>