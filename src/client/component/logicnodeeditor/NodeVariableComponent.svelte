<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let idcomponent = "node" + generateId(20);
    let elcomponent;
    let px;
    let py;
    //let height;
    //let width;
    let color ="#FFA07A";
    export let draw;
    export let svg;

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
    });

    onDestroy(()=>{

    });

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
    >
</rect>
