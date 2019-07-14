<script>
    //https://jsbin.com/rupurogawo/edit?html,css,js,output
    //https://codepen.io/xgundam05/pen/KjqJn
    //https://jsbin.com/doyewususu/1/edit?html,css,js,output
    //https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/

    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import NodeComponent from './Node.svelte';


    import mjs from '../../mjs.js';
    import SVG from 'svg.js';
    import 'svg.panzoom.js';
    
    //const dispatch = createEventDispatcher();
    
    let idcontent = generateId(20);
    let elementcontent;
    let bpan = false;
    let bnode = false;

    let svg;
    let draw;
    let height;
    let width;

    function handle_logicnodeeditor_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'LOGICNODE'});
    }

    function handle_nmousemove(e){

    };

    function getsvg(){
        //return svg;
    }

    let mouse = {
        x:0,
        y:0
    }

    function handle_svgmousemove(e){
        //console.log(e);
        //console.log(e.offsetX + ":" + e.offsetY);
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    }

    function handle_svgmousedown(e){
        //console.log(e)
        if(e.button == 1){
            //console.log(e)
            bpan = true;
            //SVG('drawing').viewbox(0,0,500,500)
        }
        window.addEventListener('mousemove',handle_svgmousemove);
        window.addEventListener('mouseup',handle_svgmouseup);
    }

    function handle_svgmouseup(e){
        if(e.button == 1){
            //console.log(e)
            bpan = false;
        }
        window.removeEventListener('mousemove',handle_svgmousemove);
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
            //draw.panZoom(false)
            //draw.on('panStart', function(ev) {
                //ev.preventDefault();
                //console.log(ev);
            //});

            //draw.on('pinchZoomStart', function(ev) {
                //ev.preventDefault()
                //console.log(ev);
            //});
            
            draw.on('zoom', function(ev) {
                ev.preventDefault();
                //console.log(draw.zoom())
                //console.log(ev.detail.focus);
            });


            svg = document.getElementById('drawing');
            //https://stackoverflow.com/questions/7676006/obtaining-an-original-svg-viewbox-via-javascript
            //console.log(svg);
            //let box = draw.getAttribute('viewBox');
            //console.log(box)
            //box.split(/\s+|,/);
            //console.log(box);

        } else {
            //alert('SVG not supported');
            console.log("SVG not supported");
        }
        
        window.addEventListener('resize', handle_logicnodeeditor_resize);
        //window.addEventListener('mousemove', handle_nmousemove);
        //window.addEventListener('click', handle_nonclick);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_logicnodeeditor_resize);
        //window.removeEventListener('mousemove', handle_nmousemove);
        //window.removeEventListener('click', handle_nonclick);
    });

    function handle_node(e){
        //console.log(e)
        //console.log(e.detail)
        if(e.detail == "over"){
            bnode = true;
        }
        if(e.detail == "out"){
            bnode = false;
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
</style>

<div id="{idcontent}" on:mousemove={handle_mousemove}>

    <svg 
        id="drawing"
    >
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
        <NodeComponent on:node={handle_node} svg={svg} draw={draw}></NodeComponent>
    
    </svg>

</div>
