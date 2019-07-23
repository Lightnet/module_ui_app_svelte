<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import {LogicNodeThemeConfig} from '../../mjs.js';
    import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    export let idcomponent;// = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    //let height;
    //let width;
    let color = "#FFA07A";
    //let defaultcolor = "#FFA07A";
    let overcolor = "#B9785C";
    let outcolor = "#FFA07A";
    //export let draw;
    export let svg;
    export let boutput = true;
    export let pins = [];
    export let connectors = [];
    export let bpinout = true;
    export let nodeid;
    export let pintype = "flow";
    let pinsize = 20;

    //let LogicNodeConfig = {};

    const LogicNodeConfigUnsub = LogicNodeThemeConfig.subscribe(detail=>{
        //LogicNodeConfig = detail;
        //console.log(detail);
        //console.log("PropertiesStyle theme change?");
        color = detail.node.pin.d;
        overcolor = detail.node.pin.h;
        outcolor = detail.node.pin.d;
        pinsize = detail.node.pinsize;
    });

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
    });

    afterUpdate(() => {
        //elcomponent = document.getElementById(idcomponent);
        //console.log("pin update???");
    });

    onDestroy(()=>{
        LogicNodeConfigUnsub();
    });

    function handle_mouseover(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("over");
        color = overcolor;
        dispatch("node",{nodeid:nodeid, id:idcomponent, type:"pin" ,pintype:pintype ,pinout:boutput, mouse:"over"});
    }

    function handle_mouseout(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("out");
        color = outcolor;
        dispatch("node",{nodeid:nodeid, id:idcomponent, type:"pin" ,pintype:pintype ,pinout:boutput, mouse:"out"});
    }

</script>
<style>

</style>

<rect 
    id="{idcomponent}"
    x="{px}"
    y="{py}"
    width="{pinsize}" 
    height="{pinsize}" 
    fill="{color}"
    on:mouseover={handle_mouseover}
    on:mouseout={handle_mouseout}
    >
</rect>
