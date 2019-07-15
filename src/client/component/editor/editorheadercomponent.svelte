<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
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
    let items = [];

    onMount(() => {
        items.push({sm_label:"Viewport 3D",sm_context:"3dviewport",sm_category:"general",icon:b280Z1});
        //items.push({sm_label:"imageeditor",sm_context:"imageeditor",sm_category:"general",icon:null});
        //items.push({sm_label:"uveditor",sm_context:"uveditor",sm_category:"general",icon:null});
        //items.push({sm_label:"shadereditor",sm_context:"shadereditor",sm_category:"general",icon:null});
        //items.push({sm_label:"compositor",sm_context:"compositor",sm_category:"general",icon:null});
        items.push({sm_label:"Logic Node Editor",sm_context:"logicnodeeditor",sm_category:"general",icon:b280Z16});
        //items.push({sm_label:"Texture Node Editor",sm_context:"texturenodeeditor",sm_category:"general,icon:null"});
        //items.push({sm_label:"Video Sequencer",sm_context:"videosequencer",sm_category:"general",icon:null});
        //items.push({sm_label:"Movie Clip Editor",sm_context:"movieclipeditor",sm_category:"general",icon:null});

        //items.push({sm_label:"Dope Sheet",sm_context:"dopesheet",sm_category:"animation",icon:null});
        //items.push({sm_label:"Time Line",sm_context:"timeline",sm_category:"animation",icon:null});
        //items.push({sm_label:"Graph Editor",sm_context:"grapheditor",sm_category:"animation",icon:null});
        items.push({sm_label:"Drivers",sm_context:"drivers",sm_category:"animation",icon:b280K26});
        //items.push({sm_label:"Nonlinear Animation",sm_context:"nonlinearanimation",sm_category:"animation",icon:null});

        items.push({sm_label:"Text Editor",sm_context:"texteditor",sm_category:"scripting",icon:b280Z9});
        items.push({sm_label:"Script Console",sm_context:"scriptconsole",sm_category:"scripting",icon:b280Z18});
        items.push({sm_label:"Info",sm_context:"info",sm_category:"scripting",icon:b280Z7});

        items.push({sm_label:"Outliner",sm_context:"outliner",sm_category:"data",icon:b280Z3});
        items.push({sm_label:"Properties",sm_context:"properties",sm_category:"data",icon:b280Z4});
        items.push({sm_label:"File Browser",sm_context:"filebrowser",sm_category:"data",icon:b280Z5});
        items.push({sm_label:"Preferences",sm_context:"preferences",sm_category:"data",icon:b280Z14});
        items = items;

    });

    onDestroy(() => {
        items = [];
    });

    function handle_viewport(e){
        dispatch('viewport', e.detail);
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

    .dropdown {
        float: left;
        overflow: hidden;
    }

    .dropdown .dropbtn {
        cursor: pointer;
        font-size: 12px;
        border: none;
        outline: none;
        color: white;
        padding: 4px 4px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
    }

    .navbar a:hover, .dropdown:hover .dropbtn, .dropbtn:focus {
        background-color: #424242;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #333;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        font-size: 12px;
        padding: 4px 4px;
        text-decoration: none;
        display: block;
        text-align: left;
        color: white;
    }

    .dropdown-content a:hover {
        background-color: #424242;
    }

    .show {
        display: block;
    }

</style>

<div id="{idheader}" class="navbar">
    <a href="/#">Editor</a>
    <EditorNavmenuComponent items={items} on:viewport={handle_viewport} viewport={viewport}></EditorNavmenuComponent>
</div>