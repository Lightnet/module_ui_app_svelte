<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import LogicNodeEditorNavComponent from "../logicnodeeditor/logicnodeeditornavcomponent.svelte";

    import EditorNavmenuComponent from './editornavmenucomponent.svelte';
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
    
    export let idheader;
    export let viewport = "3dviewport";
    let navmenu;
    let items = [];

    onMount(() => {
        items.push({sm_label:"Viewport 3D",sm_context:"3dviewport",sm_category:"general",icon:b280Z1,sm_navmenu:null});
        //items.push({sm_label:"imageeditor",sm_context:"imageeditor",sm_category:"general",icon:null,sm_navmenu:null});
        //items.push({sm_label:"uveditor",sm_context:"uveditor",sm_category:"general",icon:null,sm_navmenu:null});
        //items.push({sm_label:"shadereditor",sm_context:"shadereditor",sm_category:"general",icon:null,sm_navmenu:null});
        //items.push({sm_label:"compositor",sm_context:"compositor",sm_category:"general",icon:null,sm_navmenu:null});
        items.push({sm_label:"Logic Node Editor",sm_context:"logicnodeeditor",sm_category:"general",icon:b280Z16,sm_navmenu:LogicNodeEditorNavComponent});
        //items.push({sm_label:"Texture Node Editor",sm_context:"texturenodeeditor",sm_category:"general,icon:null",sm_navmenu:null});
        //items.push({sm_label:"Video Sequencer",sm_context:"videosequencer",sm_category:"general",icon:null,sm_navmenu:null});
        //items.push({sm_label:"Movie Clip Editor",sm_context:"movieclipeditor",sm_category:"general",icon:null,sm_navmenu:null});

        //items.push({sm_label:"Dope Sheet",sm_context:"dopesheet",sm_category:"animation",icon:null,sm_navmenu:null});
        //items.push({sm_label:"Time Line",sm_context:"timeline",sm_category:"animation",icon:null,sm_navmenu:null});
        //items.push({sm_label:"Graph Editor",sm_context:"grapheditor",sm_category:"animation",icon:null,sm_navmenu:null});
        items.push({sm_label:"Drivers",sm_context:"drivers",sm_category:"animation",icon:b280K26,sm_navmenu:null});
        //items.push({sm_label:"Nonlinear Animation",sm_context:"nonlinearanimation",sm_category:"animation",icon:null,sm_navmenu:null});

        items.push({sm_label:"Text Editor",sm_context:"texteditor",sm_category:"scripting",icon:b280Z9,sm_navmenu:null});
        items.push({sm_label:"Script Console",sm_context:"scriptconsole",sm_category:"scripting",icon:b280Z18,sm_navmenu:null});
        items.push({sm_label:"Info",sm_context:"info",sm_category:"scripting",icon:b280Z7,sm_navmenu:null});

        items.push({sm_label:"Outliner",sm_context:"outliner",sm_category:"data",icon:b280Z3,sm_navmenu:null});
        items.push({sm_label:"Properties",sm_context:"properties",sm_category:"data",icon:b280Z4,sm_navmenu:null});
        items.push({sm_label:"File Browser",sm_context:"filebrowser",sm_category:"data",icon:b280Z5,sm_navmenu:null});
        items.push({sm_label:"Preferences",sm_context:"preferences",sm_category:"data",icon:b280Z14,sm_navmenu:null});
        items = items;
        selectviewnavmenu(viewport);
    });

    function selectviewnavmenu(view){
        //console.log(view);
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == view){
                navmenu = items[i].sm_navmenu;
                break;
            }
        }
    }

    onDestroy(() => {
        items = [];
    });

    function handle_viewport(e){
        dispatch('viewport', e.detail);
        //console.log(e.detail);
        for(let i=0;i<items.length;i++){
            if(items[i].sm_context == e.detail){
                navmenu = items[i].sm_navmenu;
                break;
            }
        }
    }

</script>

<style>
    .navbar {
        overflow: hidden;
        background-color: #3b3b3b;
        font-family: Arial, Helvetica, sans-serif;
        width:100%;
    }

    .navbar a {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar a:hover {
        background-color: #424242;
    }

    .navbar a:hover {
        background-color: #424242;
    }
    
</style>

<div id="{idheader}" class="navbar">
    <a href="/#">Editor</a>
    <EditorNavmenuComponent items={items} on:viewport={handle_viewport} viewport={viewport}></EditorNavmenuComponent>
    {#if navmenu != null}
        <svelte:component this={navmenu} />
    {/if}
</div>