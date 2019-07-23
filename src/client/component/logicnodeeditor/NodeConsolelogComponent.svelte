<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import NodeComponent from "./NodeComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let nodename = "Console.log()";
    export let nodetype;
    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    export let nheight = 100;
    export let nwidth = 128;
    let color ="#FFA07A";
    //export let draw;
    export let svg;
    export let panZoom;
    //out and in pin connector
    let pinins = []; 
    let pinouts = [];

    function handle_nodecomponent(e){
        //console.log(e);
        if(e.detail !=null){
            if(e.detail.action == "run"){
                if(e.detail.nodeid == idcomponent){
                    execute();
                }
            }
        }
    }

    function execute(){
        console.log("running tick from block!");
    }


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
        window.addEventListener('updatepin', updatepin);
        window.addEventListener('nodecomponent', handle_nodecomponent);
    });

    function addpinin(args){
        let index = pinins.length;
        let genid = "pin"+generateId(20);
        pinins.push({
            px:-10,
            py:(index*20+30 + index * 4),
            idcomponent:genid,
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:false,
            connectors:[]//nodeid,connectorid ???
        });
        pinins = pinins;
    }

    function addpinout(args){
        let index = pinouts.length;
        let genid = "pin"+generateId(20);
        pinouts.push({
            px:120,
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
        console.log("NodeConsolelog");
        //console.log("nodid :" + idcomponent);
        //console.log("node pin update?");
        //console.log(e);
        //console.log(e.detail);
        let data = e.detail;
        if(data !=null){
            //console.log(data);
            if(data.action == "add"){
                for(let i=0;i<pinins.length;i++){
                    if (pinins[i].idcomponent == data.pinin.id){
                        console.log("found pinin");
                        pinins[i].connectors.push(data.pinout.nodeid);
                        break;
                    }
                }

                for(let i=0;i<pinouts.length;i++){
                    if (pinouts[i].idcomponent == data.pinout.id){
                        console.log("found pinout");
                        pinouts[i].connectors.push(data.pinin.nodeid);
                        break;
                    }
                }
            }
            
        }
        console.log(pinins);
    }

    onDestroy(()=>{
        //window.removeEventListener("tick",handle_tick);
        window.removeEventListener('updatepin', updatepin);
        window.removeEventListener('nodecomponent', handle_nodecomponent);
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
    panZoom={panZoom}
    px={px} 
    py={py} 
    svg={svg} 
    nwidth={nwidth} 
    nheight={nheight} 
    on:node={handle_node} 
    on:click={handle_click}
    nodename={nodename}
    pinins={pinins}
    pinouts={pinouts}
    >

</NodeComponent>