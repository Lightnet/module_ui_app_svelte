<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
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

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
    });

    onDestroy(()=>{

    });

    function handle_mouseover(e){
        dispatch("node",{id:idcomponent,type:"connector",mouse:"over"});
    }

    function handle_mouseout(e){
        dispatch("node",{id:idcomponent,type:"connector",mouse:"out"});
    }

</script>
<style>

</style>

<rect 
    id="{idcomponent}"
    x="{px}"
    y="{py}"
    width="10" 
    height="10" 
    fill="{color}"
    on:mouseover={handle_mouseover}
    on:mouseout={handle_mouseout}
    >
</rect>
