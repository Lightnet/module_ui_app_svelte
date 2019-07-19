<script>
    import { onMount, onDestroy } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    //import mjs from '../../mjs.js';

    export let idcomponent = generateId(20);
    let assignid;
    let screenregion1;
    export let align = "h";

    export function getID(){
        return id;
    }
    
    onMount(() => {
        //console.log(idcomponent);
        screenregion1 = document.getElementById(idcomponent);
        screenregion1.setAttribute('align',align);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        idcomponent = null;
        screenregion1 = null;
    });

    function handle_screenregion(event){
        //mjs.context.screenregion = screenregion1;
    }
    //on:mousemove={handle_screenregion}

</script>
    
<style>
    .alignregion {
		/*background-color: brown;*/
        height:100%;
        width:100%;
        float:left;
        /*position:absolute;*/
        overflow: hidden;
    }
</style>
<div id="{idcomponent}" class="alignregion" >
    <slot></slot>
</div>