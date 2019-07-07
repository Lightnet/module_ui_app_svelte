<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    //import { Sl_Mouseregion } from '../../stores.js';

    import svelte from 'svelte/compiler';

    console.log(svelte);

    let inputscript = "";
    let outputscript = "";

    //const dispatch = createEventDispatcher();
    
    onMount(() => {
        //console.log("mount")
        

    });

    function compilescript(){
        let result = svelte.compile(inputscript, {
	        // options
        });
        console.log(result)
        outputscript = result.js.code;
    }

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});
    
</script>

<style>

</style>
<div>
    Text Editor
    <textarea bind:value={inputscript}></textarea>
    <button on:click={compilescript}> Compile </button>

    <textarea bind:value={outputscript}></textarea>
</div>