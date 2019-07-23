<svelte:options accessors={true}/>
<script>
    //https://github.com/jillix/svg.connectable.js
    //https://depuits.github.io/ned/
    //https://github.com/depuits/ned

    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import AutosizeDivComponent from '../base/autosizedivcomponent.svelte';
    import BaseNodeComponent from './BaseNodeComponent.svelte';
    import NodeVariableComponent from './NodeVariableComponent.svelte';
    import NodeConnectorComponent from './NodeConnectorComponent.svelte';
    import NodeTickComponent from './NodeTickComponent.svelte';
    import NodeConsolelogComponent from './NodeConsolelogComponent.svelte';
    import DrawGridComponent from "./DrawGridComponent.svelte";

    import NodeTestComponent from "./NodeTestComponent.svelte";

    import {NodeTick} from "./nodescripts/NodeTick.js";
    import {NodeConsolelog} from "./nodescripts/NodeConsolelog.js";

    import mjs from '../../mjs.js';
    import {LogicNodeID, LogicNodeThemeConfig} from '../../mjs.js';
    import SVG from 'svg.js';
    //import 'svg.panzoom.js';
    import svgPanZoom from 'svg-pan-zoom';
    import '@svgdotjs/svg.draggable.js';
    //let count = 0;
    //const dispatch = createEventDispatcher();
    
    export let id = generateId(20);

    let elementcontent;
    let bzoompan = false;
    let bconnector = false;

    let pindata;
    let idpin1;
    let idpin2;
    let pinoutdata;
    let pinindata;

    let point1 = {x:0,y:0};
    let point2 = {x:0,y:0};
    let bline = false;
    let strokecolor = "rgb(100,100,100)";
    strokecolor = "#008000";
    let strokewidth = 2;
    strokewidth = 4;

    let svg;
    let draw;
    let height;
    let width;
    let idsvg = "draw" + generateId(20);
    let panZoom;

    export let connectors = [];//links to connector point list here for update position?
    export let visualnodes = []; //node blocks types
    export let propnodes = []; //node variables

    //let LogicNodeConfig = {};

    const LogicNodeConfigUnsub = LogicNodeThemeConfig.subscribe(detail=>{
        //LogicNodeConfig = detail;
        //console.log(detail);
        //console.log("PropertiesStyle theme change?");
        strokecolor = detail.node.strokecolors;
        strokewidth = detail.node.strokewidths;
    });
    

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

        let screen2d = screenToWorld({x:e.clientX,y:e.clientY});
        //console.log(screen2d);


        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'LOGICNODE'});
    }

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
        var pt = svg.createSVGPoint();
        pt.x = x ;
        pt.y = y ;
        return pt.matrixTransform(element.getScreenCTM().inverse());
    }

    function handle_svgmousedown(e){
        //console.log(e);
        if(e.button == 0){
            //console.log(e)
            if(pindata !=null){
                if((pindata.type == "pin")&&(pindata.mouse == "over")){
                    bconnector = true;

                    idpin1 = pindata;
                    let svgP = svgPoint(svg, e.clientX, e.clientY);
                    //set draw line to dot from mouse down.
                    point1.x = svgP.x;
                    point1.y = svgP.y;
                    point2.x = svgP.x;
                    point2.y = svgP.y;
                    bline = true;
                }else{
                    bline = false;
                }
            }else{
                bline = false;
                //console.log("clear?");
                resetpoint();
            }

            
        }
        window.addEventListener('mouseup',handle_svgmouseup);
    }

    function checknodepoints(){
        if((idpin1 !=null)&&(idpin2 !=null)){
            //console.log("pass");
            if((idpin1.pinout == true)&&(idpin2.pinout == false)){
                pinoutdata = idpin1;
                pinindata = idpin2;
                getconnectors();
            }else if((idpin1.pinout == false)&&(idpin2.pinout == true)){
                pinoutdata = idpin2;
                pinindata = idpin1;
                getconnectors();
            }else{
                console.log("error?");
            }
            idpin1 = null;
            idpin1 = null;
        }else{
            //console.log("fail");
            idpin1 = null;
            idpin2 = null;
        }
    }

    function getconnectors(){
        let bfound = false;
        let connector = {
            idcomponent: generateId(20),
            idpinin:pinindata.id,
            idpinout:pinoutdata.id,
        };
        //console.log(pinindata);
        let data ={
            action:"add",
            pinin:pinindata,
            pinout:pinoutdata
        }
        //send nodeid block to update pin connectors
        window.dispatchEvent(new CustomEvent('updatepin',{detail:data}));

        /*let cconnector = new NodeConnectorComponent({target:svg,props:connector});*/
        //check connectors
        for(let i=0;i<connectors.length;i++){
            if((connectors[i].idpinin == pinindata.id)&&(connectors[i].idpinout == pinoutdata.id)){
                bfound = true;
                break;
            }
        }

        if(bfound == false){
            connectors.push(connector);
            connectors = connectors;
            //console.log(connectors);
        }
    }

    function handle_svgmouseup(e){
        //e.preventDefault();
        if(e.button == 0){
            //console.log(e)
            if(pindata !=null){
                if((pindata.type == "pin")&&(pindata.mouse == "over")){
                    idpin2 = pindata;
                    let svgP = svgPoint(svg, e.clientX, e.clientY);
                    point2.x = svgP.x;
                    point2.y = svgP.y;
                    //console.log(idpin1);
                    //console.log(pindata);
                    checknodepoints();
                }
            }
            bline = false;
            bconnector = false;
            resetpoint();
        }
        window.removeEventListener('mouseup',handle_svgmouseup);
    }

    function handle_svgmousewheel(e){
        //console.log(e)
    }

    function checkpanmove(){
        if(bzoompan){
            //console.log("false");
            panZoom.disablePan();
        }else{
            panZoom.enablePan();
            //console.log("true");
        }
        //SVG('drawing').panZoom(false);
    }

    function setupnodes(){
        //nodes

        //let ntick = new NodeTick();
        //console.log(ntick)

        propnodes.push({name:"text",type:"string",default:"test1",id:"100001"});
        //propnodes = propnodes;

        visualnodes.push({nodetype:"BaseNode",px:20,py:20});
        visualnodes.push({nodetype:"BaseNode",px:150,py:20});
        visualnodes.push({nodetype:"NodeVariable",px:150,py:150});
        visualnodes.push({nodetype:"NodeTick",px:150,py:200});
        visualnodes.push({nodetype:"NodeConsolelog",px:300,py:200});
        //visualnodes = visualnodes;
        //console.log(visualnodes);
    }

    function screenToWorld(pos) {
        var rect = svg.getBoundingClientRect();
        var pan = panZoom.getPan();
        var zoom = panZoom.getZoom();

        return { 
            x: (((pos.x - rect.left) - pan.x) / zoom), 
            y: (((pos.y - rect.top) - pan.y) / zoom)
        };
    };

    onMount(() => {
        elementcontent = document.getElementById(id);
        LogicNodeID.set(id);
        //console.log(id);
        handle_logicnodeeditor_resize();
        if (SVG.supported) {
            //var draw = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)
            draw = SVG(idsvg).size('100%', '100%');

            //console.log($this);
            //console.log(window);
            //console.dir(elementcontent);

            //document.querySelectorAll(".svelte-container").forEach(element => {
                //if (!element.hasChildNodes()) {
                    //console.log(element);
                    //new App({
                    //target: element
                    //});
                //}
            //});

            svg = document.getElementById(idsvg);
            //console.log(svgPanZoom);

            panZoom = svgPanZoom(svg);
            panZoom.disablePan();
            //console.log(panZoom);
            //var pan = panZoom.getPan();
            //console.log(pan);
        } else {
            alert('SVG not supported');
            //console.log("SVG not supported");
        }

        console.dir(NodeTestComponent);

        //odd error needs to be add wait since svgPanZoom was added before it was normal
        setupnodes();
        
        window.addEventListener('resize', handle_logicnodeeditor_resize);
        //window.addEventListener('click', handle_nonclick);
        //drawpoint = setInterval(drawconntector, 400);
        window.dispatchEvent(new Event('resize'));
    });

    onDestroy(() => {
        //clearInterval(drawpoint);
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_logicnodeeditor_resize);
        //window.removeEventListener('click', handle_nonclick);
        LogicNodeConfigUnsub();
    });

    //handle node stuff to prevent camera panning.
    function handle_node(e){
        //console.log(e)
        //console.log(e.detail);
        if(e.detail.mouse != null){
            if((e.detail.mouse == "out")&&(bconnector == false)){//check for mouse down when drag connector
                bzoompan = false;
            }
            if(e.detail.mouse == "over"){
                bzoompan = true;
            }
        }
        if(e.detail.id != null){
            //console.log(e.detail);
            //console.log(e.detail.mouse);
            if(e.detail.mouse == "over"){
                if(e.detail.type == "pin"){
                    pindata = e.detail;
                }
            }else{
                pindata = null;
            }
        }
        checkpanmove();
    }

    //Logic Node Editor
    /*


    */
