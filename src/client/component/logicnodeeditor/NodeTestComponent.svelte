<script>
    //https://github.com/depuits/ned
    //https://codepen.io/osublake/pen/4c3752574267b3a986cb8eee7ccb8c81
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import SVG from 'svg.js';
    //import 'svg.panzoom.js';
    const dispatch = createEventDispatcher();

    export let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px = 0;
    export let py = 0;
    let tx = 0;
    let ty = 0;
    export let nheight = 100;
    export let nwidth = 100;
    export let ncolor ="#333";
    export let draw;
    export let svg;
    export let panZoom;
    let bmove = false;
    //let pt;
    //out and in pin connector
    //let pinins = [];
    //let pinouts = [];

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

    function handle_mousemove(e){
        //console.log(x)
        if(bmove){
            let svgP = screenToWorld({x:e.clientX,y:e.clientY});
            tx = svgP.x + px;
            ty = svgP.y + py;
            //pt = svg.createSVGPoint();
            //var cursorpt =  pt.matrixTransform(elcomponent.getScreenCTM().inverse());
            //console.log(cursorpt);
            dispatch("node",{id:idcomponent,type:"nodeblock",mouse:"move"})
        }
    }

    function handle_mousedown(e){
        //https://stackoverflow.com/questions/29261304/how-to-get-the-click-coordinates-relative-to-svg-element-holding-the-onclick-lis
        if(e.button == 0){
            bmove = true;
            let svgP;
            //console.log(SVG);
            let g = SVG.get(idcomponent);
            svgP = screenToWorld({x:e.clientX,y:e.clientY});
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

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        tx = px;
        ty = py;
        //pt = svg.createSVGPoint();
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

</style>
<g id="{idcomponent}" transform="translate({tx} {ty})">
    <rect 
        x="0"
        y="0"
        width="{nwidth}" 
        height="{nheight}" 
        fill="{ncolor}"
        on:click={handle_click}
        on:mousedown={handle_mousedown}
        on:mouseover={handle_mouseover}
        on:mouseout={handle_mouseout}
        >
    </rect>
    <!--<text x="4" y="20" style="stroke: white; fill:white;"> Node </text>-->
    <slot>
    <text x="4" y="20" style="stroke: white; fill:white;"> Node Name </text>
    </slot>
</g>