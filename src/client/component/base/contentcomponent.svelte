<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    import Viewport3DComponent from '../viewport3d/viewport3dcomponent.svelte';
    import FileBrowserComponent from '../filebrowser/filebrowsercomponent.svelte';
    import InfoComponent from './infocomponent.svelte';
    import OutlinerComponent from '../outliner/outlinercomponent.svelte';
    import PreferencesComponent from '../preferences/preferencescomponent.svelte';
    import PropertiesComponent from '../properties/propertiescomponent.svelte';
    import TexteditorComponent from '../texteditor/texteditorcomponent.svelte';
    import ScriptConsoleComponent from './scriptconsolecomponent.svelte';
    
    import { generateId } from '../helper/generateid.js';

    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";
    export let idheader;
    let elementheader;
    let idcontent = generateId(20);
    let elementcontent;


    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount")
    });

    function handledivresize(event){
        console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementheader.parentNode;
        elementcontent.style.height = parent.clientHeight - elementheader.clientHeight + 'px';
    }

    afterUpdate(() => {
        //console.log("afterUpdate")
        elementheader = document.getElementById(idheader);
        elementcontent = document.getElementById(idcontent);
        //console.log(elementheader);
        //console.log(elementheader.clientHeight);
        window.addEventListener('resize', handledivresize);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handledivresize);
    });
    
</script>
<style>
    .screen{
        height: calc(100% - 20px);
        width:100%;
    }
</style>
<div id="{idcontent}" class="screen">
    {#if viewport === '3dviewport'}
        <Viewport3DComponent />
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

    
</div>