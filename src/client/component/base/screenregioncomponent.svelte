<script>
    import { onMount, onDestroy } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    export let idcomponent = generateId(20);
    let assignid;
    let screenregion;
    //export let align = "h";
    //export let bautosize = true;

    export function getID(){
        return idcomponent;
    }
    
    onMount(() => {
        //console.log(idcomponent);
        screenregion = document.getElementById(idcomponent);
        //screenregion1.setAttribute('align',align);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        idcomponent = null;
        screenregion = null;
    });

    function handle_screenregion(event){
        mjs.context.screenregion = screenregion;
    }

</script>
    
<style>
    .screenregion {
		/*background-color: brown;*/
        height:100%;
        width:100%;
        float:left;
        overflow: hidden;
        position:absolute;
    }
</style>
<div id="{idcomponent}" class="screenregion" on:mousemove={handle_screenregion}>
    <slot></slot>
</div>