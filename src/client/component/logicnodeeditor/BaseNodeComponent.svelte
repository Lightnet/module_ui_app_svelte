<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import NodePinComponent from "./NodePinComponent.svelte";
    import NodeComponent from "./NodeComponent.svelte";
    import SVG from 'svg.js';
    //import 'svg.panzoom.js';
    const dispatch = createEventDispatcher();

    let nodename = "Node";
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
    let bmove = false;
    
    //out and in pin connector
    let pinins = []; 
    let pinouts = [];

    //handle connector event tag check when connect
    function handle_mouseover(e){
        dispatch("node",{id:idcomponent,type:"node",mouse:"over"});
    }

    function handle_mouseout(e){
        dispatch("node",{id:null,type:"node",mouse:"out"});
    }

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
        var pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(element.getScreenCTM().inverse());
    }

    function handle_mousemove(e){
        //let x = e.clientX - e.pageX;
        //console.log(x)
        if(bmove){
            let svgP = svgPoint(svg, e.clientX - px,e.clientY - py);
            tx = svgP.x;
            ty = svgP.y;
        }
    }

    function handle_mousedown(e){
        if(e.button == 0){
            bmove = true;
            let svgP = svgPoint(elcomponent, e.clientX, e.clientY);
            px = svgP.x;
            py = svgP.y;
        }
        window.addEventListener('mouseup',handle_mouseup);
        window.addEventListener('mousemove',handle_mousemove);
    }

    function handle_mouseup(e){
        //console.log(e);
        if(e.button == 0){
            bmove = false;
            //console.log(bmove);
        }
        window.removeEventListener('mouseup',handle_mouseup);
        window.removeEventListener('mousemove',handle_mousemove);
    }

    function setuppin(){
        pinins.push({px:-10,py:20,idcomponent:generateId(20),boutput:false});
        pinins = pinins;

        pinouts.push({px:90,py:20,idcomponent:generateId(20),boutput:true});
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

    //window.dispatchEvent(new Event('resize'));
</script>
<style>
    /* https://stackoverflow.com/questions/34445147/make-svg-text-unselectable */
    /* https://gist.github.com/23maverick23/64b3b587c88697558fac */
    text {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        pointer-events: none;
    }
</style>
<NodeComponent px={px} py={py} svg={svg} on:node={handle_node}>

    <text x="4" y="20" style="stroke: white; fill:white;"> {nodename} </text>

    {#each pinins as pinin}
        <!--{console.log(pinout)}-->
        <NodePinComponent {...pinin} on:node={handle_node}/>
        <!--<NodePinComponent px="100" py="20" on:node={handle_node}/>-->
    {/each}

    {#each pinouts as pinout}
        <!--{console.log(pinout)}-->
        <NodePinComponent {...pinout} on:node={handle_node}/>
        <!--<NodePinComponent px="100" py="20" on:node={handle_node}/>-->
    {/each}
</NodeComponent>