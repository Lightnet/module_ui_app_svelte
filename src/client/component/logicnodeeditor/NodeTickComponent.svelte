<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import NodeComponent from "./NodeComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let nodename = "Tick";
    export let nodetype;
    let idcomponent = "node" + generateId(20);
    //let nodeid;
    let elcomponent;
    export let px;
    export let py;
    export let nheight = 60;
    export let nwidth = 100;
    //export let draw;
    export let svg;
    export let panZoom;
    //out and in pin connector
    let pinins = [];
    let pinouts = [];

    function tick(){
        //console.log("tick");
            if(pinouts[0].connectors.length == 1){
                let data = {
                action:"run",
                nodeid:pinouts[0].connectors[0]
            }
            window.dispatchEvent(new CustomEvent('nodecomponent',{detail:data}));
        }
    }

    function handle_tick(){
        tick();
    }

    function addpinin(args){
        if(args == null){
            args={};
        }
        let index = pinins.length;
        let genid = "pin" + generateId(20);
        pinins.push({
            px:-10,
            py:(index*20 + index * 4),
            idcomponent:genid,
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:false,
            connectors:[]//nodeid,connectorid ???
        });
        pinins = pinins;
    }

    function addpinout(args){
        if(args == null){
            args={};
        }
        let index = pinouts.length;
        let genid = "pin" + generateId(20);
        pinouts.push({
            px:nwidth-10,
            py:(index*20+30),
            idcomponent:genid,
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:true,
            connectors:[]//nodeid,connectorid ???
        });
        pinouts = pinouts;
    }

    function updatepin(e){
        //console.log("NodeTick");
        //console.log("nodid :" + idcomponent);
        //console.log("node pin update?");
        //console.log(e);
        //console.log(e.detail);
        let data = e.detail;
        if(data !=null){
            //console.log(data);
            if(data.action == "add"){
                for(let i=0;i<pinouts.length;i++){
                    if (pinouts[i].idcomponent == data.pinout.id){
                        //console.log("found pin");
                        pinouts[i].connectors.push(data.pinin.nodeid);
                        break;
                    }
                }
            }
        }
        //console.log(pinouts);
    }

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        //pinouts.push({px:90,py:4,idcomponent:generateId(20),nodeid:idcomponent,boutput:true});
        addpinout();
        //pinouts = pinouts;

        window.addEventListener("tick",handle_tick);
        window.addEventListener('updatepin', updatepin);
    });

    onDestroy(()=>{
        window.removeEventListener("tick",handle_tick);
        window.removeEventListener('updatepin', updatepin);
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

    function handle_click(e){
        //console.log("click select node?");
        /*
        console.log("//=================")
        console.log("pinins:"+ pinins.length + " pinouts:" + pinouts.length);
        for(let i=0;i<pinins.length;i++){
            console.log("pinins Index:" + i + " Count:" + pinins[i].connectors.length);
        }
        for(let i=0;i<pinouts.length;i++){
            console.log("pinouts Index:" + i + " Count:" + pinouts[i].connectors.length);
        }
        */
    }

</script>
<style>

</style>
<NodeComponent
    idcomponent={idcomponent}
    nodename={nodename}
    panZoom={panZoom}
    px={px}
    py={py}
    svg={svg} 
    nwidth={nwidth} 
    nheight={nheight} 
    on:node={handle_node} 
    on:click={handle_click}
    pinouts={pinouts}
    >

</NodeComponent>