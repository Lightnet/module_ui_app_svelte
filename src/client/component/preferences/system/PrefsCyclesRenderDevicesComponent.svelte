<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';
    import mjs from '../../../mjs.js';
    //const dispatch = createEventDispatcher();

    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
    });

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
    <span slot="header"> Cycles Render Devices </span>

    <div slot="content"> 
        <button>Test</button>
    </div>
</CollapsePanelComponent>




