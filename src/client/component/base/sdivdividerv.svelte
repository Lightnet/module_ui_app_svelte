<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import SSplitter from './splitter.svelte'

    const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount")
    });
    
    let id1 = "test1"
    let id2 = "test2"
</script>

<style>
    .panel1 {
		background-color: dimgrey;
        height:50vh;
    }

    .panel2 {
		background-color:goldenrod;
        height:50vh;
    }
    
</style>

<div id={id1} class="panel1">
    Test1
</div>
<SSplitter bhorizontal={false} bresize={true} idiv1={id1} idiv2={id2}>
</SSplitter>
<div id={id2} class="panel2">
    Test2
</div>