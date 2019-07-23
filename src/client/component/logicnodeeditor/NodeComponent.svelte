<script>
    //https://meta.wikimedia.org/wiki/SVG_fonts
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import NodePinComponent from "./NodePinComponent.svelte";
    import SVG from 'svg.js';
    //import 'svg.panzoom.js';
    const dispatch = createEventDispatcher();

    export let idcomponent;// = "node" + generateId(20);
    let elcomponent;
    export let nodename = "Node Name";
    export let px = 0;
    export let py = 0;
    let tx = 0;
    let ty = 0;
    export let nheight = 100;
    export let nwidth = 100;
    
    export let draw;
    export let svg;
    export let panZoom;
    let bmove = false;

    let headercolor = "black";
    let panelcolor = "#383838"
    let fontcolor = "white";
    let fontsize = 12;
    let fontfamily = "Courier New";

    
    //out and in pin connector
    export let pinins = [];
    export let pinouts = [];

    //handle connector event tag check when connect
    function handle_mouseover(e){
        dispatch("node",{id:idcomponent,type:"nodeblock",mouse:"over"});
    }

    function handle_mouseout(e){
        dispatch("node",{id:idcomponent,type:"nodeblock",mouse:"out"});
    }

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
        var pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(element.getScreenCTM().inverse());
    }

    function screenToWorld(pos) {
        var rect = svg.getBoundingClientRect();
        var pan = panZoom.getPan();
        var zoom = panZoom.getZoom();
        //console.log(rect);
        //console.log(pan);
        //console.log(zoom);

        return { 
            x: (((pos.x - rect.left) - pan.x) / zoom), 
            y: (((pos.y - rect.top) - pan.y) / zoom)
        };
    };

    function handle_mousemove(e){
        //let x = e.clientX - e.pageX;
        //console.log(x)
        if(bmove){
            //let svgP = svgPoint(svg, e.clientX - px,e.clientY - py);
            //tx = svgP.x;
            //ty = svgP.y;
            let svgP = screenToWorld({x:e.clientX,y:e.clientY});
            tx = svgP.x + px;
            ty = svgP.y + py;
            dispatch("node",{id:idcomponent,type:"nodeblock",mouse:"move"})
        }
    }

    function handle_mousedown(e){
        if(e.button == 0){
            bmove = true;
            //let svgP = svgPoint(elcomponent, e.clientX, e.clientY);
            //px = svgP.x;
            //py = svgP.y;
            let g = SVG.get(idcomponent);
            let svgP = screenToWorld({x:e.clientX,y:e.clientY});
            //offset drag
            px = g.x() - svgP.x;
            py = g.y() - svgP.y;

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
    });

    onDestroy(()=>{

    });

    function handle_node(e){
        dispatch("node",e.detail);
    }

    function handle_click(e){
        dispatch("click");
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
<g id="{idcomponent}" transform="translate({tx} {ty})">
    <rect 
        x="0"
        y="0"
        width="{nwidth}" 
        height="{nheight}" 
        fill="{panelcolor}"
        on:click={handle_click}
        on:mousedown={handle_mousedown}
        on:mouseover={handle_mouseover}
        on:mouseout={handle_mouseout}
        >
    </rect>
    <!--<text x="4" y="20" style="stroke: white; fill:white;"> Node </text>-->
    <rect 
        x="0"
        y="0"
        fill="{headercolor}"
        width="{nwidth}" 
        height="22"
        on:click={handle_click}
        on:mousedown={handle_mousedown}
        on:mouseover={handle_mouseover}
        on:mouseout={handle_mouseout}
        >
    </rect>
    <!-- text x="4" y="20" -->
    <text x="{nwidth/2}" y="16" font-family="{fontfamily}" font-size="{fontsize}" text-anchor="middle" style="stroke:{fontcolor};"> {nodename} </text>


    {#each pinins as pinin}
        <!--{console.log(pinout)}-->
        <NodePinComponent svg={svg} panZoom={panZoom} {...pinin} on:node={handle_node}/>
        <!--<NodePinComponent px="100" py="20" on:node={handle_node}/>-->
    {/each}
    {#each pinouts as pinout}
        <!--{console.log(pinout)}-->
        <NodePinComponent svg={svg} panZoom={panZoom} {...pinout} on:node={handle_node}/>
        <!--<NodePinComponent px="100" py="20" on:node={handle_node}/>-->
    {/each}

    <slot>
        <text x="4" y="20" style="stroke:{fontcolor};"> {nodename} </text>
    </slot>

    <!--<NodePinComponent px="100" py="20" on:node={handle_node}/>-->
</g>