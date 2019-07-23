<script>
    import { onMount, onDestroy, createEventDispatcher, getContext } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import NodeComponent from "./NodeComponent.svelte";
    import SVG from 'svg.js';
    //import 'svg.panzoom.js';
    const dispatch = createEventDispatcher();

    //var answer = getContext('editor');
    //console.log(answer)

    let nodename = "Base Node";
    export let nodetype;
    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px = 0;
    export let py = 0;
    let tx = 0;
    let ty = 0;
    let nheight = 100;
    let nwidth = 100;
    let color ="#333";
    //export let draw;
    export let svg;
    export let panZoom;
    let bmove = false;
    
    //out and in pin connector
    let pinins = []; 
    let pinouts = [];

    function setuppin(){
        //pinins.push({px:-10,py:20,idcomponent:generateId(20),nodeid:idcomponent,boutput:false});
        //pinins = pinins;
        addpinin()
        //pinouts.push({px:90,py:20,idcomponent:generateId(20),nodeid:idcomponent,boutput:true});
        //pinouts = pinouts;
        addpinout()
    }

    function addpinin(args){
        if(args==null){
            args={};
        }
        let index = pinins.length;
        pinins.push({
            px:-10,
            py:(index*20+30 + index * 4),
            idcomponent:generateId(20),
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:false
        });
        pinins = pinins;
    }

    function addpinout(args){
        if(args==null){
            args={};
        }
        let index = pinouts.length;
        pinouts.push({
            px:nwidth - 10,
            py:(index*20+30),
            idcomponent:generateId(20),
            nodeid:idcomponent,
            pintype:args.pintype || "flow",
            boutput:true
        });
        pinouts = pinouts;
    }

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        tx = px;
        ty = py;
        setuppin();
    });

    onDestroy(()=>{

    });

    function handle_node(e){
        dispatch("node",e.detail);
        //console.log("node event...")
        //for(let i=0; i<pinouts.length;i++){
            //console.log(pinouts[i]);
        //}

        //console.log(e.detail);
        if(e.detail.mouse !=null){
            if(e.detail.mouse == "move"){
                window.dispatchEvent(new Event('updateconnectors'));
            }
            //console.log("update move???")
        }
    }
    
</script>
<style>
    /* https://stackoverflow.com/questions/34445147/make-svg-text-unselectable */
    /* https://gist.github.com/23maverick23/64b3b587c88697558fac */
    
</style>
<NodeComponent
    idcomponent={idcomponent}
    svg={svg}
    panZoom={panZoom}  
    px={px} 
    py={py}  
    on:node={handle_node}
    nodename={nodename}
    pinins={pinins}
    pinouts={pinouts}
    >

</NodeComponent>