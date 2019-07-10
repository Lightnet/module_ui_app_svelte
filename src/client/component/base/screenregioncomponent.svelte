<script>
    import { onMount, onDestroy } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    //import { UserName } from '../../stores.js';
    //const dispatch = createEventDispatcher();

    let id1 = generateId(20);
    let assignid;
    let screenregion1;
    
    onMount(() => {
        //console.log("mount")
        if(assignid){
            id1 = assignid;
        }
        screenregion1 = document.getElementById(id1);
    });

    onDestroy(() => {
        //console.log("onDestroy")
        id1 = null;
        screenregion1 = null;
    });

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
<div id="{id1}" class="screenregion">

</div>