</script>

<style>
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

<div id="{id}" on:mousemove={handle_mousemove} on:mousedown={handle_svgmousedown}>

    <svg id="{idsvg}">

        <DrawGridComponent />
        
        <!--
        <NodeTestComponent svg={svg} panZoom={panZoom} px="20" py="20" on:node={handle_node} />
        <BaseNodeComponent svg={svg} panZoom={panZoom} px="20" py="20" on:node={handle_node} />
        <BaseNodeComponent svg={svg} panZoom={panZoom} px="150" py="20" on:node={handle_node} />
        <NodeVariableComponent svg={svg} panZoom={panZoom} px="200" py="150" on:node={handle_node} />
        -->
        <!-- wait add to deal with error loading incorrectly -->
        {#await visualnodes then datanodes}
            <!--{console.log(visualnodes)}-->
            <!--{console.log(datanodes)}-->
            {#each Object.keys(datanodes) as index}
                {#if datanodes[index].nodetype == "BaseNode"}
                    <BaseNodeComponent svg={svg} panZoom={panZoom} {...datanodes[index]} on:node={handle_node} />
                    <!--<BaseNodeComponent svg={svg} panZoom={panZoom} px="20" py="20" on:node={handle_node} />-->
                {/if}
                
                {#if datanodes[index].nodetype == "NodeVariable"}
                    <NodeVariableComponent svg={svg} panZoom={panZoom}  {...datanodes[index]} on:node={handle_node} />
                {/if}
                {#if datanodes[index].nodetype == "NodeTick"}
                    <NodeTickComponent svg={svg} panZoom={panZoom}  {...datanodes[index]} on:node={handle_node} />
                {/if}
                {#if datanodes[index].nodetype == "NodeConsolelog"}
                    <NodeConsolelogComponent svg={svg} panZoom={panZoom}  {...datanodes[index]} on:node={handle_node} />
                {/if}
                
            {/each}
        {/await}
        <!-- when connector is add give error so it need to add wait to get data loaded correctly -->
        {#await connectors then value}
            {#each Object.keys(connectors) as index}
                <NodeConnectorComponent svg={svg} panZoom={panZoom} {...connectors[index]} />
            {/each}
        {/await}
        <line class="nonselect" 
            x1="{point1.x}" 
            y1="{point1.y}" 
            x2="{point2.x}" 
            y2="{point2.y}" 
            style="stroke:{strokecolor};stroke-width:{strokewidth}"
        />
        
    </svg>
</div>
