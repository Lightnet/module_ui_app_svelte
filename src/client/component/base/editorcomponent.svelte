<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_Mouseregion } from '../../stores.js';

    import mjs from '../../mjs.js';

    import EditorHeaderComponent from './editorheadercomponent.svelte';
    import ContentComponent from './contentcomponent.svelte';

    const dispatch = createEventDispatcher();

    let viewport = "3dviewport";

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

    function handle_viewport(event){
        //console.log("viewport:")
        //console.log(event.detail);
        viewport = event.detail;
    }
    

</script>

<style>

</style>
<div>
    <EditorHeaderComponent on:viewport={handle_viewport}></EditorHeaderComponent>
    <ContentComponent viewport={viewport}></ContentComponent>
</div>