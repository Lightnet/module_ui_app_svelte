<script>
    import { onMount, onDestroy } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    //import mjs from '../../mjs.js';

    let id1 = generateId(20);
    let assignid;
    let screenregion1;
    export let align = "h";

    export function getID(){
        return id1;
    }
    
    onMount(() => {
        console.log(id1);
        screenregion1 = document.getElementById(id1);
        screenregion1.setAttribute('align',align);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        id1 = null;
        screenregion1 = null;
    });

    function handle_screenregion(event){
        //mjs.context.screenregion = screenregion1;
    }

</script>
    
<style>
    .screenregion {
		background-color: brown;
        height:100%;
        width:100%;
        float:left;
        /*position:absolute;*/
        overflow: hidden;
    }
</style>
<div id="{id1}" class="screenregion" on:mousemove={handle_screenregion}></div>