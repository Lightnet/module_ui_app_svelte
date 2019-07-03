<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

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

</style>
<div>
    {#if viewport === '3dviewport'}
        <label>Hello 3dviewport</label>
    {/if}

    {#if viewport === 'texteditor'}
        <label>Hello texteditor</label>
    {/if}

    {#if viewport === 'info'}
        <label>Hello info</label>
    {/if}

    {#if viewport === 'outliner'}
        <label>Hello outliner</label>
    {/if}

    {#if viewport === 'Properties'}
        <label>Hello Properties</label>
    {/if}

    {#if viewport === 'filebrowser'}
        <label>Hello filebrowser</label>
    {/if}

    {#if viewport === 'preferences'}
        <label>Hello preferences</label>
    {/if}
</div>