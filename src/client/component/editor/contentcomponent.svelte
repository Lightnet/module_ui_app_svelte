<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    import Viewport3DComponent from '../viewport3d/viewport3dcomponent.svelte';
    import FileBrowserComponent from '../filebrowser/filebrowsercomponent.svelte';
    import InfoComponent from '../base/infocomponent.svelte';
    import OutlinerComponent from '../outliner/outlinercomponent.svelte';
    import PreferencesComponent from '../preferences/preferencescomponent.svelte';
    import PropertiesComponent from '../properties/propertiescomponent.svelte';
    import TexteditorComponent from '../texteditor/texteditorcomponent.svelte';
    import ScriptConsoleComponent from '../base/scriptconsolecomponent.svelte';
    
    import { generateId } from '../helper/generateid.js';
    //import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";
    export let idheader;
    let elementheader;
    let idcontent = generateId(20);
    let elementcontent;

    onMount(() => {
        //console.log("mount")
        window.addEventListener('resize', handledivresize);
    });

    function handledivresize(event){
        //console.log("resize");
        //let editorheadercompoent = document.querySelector('EditorHeaderComponent');
        //console.log(editorheadercompoent);
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight - elementheader.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    afterUpdate(() => {
        //console.log("afterUpdate")
        elementheader = document.getElementById(idheader);
        elementcontent = document.getElementById(idcontent);
        //console.log(elementheader);
        //console.log(elementheader.clientHeight);
        handledivresize();
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handledivresize);
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