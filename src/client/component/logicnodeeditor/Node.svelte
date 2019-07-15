<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import NodeConnectorComponent from "./NodeConnectorComponent.svelte"
    import SVG from 'svg.js';
    import 'svg.panzoom.js';
    const dispatch = createEventDispatcher();

    let idcomponent = "node" + generateId(20);
    let elcontent;
    let bmove = false;
    //let mx;
    //let my;
    export let px = 0;
    export let py = 0;
    //let el;
    let tx = 0;
    let ty = 0;
    export let draw;
    export let svg;

    let height;
    let width;

    function handle_mouseclick(e){
        //console.log(e);
        //console.log("test");
    }

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
        var pt = svg.createSVGPoint();
        pt.x = x + svg.getScreenCTM().e;//clientX + offset svg element position
        pt.y = y + svg.getScreenCTM().f;
        //console.log(pt);
        //console.log(svg.getScreenCTM())
        return pt.matrixTransform(element.getScreenCTM().inverse());
        //return pt.matrixTransform(element.getScreenCTM());
    }

    function handle_mousedown(e){
        if(e.button == 0){
            bmove = true;
            let svgP = svgPoint(elcontent, e.clientX, e.clientY);
            //console.log(svgP);
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

    function handle_mouseover(e){
        //console.log("over");
        dispatch("node",{id:idcomponent,type:"node",mouse:"over"});
    }

    function handle_mouseout(e){
        //console.log("out");
        dispatch("node",{id:idcomponent,type:"node",mouse:"out"});
    }

    function handle_mousemove(e){
        //let x = e.clientX - e.pageX;
        //console.log(x)
        if(bmove){
            //let scale = draw.zoom();
            let scale = 1;
            //tx =  (e.clientX - px) ;
            //ty =  (e.clientY - py) ;
            //tx =  (e.clientX - px) * (scale);
            //ty =  (e.clientY - py) * (scale);

            //let newCoords = svg.viewbox().transform(new SVG.Matrix().translate(e.clientX, e.clientY))
            //console.log(newCoords)
            let offsetx = 0;//svg.getScreenCTM().e;
            let offsety = 0;//svg.getScreenCTM().f;

            //let svgP = svgPoint(svg, (e.clientX - px - offsetx ) * scale, (e.clientY - py - offsety) * scale);
            let svgP = svgPoint(svg, (e.clientX - px - offsetx ) * scale, (e.clientY - py - offsety) * scale);
            //console.log(svgP);
            tx = svgP.x;
            ty = svgP.y;


            //console.log(draw);
            //console.log(svg.getScreenCTM())
        }
        //console.dir(svg);
        //console.dir(draw);
    }

    onMount(() => {
        elcontent = document.getElementById(idcomponent);
        tx = px;
        ty = py;
        //draw = SVG(svg);
        //console.log(draw);
        //console.log(elcontent);
        //console.dir(svg);
    });

    onDestroy(()=>{

    });

    function handle_nodeconnecter(e){
        dispatch('node',e.detail);
    }

</script>
<style>

</style>
<g id="{idcomponent}" transform="translate({tx} {ty})"
    >
    <!--
    <polygon id="target1" points="83.97 253.74 87.35 260.6 94.91 261.69 89.44 267.03 90.73 274.56 83.97 271.01 77.2 274.56 78.49 267.03 73.02 261.69 80.58 260.6 83.97 253.74" style="fill: gray"/>
    -->
    <rect 
        id="Sqaure"
        x="0"
        y="0"
        width="100" 
        height="100" 
        fill="#333" 
        on:click={handle_mouseclick} 
        on:mousedown={handle_mousedown}
        on:mouseover={handle_mouseover}
        on:mouseout={handle_mouseout}
        >
    </rect>

    <NodeConnectorComponent px="100" py="20" on:node={handle_nodeconnecter} />

    <text x="4" y="20" style="stroke: white; fill:white;"> Node </text>
</g>