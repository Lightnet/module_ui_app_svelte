<script>
    //import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';

    export let obj;
    export let btogglepanel = true;

    //const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    
    //onMount(() => {
        //console.log("mount")
    //});

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});

    function togglepanal(){
        btogglepanel = !btogglepanel;
        //console.log(btogglepanel);
    }

</script>

<style>
    button{
        background-color:grey;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 10px 4px;
    }

    button:hover{
        background-color: lightslategrey;
    }
    /*
    input{
        font-size: 12px;
        height:22px;
    }
    */
    div{
        color:white;
    }

</style>
<CollapsePanelComponent>
    <span slot="header"> Collections </span>

    <div slot="content"> 
        {#if obj != null}
            <button> Add to Collection</button>
        {/if}
    </div>
</CollapsePanelComponent>




