<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import NodePinComponent from "./NodePinComponent.svelte";
    import NodeComponent from "./NodeComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let nodename = "Console.log()";
    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    export let nheight = 100;
    export let nwidth = 128;
    let color ="#FFA07A";
    //export let draw;
    export let svg;
    //out and in pin connector
    let pinins = []; 
    let pinouts = [];

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        //pinins.push({px:-10,py:30,idcomponent:generateId(20),nodeid:idcomponent,boutput:false});
        //pinins.push({px:-10,py:60,idcomponent:generateId(20),boutput:false});
        //pinins = pinins;
        addpinin({
            pintype:"flow"
        });
        addpinin({
            pintype:"string"
        });

        //pinouts.push({px:120,py:30,idcomponent:generateId(20),nodeid:idcomponent,boutput:true});
        addpinout({
            pintype:"flow"
        });
        //pinouts = pinouts;
    });

    function addpinin(args){
        let index = pinins.length;
        let genid = generateId(20);
        pinins.push({
            px:-10,
            py:(index*20+30 + index * 4),
            idcomponent:genid,
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:false
        });
        pinins = pinins;
    }

    function addpinout(args){
        let index = pinouts.length;
        let genid = generateId(20);
        pinouts.push({
            px:120,
            py:(index*20+30),
            idcomponent:genid,
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:true
        });
        pinouts = pinouts;
    }

    onDestroy(()=>{
        //window.removeEventListener("tick",handle_tick);
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
<NodeComponent idcomponent={idcomponent} px={px} py={py} svg={svg} nwidth={nwidth} nheight={nheight} on:node={handle_node}>
    <text x="4" y="20" style="stroke: white; fill:white;"> {nodename} </text>
    {#each pinins as pinin}
        <NodePinComponent {...pinin} on:node={handle_node}/>
    {/each}
    {#each pinouts as pinout}
        <NodePinComponent {...pinout} on:node={handle_node}/>
    {/each}
</NodeComponent>