<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let idcomponent = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    //let height;
    //let width;
    let color = "#FFA07A";
    export let draw;
    export let svg;
    export let boutput = true;
    export let pins = [];

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
    });

    onDestroy(()=>{

    });

    function handle_mouseover(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("over");
        dispatch("node",{id:idcomponent,type:"connector",mouse:"over",pinout:boutput});
    }

    function handle_mouseout(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("out");
        dispatch("node",{id:idcomponent,type:"connector",mouse:"out",pinout:boutput});
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
