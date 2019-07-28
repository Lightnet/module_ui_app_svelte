<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../../base/AutoSizeDivComponent.svelte';
    
    import DisplayComponent from "./PrefsDisplayComponent.svelte";
    import EditorComponent from "./PrefsEditorComponent.svelte";
    import MenusComponent from "./PrefsMenusComponent.svelte";
    import TextRenderComponent from "./PrefsTextRenderComponent.svelte";
    import TranslationComponent from "./PrefsTranslationComponent.svelte";

    import mjs from '../../../mjs.js';

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