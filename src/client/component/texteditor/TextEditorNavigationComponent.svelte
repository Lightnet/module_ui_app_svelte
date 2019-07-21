<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    //import { LogicNodeID } from '../../mjs.js';
    let textfilename = "None.md";
    onMount(() => {
        //console.log("mount");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        //LogicNodeIDunsubscribe();
    });

    function runcompilescript(){
        window.dispatchEvent(new Event("compilescript"));
    }

</script>

<style>
    input[type="text"]{
        padding: 0px 0px;
        border: none;
    }
    button{
        height:22px;
    }
</style>

<button on:click={runcompilescript}> Run Compile </button>

<input type="text" bind:value={textfilename}>

<button> Select </button>
<button> New </button>
<button> Delete </button>

<button> Register </button>
<button> Unregister </button>

