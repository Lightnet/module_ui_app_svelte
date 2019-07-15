<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import NodeConnectorComponent from "./NodeConnectorComponent.svelte"

    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px = 0;
    export let py = 0;
    //let height;
    //let width;
    let color ="#FFA07A";
    export let draw;
    export let svg;

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
    });

    onDestroy(()=>{

    });

    function handle_nodeconnecter(e){
        dispatch("node",e);
    }

</script>
<style>

</style>
<g id="{idcomponent}" transform="translate({px} {py})">
    <rect 
        x="0"
        y="0"
        width="100" 
        height="100" 
        fill="{color}"
        >
    </rect>

    <NodeConnectorComponent on:node={handle_nodeconnecter}/>
</g>