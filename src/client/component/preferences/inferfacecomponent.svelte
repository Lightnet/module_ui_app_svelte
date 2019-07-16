<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import mjs from '../../mjs.js';
    import DisplayComponent from "./interface/editorcomponent.svelte";
    import EditorComponent from "./interface/editorcomponent.svelte";
    import MenusComponent from "./interface/menuscomponent.svelte";
    import TextRenderComponent from "./interface/textrendercomponent.svelte";
    import TranslationComponent from "./interface/translationcomponent.svelte";

    //const dispatch = createEventDispatcher();
    
    //onMount(() => {
        //console.log("mount")
    //});

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});
</script>

<style>

</style>

<AutosizeDivComponent>
    <DisplayComponent />
    <EditorComponent />
    <TranslationComponent />
    <TextRenderComponent />
    <MenusComponent />
</AutosizeDivComponent>