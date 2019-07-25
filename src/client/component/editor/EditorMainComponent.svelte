<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    import EditorHeaderComponent from './EditorHeaderComponent.svelte';
    import EditorContentComponent from './EditorContentComponent.svelte';

    import LogicNodeNavigationComponent from "../logicnodeeditor/LogicNodeNavigationComponent.svelte";
    import TextEditorNavigationComponent from "../texteditor/TextEditorNavigationComponent.svelte";
    import AccessNavigationComponent from "../access/AccessNavigationComponent.svelte";

    import AccessMainComponent from '../access/AccessMainComponent.svelte';
    import Viewport3DComponent from '../viewport3d/viewport3dcomponent.svelte';
    import LogicNodeEditorComponent from '../logicnodeeditor/LogicNodeEditorComponent.svelte';
    import TexteditorComponent from '../texteditor/texteditorcomponent.svelte';
    import ScriptConsoleComponent from '../scriptconsole/scriptconsolecomponent.svelte';
    import InfoComponent from '../info/infocomponent.svelte';
    import OutlinerComponent from '../outliner/outlinercomponent.svelte';
    import PropertiesComponent from '../properties/propertiescomponent.svelte';
    import FileBrowserComponent from '../filebrowser/filebrowsercomponent.svelte';
    import PreferencesMainComponent from '../preferences/PreferencesMainComponent.svelte';

    import b280K26 from '../icon/b280K26.svelte';
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
    let contexteditor = Viewport3DComponent;


    function selectview(view){
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == view){
                console.log(view);
                contexteditor = items[i].comp;
                break;
            }
        }
    }

    function handle_viewport(event){
        //console.log("viewport:")
        console.log(event.detail);
        viewport = event.detail;
        /*
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == event.detail){
                contexteditor = items[i].comp;
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
        items.push({sm_label:"Access",sm_context:"access",sm_category:"general",icon:b280Z1,sm_navmenu:null,comp:AccessMainComponent});
        items.push({sm_label:"Viewport 3D",sm_context:"3dviewport",sm_category:"general",icon:b280Z1,sm_navmenu:null,comp:Viewport3DComponent});
        //items.push({sm_label:"imageeditor",sm_context:"imageeditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"uveditor",sm_context:"uveditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"shadereditor",sm_context:"shadereditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"compositor",sm_context:"compositor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        items.push({sm_label:"Logic Node Editor",sm_context:"logicnodeeditor",sm_category:"general",icon:b280Z16,sm_navmenu:LogicNodeNavigationComponent,comp:LogicNodeEditorComponent});
        //items.push({sm_label:"Texture Node Editor",sm_context:"texturenodeeditor",sm_category:"general,icon:null",sm_navmenu:null,comp:null});
        //items.push({sm_label:"Video Sequencer",sm_context:"videosequencer",sm_category:"general",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Movie Clip Editor",sm_context:"movieclipeditor",sm_category:"general",icon:null,sm_navmenu:null,comp:null});

        //items.push({sm_label:"Dope Sheet",sm_context:"dopesheet",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Time Line",sm_context:"timeline",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Graph Editor",sm_context:"grapheditor",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Drivers",sm_context:"drivers",sm_category:"animation",icon:b280K26,sm_navmenu:null,comp:null});
        //items.push({sm_label:"Nonlinear Animation",sm_context:"nonlinearanimation",sm_category:"animation",icon:null,sm_navmenu:null,comp:null});

        items.push({sm_label:"Text Editor",sm_context:"texteditor",sm_category:"scripting",icon:b280Z9,sm_navmenu:TextEditorNavigationComponent,comp:TexteditorComponent});
        items.push({sm_label:"Script Console",sm_context:"scriptconsole",sm_category:"scripting",icon:b280Z18,sm_navmenu:null,comp:ScriptConsoleComponent});
        items.push({sm_label:"Info",sm_context:"info",sm_category:"scripting",icon:b280Z7,sm_navmenu:null,comp:InfoComponent});

        items.push({sm_label:"Outliner",sm_context:"outliner",sm_category:"data",icon:b280Z3,sm_navmenu:null,comp:OutlinerComponent});
        items.push({sm_label:"Properties",sm_context:"properties",sm_category:"data",icon:b280Z4,sm_navmenu:null,comp:PropertiesComponent});
        items.push({sm_label:"File Browser",sm_context:"filebrowser",sm_category:"data",icon:b280Z5,sm_navmenu:null,comp:FileBrowserComponent});
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
    <EditorHeaderComponent idheader={idheader} viewport={viewport} on:viewport={handle_viewport} items={items}></EditorHeaderComponent>
    <EditorContentComponent viewport={viewport} idheader={idheader}>
        <!--
        {#await contexteditor}
            <div> Loading... </div>
        {:then value}
            <svelte:component this={value}/>
        {/await}
        -->
        {#if viewport === '3dviewport'}
        <Viewport3DComponent />
        {/if}

        {#if viewport === 'logicnodeeditor'}
            <LogicNodeEditorComponent />
        {/if}

        {#if viewport === 'texteditor'}
            <TexteditorComponent />
        {/if}

        {#if viewport === 'info'}
            <InfoComponent />
        {/if}

        {#if viewport === 'outliner'}
            <OutlinerComponent />
        {/if}

        {#if viewport === 'properties'}
            <PropertiesComponent />
        {/if}

        {#if viewport === 'filebrowser'}
            <FileBrowserComponent />
        {/if}

        {#if viewport === 'preferences'}
            <PreferencesMainComponent />
        {/if}

        {#if viewport === 'scriptconsole'}
            <ScriptConsoleComponent />
        {/if}
    </EditorContentComponent>
</div>