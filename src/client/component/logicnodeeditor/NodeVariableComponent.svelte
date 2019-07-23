<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import NodePinComponent from "./NodePinComponent.svelte";
    import NodeComponent from "./NodeComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let nodename = "Variable";
    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    export let nheight = 60;
    export let nwidth = 100;
    //let color ="#FFA07A";
    //export let draw;
    export let svg;
    export let panZoom;
    //out and in pin connector
    let pinins = []; 
    let pinouts = [];

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        pinouts.push({px:90,py:30,idcomponent:generateId(20),nodeid:idcomponent,boutput:true});
        pinouts = pinouts;
    });

    onDestroy(()=>{

    });

    function handle_node(e){
        dispatch("node",e.detail);
        if(e.detail.mouse !=null){
            if(e.detail.mouse == "move"){
                window.dispatchEvent(new Event('updateconnectors'));
            }
            //console.log("update move???")
        }
    }

</script>
<style>
    
</style>
<NodeComponent
    idcomponent={idcomponent}
    nodename={nodename}
    svg={svg}
    panZoom={panZoom}
    px={px} 
    py={py} 
    nwidth={nwidth} 
    nheight={nheight} 
    on:node={handle_node}
    pinouts={pinouts}
    >

</NodeComponent>