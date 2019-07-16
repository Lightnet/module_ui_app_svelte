<script>
    //https://jsbin.com/rupurogawo/edit?html,css,js,output
    //https://codepen.io/xgundam05/pen/KjqJn
    //https://jsbin.com/doyewususu/1/edit?html,css,js,output
    //https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/

    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    //import NodeComponent from './Node.svelte';
    //import NodeComponent from './NodeComponent.svelte';
    import NodeComponent from './BaseNodeComponent.svelte';

    import mjs from '../../mjs.js';
    import SVG from 'svg.js';
    import 'svg.panzoom.js';

    let count = 0;
    
    //const dispatch = createEventDispatcher();
    
    let idcontent = generateId(20);
    let elementcontent;
    let bnode = false;

    let nodetype = "";
    let idconnector = "";
    let idconnector1;
    let idconnector2;

    let point1 = {x:0,y:0};
    let point2 = {x:0,y:0};
    let bline = false;

    let svg;
    let draw;
    let height;
    let width;
    let idsvg = "draw";

    let drawpoint;

    function resetpoint(){
        point1 = {x:0,y:0};
        point2 = {x:0,y:0};
    }

    function handle_logicnodeeditor_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    function handle_mousemove(e){
        if(bline){
            let svgP = svgPoint(svg, e.clientX, e.clientY);
            point2.x = svgP.x;
            point2.y = svgP.y;
        }
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'LOGICNODE'});
    }

    let mouse = {
        x:0,
        y:0
    }

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
        var pt = svg.createSVGPoint();
        pt.x = x ;//+ svg.getScreenCTM().e;//clientX + offset svg element position
        pt.y = y ;//+ svg.getScreenCTM().f;
        //console.log(pt);
        //console.log(svg.getScreenCTM())
        return pt.matrixTransform(element.getScreenCTM().inverse());
        //return pt.matrixTransform(element.getScreenCTM());
    }

    function handle_svgmousemove(e){
        //if(bline){
            //let svgP = svgPoint(svg, e.clientX, e.clientY);
            //point2.x = svgP.x;
            //point2.y = svgP.y;
        //}
        //return false;
    }

    function handle_svgmousedown(e){
        //console.log(e);
        if(e.button == 0){
            //console.log(e)
            //console.log(idconnector1);
            if(nodetype == "connector"){
                idconnector1 = idconnector;
                let svgP = svgPoint(svg, e.clientX, e.clientY);
                //set draw line to dot from mouse down.
                point1.x = svgP.x;
                point1.y = svgP.y;
                point2.x = svgP.x;
                point2.y = svgP.y;
                bline = true;
            }else{
                console.log("clear?");
                resetpoint();
            }
        }
        //window.addEventListener('mousemove',handle_svgmousemove); //odd bug over and out
        window.addEventListener('mouseup',handle_svgmouseup);
    }

    function checknodepoints(){
        //if(idconnector2.length)
        if((idconnector1 !=null)&&(idconnector2 !=null)){
            //console.log(idconnector1.length);
            //console.log(idconnector2.length);
            //console.log("pass");
            idconnector1 = null;
            idconnector2 = null;
        }else{
            //console.log("fail");
            //console.log(idconnector1);
            //console.log(idconnector2);
            idconnector1 = null;
            idconnector2 = null;
        }
    }

    function handle_svgmouseup(e){
        //e.preventDefault();
        if(e.button == 0){
            //console.log(e)
            if(nodetype == "connector"){
                idconnector2 = idconnector;
                //console.log(idconnector2);
                //console.log(idconnector);
                let svgP = svgPoint(svg, e.clientX, e.clientY);
                point2.x = svgP.x;
                point2.y = svgP.y;
                bline = false;
                checknodepoints();
            }
        }
        //window.removeEventListener('mousemove',handle_svgmousemove);
        window.removeEventListener('mouseup',handle_svgmouseup);
    }

    function handle_svgmousewheel(e){
        //console.log(e)
    }

    function checkpanmove(){
        if(bnode){
            //SVG('drawing').panZoom(false);
            draw.panZoom(false);
            //console.log("false");
        }else{
            //SVG('drawing').panZoom();
            draw.panZoom();
            //console.log("true");
        }
        //SVG('drawing').panZoom(false);
    }

    //https://svgjs.com/docs/2.7/events/
    //https://svgjs.com/docs/2.7/referencing/
    onMount(() => {
        elementcontent = document.getElementById(idcontent);
        handle_logicnodeeditor_resize();
        if (SVG.supported) {
            //https://github.com/svgdotjs/svg.panzoom.js
            //var draw = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)
            draw = SVG('drawing').size('100%', '100%');
                //.viewbox(0,0,elementcontent.clientWidth,elementcontent.clientHeight);
            draw.panZoom({zoomMin: 0.5, zoomMax: 20});
            //https://svgjs.com/docs/2.7/elements/
            //line = draw.line(0, 0, 0, 0).stroke({ width: 1 });
            //console.log(line);

            //draw.panZoom(false)
            //draw.on('panStart', function(ev) {
                //ev.preventDefault();
                //console.log(ev);
            //});

            //draw.on('pinchZoomStart', function(ev) {
                //ev.preventDefault()
                //console.log(ev);
            //});
            
            //draw.on('zoom', function(ev) {
                //ev.preventDefault();
                //console.log(draw.zoom())
                //console.log(ev.detail.focus);
            //});

            svg = document.getElementById('drawing');
            //console.log(svg);
            //console.log(draw);
            //https://stackoverflow.com/questions/7676006/obtaining-an-original-svg-viewbox-via-javascript
            //console.log(svg);
            //let box = draw.getAttribute('viewBox');
            //console.log(box)
            //box.split(/\s+|,/);
            //console.log(box);

        } else {
            alert('SVG not supported');
            //console.log("SVG not supported");
        }
        
        window.addEventListener('resize', handle_logicnodeeditor_resize);
        //window.addEventListener('click', handle_nonclick);
        //drawpoint = setInterval(drawconntector, 400);

    });

    onDestroy(() => {
        //clearInterval(drawpoint);
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_logicnodeeditor_resize);
        //window.removeEventListener('click', handle_nonclick);
    });

    //handle node stuff to prevent camera panning.
    function handle_node(e){
        //console.log(e)
        //console.log(e.detail)
        //console.log(e.detail.mouse);
        if(e.detail == "over"){
            bnode = true;
        }
        if(e.detail == "out"){
            bnode = false;
        }
        if(e.detail.mouse != null){
            if(e.detail.mouse == "out"){
                bnode = false;
            }
            if(e.detail.mouse == "over"){
                bnode = true;
            }
        }
        if(e.detail.id != null){
            //console.log(e.detail.id);
            //console.log(e.detail.mouse);
            if(e.detail.mouse == "over"){
                nodetype = e.detail.type;
                idconnector =  e.detail.id;
            }else{
                idconnector = null;
            }
            
        }
        checkpanmove();
    }

    //Logic Node Editor
    //https://stackoverflow.com/questions/14208673/how-to-draw-grid-using-html5-and-canvas-or-svg
    //on:mousemove={handle_svgmousemove}
    /*
    on:mousedown={handle_svgmousedown}
    on:mousewheel={handle_svgmousewheel}
    */
</script>

<style>
    div{
        color:white;
    }

    svg{
        /*position:absolute;*/
        top:0px;
        left:0px;
        z-index:-100;
        width:100%;
        height:100%;
    }

    .nonselect{
        pointer-events: none;
    }
</style>

<div id="{idcontent}" on:mousemove={handle_mousemove} on:mousedown={handle_svgmousedown}>

    <svg id="drawing">

        <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="gray" stroke-width="0.5"/>
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#smallGrid)"/>
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <NodeComponent svg={svg} on:node={handle_node} ></NodeComponent>

        <NodeComponent svg={svg} px="150" on:node={handle_node} ></NodeComponent>

        <line class="nonselect" x1="{point1.x}" y1="{point1.y}" x2="{point2.x}" y2="{point2.y}" style="stroke:rgb(255,0,0);stroke-width:2" />
    
    </svg>

</div>
