<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import mjs from '../../mjs.js';
    import UserInterfaceComponent from "./themes/userinterfacecomponent.svelte";
    import TextStyleComponent from "./themes/textstylecomponent.svelte";
    import BoneColorSetsComponent from "./themes/bonecolorsetscomponent.svelte";
    import View3DComponent from "./themes/view3dcomponent.svelte";
    import GraphEditorComponent from "./themes/grapheditorcomponent.svelte";
    import DopeSheetcomponent from "./themes/dopesheetcomponent.svelte";
    import NonlinearAnimationComponent from "./themes/nonlinearanimationcomponent.svelte";
    import UVImageEditorComponent from "./themes/uvimageeditorcomponent.svelte";
    import VideoSequenceEditorComponent from "./themes/videosequenceeditorcomponent.svelte";
    import TextEditorComponent from "./themes/texteditorcomponent.svelte";
    import LogicNodeEditorComponent from "./themes/logicnodeeditorcomponent.svelte";
    import NodeEditorComponent from "./themes/nodeeditorcomponent.svelte";
    import PropertiesComponent from "./themes/propertiescomponent.svelte";
    import OutlinerComponent from "./themes/outlinercomponent.svelte";
    import PreferencesComponent from "./themes/preferencescomponent.svelte";
    import InfoComponent from "./themes/infocomponent.svelte";
    import FileBrowserComponent from "./themes/filebrowsercomponent.svelte";
    import JavascriptConolesComponent from "./themes/javascriptconolescomponent.svelte";
    import MovieClipEditorComponent from "./themes/movieclipeditorcomponent.svelte";
    import TopBarComponent from "./themes/topbarcomponent.svelte";
    import StatusBarComponent from "./themes/statusbarcomponent.svelte";

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
    <UserInterfaceComponent />
    <TextStyleComponent />
    <BoneColorSetsComponent />
    <View3DComponent />
    <GraphEditorComponent />
    <DopeSheetcomponent />
    <NonlinearAnimationComponent />
    <UVImageEditorComponent />
    <VideoSequenceEditorComponent />
    <TextEditorComponent />
    <LogicNodeEditorComponent />
    <NodeEditorComponent />
    <PropertiesComponent />
    <OutlinerComponent />
    <PreferencesComponent />
    <InfoComponent />
    <FileBrowserComponent />
    <JavascriptConolesComponent />
    <MovieClipEditorComponent />
    <TopBarComponent />
    <StatusBarComponent />

</AutosizeDivComponent>