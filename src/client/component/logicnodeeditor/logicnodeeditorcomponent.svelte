<script>
    //https://jsbin.com/rupurogawo/edit?html,css,js,output
    //https://codepen.io/xgundam05/pen/KjqJn
    //https://jsbin.com/doyewususu/1/edit?html,css,js,output

    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    //import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import NodeComponent from './Node.svelte';


    import mjs from '../../mjs.js';
    import SVG from 'svg.js';
    //const dispatch = createEventDispatcher();
    
    let idcontent = generateId(20);
    let elementcontent;
    //let svg;

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

    function setupsvg(){
        // SVG SETUP
        // ===========
        //svg = document.getElementById('drawing');
        //console.log(svg.namespaceURI);
        //svg.ns = svg.namespaceURI;
        console.log(SVG)
        
        if (SVG.supported) {
            var draw = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)
            var rect = draw.rect(100, 100)
            console.log(draw);
            draw.click(function() {
                console.log("click");
                this.fill({ color: '#f06' });
            });
        } else {
            //alert('SVG not supported');
            console.log("error")
        }
        

        /*
        SVG.on(document, 'DOMContentLoaded', function() {
            var draw = SVG('#drawing')
            console.log(draw);

            var rect = draw.rect(100, 100).attr({ fill: '#f06' })
        })
        */

        //var draw = SVG('drawing');
        //console.log(draw);
        //var rect = draw.rect(100, 100).attr({ fill: '#f06' })
    };

    //https://svgjs.com/docs/2.7/events/
    //https://svgjs.com/docs/2.7/referencing/
    onMount(() => {
        //console.log("mount")
        //setupsvg();
        //SVG.on(document, 'DOMContentLoaded', function() {
            //let draw = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)
            //let draw = SVG.get('#drawing').size('100%', '100%').viewbox(0,0,800,1000)
            let draw = SVG.get('#drawing').size('100%', '100%');//.viewbox(0,0,800,1000)
            //let rect = draw.rect(100, 100);
            //rect.attr({ fill: '#f06' });
            //rect.click(function() {
                //console.log("click");
                //this.fill({ color: '#f06' });
            //});
        //});

        elementcontent = document.getElementById(idcontent);
        handle_logicnodeeditor_resize();
        window.addEventListener('resize', handle_logicnodeeditor_resize);
        window.addEventListener('mousemove', handle_nmousemove);
        //window.addEventListener('click', handle_nonclick);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_logicnodeeditor_resize);
        window.removeEventListener('mousemove', handle_nmousemove);
        //window.removeEventListener('click', handle_nonclick);
    });

    //Logic Node Editor
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
    <svg id="drawing">
        <NodeComponent></NodeComponent>
    
    </svg>

    <!--
    <div id="drawing"></div>
    -->
</div>
