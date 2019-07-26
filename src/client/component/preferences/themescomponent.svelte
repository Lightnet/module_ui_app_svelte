<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/AlignRegionComponent.svelte';
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

    import {PrefsThemesConfig} from '../../mjs.js';
    let config;

    const PrefsThemesConfigUnsubscribe = PrefsThemesConfig.subscribe(value => {
		//console.log(value);
		config = value;
    });

    //const dispatch = createEventDispatcher();
    
    //onMount(() => {
        //console.log("mount")
    //});

    afterUpdate(()=>{
        //console.log("changes...???");
        PrefsThemesConfig.set(config);
    })

    onDestroy(() => {
        //console.log("onDestroy");
        PrefsThemesConfigUnsubscribe();
    });

    function handle_click(e){
        console.log("click?");
        PrefsThemesConfig.set(config);
        console.log(config);
    }
    
</script>

<style>

</style>

<AutosizeDivComponent>
    <UserInterfaceComponent bCollapse={config.isuserinferface} on:click={()=>{  config.isuserinferface =!config.isuserinferface }}/>
    <TextStyleComponent bCollapse={config.istextstyle} on:click={()=>{  config.istextstyle =!config.istextstyle }} />
    <BoneColorSetsComponent bCollapse={config.isbonecolorsets} on:click={()=>{  config.isbonecolorsets =!config.isbonecolorsets }} />
    <View3DComponent bCollapse={config.is3dview} on:click={()=>{  config.is3dview =!config.is3dview }} />
    <GraphEditorComponent bCollapse={config.isgraphiceditor} on:click={()=>{  config.isgraphiceditor =!config.isgraphiceditor }} />
    <DopeSheetcomponent bCollapse={config.isdopesheet} on:click={()=>{  config.isdopesheet =!config.isdopesheet }} />
    <NonlinearAnimationComponent bCollapse={config.isnonlinearanimation} on:click={()=>{  config.isnonlinearanimation =!config.isnonlinearanimation }} />
    <UVImageEditorComponent bCollapse={config.isuvimageeditor} on:click={()=>{  config.isuvimageeditor =!config.isuvimageeditor }} />
    <VideoSequenceEditorComponent bCollapse={config.isvideosquenceseditor} on:click={()=>{  config.isvideosquenceseditor =!config.isvideosquenceseditor }} />
    <TextEditorComponent bCollapse={config.istexteditor} on:click={()=>{  config.istexteditor =!config.istexteditor }} />
    <LogicNodeEditorComponent bCollapse={config.islogicnodeeditor} on:click={()=>{  config.islogicnodeeditor =!config.islogicnodeeditor }}  />
    <NodeEditorComponent bCollapse={config.isnodeeditor} on:click={()=>{  config.isnodeeditor =!config.isnodeeditor }} />
    <PropertiesComponent bCollapse={config.isproperties} on:click={()=>{  config.isproperties =!config.isproperties }} />
    <OutlinerComponent bCollapse={config.isontliner} on:click={()=>{  config.isontliner =!config.isontliner }} />
    <PreferencesComponent bCollapse={config.ispreferences} on:click={()=>{  config.ispreferences =!config.ispreferences }} />
    <InfoComponent bCollapse={config.isinfo} on:click={()=>{  config.isinfo =!config.isinfo }} />
    <FileBrowserComponent  bCollapse={config.isfilebrowser} on:click={()=>{  config.isfilebrowser =!config.isfilebrowser }} />
    <JavascriptConolesComponent bCollapse={config.isjavascriptconsole} on:click={()=>{  config.isjavascriptconsole =!config.isjavascriptconsole }} />
    <MovieClipEditorComponent  bCollapse={config.ismovieclipeditor} on:click={()=>{  config.ismovieclipeditor =!config.ismovieclipeditor }} />
    <TopBarComponent bCollapse={config.istopbar} on:click={()=>{  config.istopbar =!config.istopbar }} />
    <StatusBarComponent bCollapse={config.isstatusbar} on:click={()=>{  config.isstatusbar =!config.isstatusbar }} />
</AutosizeDivComponent>