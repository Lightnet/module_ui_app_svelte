<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import mjs from '../../mjs.js';

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });
    //viewbox="0 0 64 64"
</script>

<style>
    div{
        color: azure;
    }
</style>

<AutosizeDivComponent>
    Tools Component
    

    <svg height="20" with="20" viewBox="0 0 20 20">
        <image height="20" with="20" xlink:href="blender280A1.svg"></image>
    </svg>

    <!--
        xmlns="http://www.w3.org/2000/svg"
    <object 
        title="" 
        data="blender280A1.svg" 
        type="image/svg+xml" 
        width="20"
        height="20"
        >
        <img alt="" src="blender280A1.png" />
    </object>

    <object title="" data="blender280A1.svg" type="image/svg+xml" viewbox="0 0 64 64"></object>
    
    
    <object title="" data="blender280A1.svg" type="image/svg+xml">
        <img alt="" src="blender280A1.jpg" />
    </object>
    -->


</AutosizeDivComponent>