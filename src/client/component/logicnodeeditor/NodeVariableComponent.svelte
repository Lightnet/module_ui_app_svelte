<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import NodePinComponent from "./NodePinComponent.svelte";
    import NodeComponent from "./NodeComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let nodename = "Node";
    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    export let nheight = 30;
    export let nwidth = 100;
    let color ="#FFA07A";
    //export let draw;
    export let svg;
    //out and in pin connector
    let pinins = []; 
    let pinouts = [];

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        pinouts.push({px:90,py:4,idcomponent:generateId(20),boutput:true});
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
    text {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        pointer-events: none;
    }
</style>
<NodeComponent px={px} py={py} svg={svg} nwidth={nwidth} nheight={nheight} on:node={handle_node}>
    <text x="4" y="20" style="stroke: white; fill:white;"> {nodename} </text>
    {#each pinouts as pinout}
        <!--{console.log(pinout)}-->
        <NodePinComponent {...pinout} on:node={handle_node}/>
        <!--<NodePinComponent px="100" py="20" on:node={handle_node}/>-->
    {/each}
</NodeComponent>