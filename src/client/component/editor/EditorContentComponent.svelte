<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    /*
    import Viewport3DComponent from '../viewport3d/viewport3dcomponent.svelte';
    import LogicNodeEditorComponent from '../logicnodeeditor/LogicNodeEditorComponent.svelte';
    import TexteditorComponent from '../texteditor/texteditorcomponent.svelte';
    import ScriptConsoleComponent from '../scriptconsole/scriptconsolecomponent.svelte';
    import InfoComponent from '../info/infocomponent.svelte';
    import OutlinerComponent from '../outliner/outlinercomponent.svelte';
    import PropertiesComponent from '../properties/propertiescomponent.svelte';
    import FileBrowserComponent from '../filebrowser/filebrowsercomponent.svelte';
    import PreferencesComponent from '../preferences/preferencescomponent.svelte';
    */
    import { generateId } from '../helper/generateid.js';
    //import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    //export let viewport = "3dviewport";
    export let idheader;
    let elementheader;
    let idcontent = generateId(20);
    let elementcontent;

    onMount(() => {
        //console.log("mount")
        elementheader = document.getElementById(idheader);
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handle_editorcontent_resize);
    });

    function handle_editorcontent_resize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight - elementheader.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener('resize', handle_editorcontent_resize);
    });
    //height: calc(100% - 20px);
</script>
<style>
    .editorcontext{
        height:100% ;
        width:100%;
    }
</style>
<div id="{idcontent}" class="editorcontext">
    <slot></slot>
    <!--
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
        <PreferencesComponent />
    {/if}

    {#if viewport === 'scriptconsole'}
        <ScriptConsoleComponent />
    {/if}
    -->
</div>