<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';

    const dispatch = createEventDispatcher();

    let id;
    let headername = "header";
    let contextname = "context";

    id = generateId(20);

    //onMount(async () => {
    onMount(() => {
        //console.log(id)
        //let element_context = document.getElementById(id);

    });
    
    function handleMousemove(event){
		//console.log("header");
		Sl_Mouseregion.set("context");
	}
</script>

<style>

.context{
    height:100%;
}

.header{
    height:20px;
    background-color: lightslategrey;
}
.content{
    /*height:100vh;*/
    height:calc(100% - 20px);
    background-color:lightsteelblue;
}
</style>
<div class="context" on:mousemove={handleMousemove} >
    <div class="header">{headername}</div>
    <div class="content">
    
        {contextname}
    
    </div>
</div>