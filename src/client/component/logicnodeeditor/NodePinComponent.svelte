<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    export let idcomponent;// = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    //let height;
    //let width;
    let color = "#FFA07A";
    let defaultcolor = "#FFA07A";
    let overcolor = "#B9785C";
    let outcolor = "#FFA07A";
    //export let draw;
    export let svg;
    export let boutput = true;
    export let pins = [];
    export let connectors = [];
    export let bpinout = true;


    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
    });

    afterUpdate(() => {
        //elcomponent = document.getElementById(idcomponent);
        //console.log("pin update???");
    });

    onDestroy(()=>{

    });

    function handle_mouseover(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("over");
        color = overcolor;
        dispatch("node",{id:idcomponent,type:"pin",mouse:"over",pinout:boutput});
    }

    function handle_mouseout(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("out");
        color = outcolor;
        dispatch("node",{id:idcomponent,type:"pin",mouse:"out",pinout:boutput});
    }

</script>
<style>

</style>

<rect 
    id="{idcomponent}"
    x="{px}"
    y="{py}"
    width="20" 
    height="20" 
    fill="{color}"
    on:mouseover={handle_mouseover}
    on:mouseout={handle_mouseout}
    >
</rect>
