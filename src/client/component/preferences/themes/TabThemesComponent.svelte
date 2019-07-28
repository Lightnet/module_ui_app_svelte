<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../../base/AutoSizeDivComponent.svelte';
    
    import UserInterfaceComponent from "./PrefsUserInterfaceComponent.svelte";
    import TextStyleComponent from "./PrefsTextStyleComponent.svelte";
    import BoneColorSetsComponent from "./PrefsBoneColorSetsComponent.svelte";
    import View3DComponent from "./PrefsView3DComponent.svelte";
    import GraphEditorComponent from "./PrefsGraphEditorComponent.svelte";
    import DopeSheetcomponent from "./PrefsDopeSheetComponent.svelte";
    import NonlinearAnimationComponent from "./PrefsNonlinearAnimationComponent.svelte";
    import UVImageEditorComponent from "./PrefsUVImageEditorComponent.svelte";
    import VideoSequenceEditorComponent from "./PrefsVideoSequenceEditorComponent.svelte";
    import TextEditorComponent from "./PrefsTextEditorComponent.svelte";
    import LogicNodeEditorComponent from "./PrefsLogicNodeEditorComponent.svelte";
    import NodeEditorComponent from "./PrefsNodeEditorComponent.svelte";
    import PropertiesComponent from "./PrefsPropertiesComponent.svelte";
    import OutlinerComponent from "./PrefsOutlinerComponent.svelte";
    import PreferencesComponent from "./PrefsPreferencesComponent.svelte";
    import InfoComponent from "./PrefsInfoComponent.svelte";
    import FileBrowserComponent from "./PrefsFileBrowserComponent.svelte";
    import JavascriptConsoleComponent from "./PrefsJavascriptConsoleComponent.svelte";
    import MovieClipEditorComponent from "./PrefsMovieClipEditorComponent.svelte";
    import TopBarComponent from "./PrefsTopBarComponent.svelte";
    import StatusBarComponent from "./PrefsStatusBarComponent.svelte";

    //import mjs from '../../../mjs.js';
    import {PrefsThemesConfig} from '../../../mjs.js';
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
    <JavascriptConsoleComponent bCollapse={config.isjavascriptconsole} on:click={()=>{  config.isjavascriptconsole =!config.isjavascriptconsole }} />
    <MovieClipEditorComponent  bCollapse={config.ismovieclipeditor} on:click={()=>{  config.ismovieclipeditor =!config.ismovieclipeditor }} />
    <TopBarComponent bCollapse={config.istopbar} on:click={()=>{  config.istopbar =!config.istopbar }} />
    <StatusBarComponent bCollapse={config.isstatusbar} on:click={()=>{  config.isstatusbar =!config.isstatusbar }} />
</AutosizeDivComponent>