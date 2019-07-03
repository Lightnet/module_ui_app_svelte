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
    
    const dispatch = createEventDispatcher();

    export let viewport = "3dviewport";

    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount")
    });

    afterUpdate(() => {
        //console.log("afterUpdate")
    });

    onDestroy(() => {
        //console.log("onDestroy")
    });
    
</script>
<style>
    .screen{
        height: calc(100% - 20px);
        width:100%;
    }
</style>
<div class="screen">
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

    {#if viewport === 'Properties'}
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