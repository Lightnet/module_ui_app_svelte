<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import CollapsePanelComponent from '../../base/CollapsePanelComponent.svelte';
    //import mjs from '../../../mjs.js';
    const dispatch = createEventDispatcher();
    export let bCollapse = true;

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });

    function handle_click(e){
        dispatch("click");
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
<CollapsePanelComponent btogglepanel={bCollapse} on:click={handle_click}>
    <span slot="header"> Info </span>

    <div slot="content"> 
        <button>Test</button>
    </div>
</CollapsePanelComponent>




