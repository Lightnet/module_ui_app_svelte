<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    //import { UserName } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';

    let idcomponent = generateId(20);
    let Question1 = "";
    let Question2 = "";
    let Hint = "";

    const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount")
        //console.log("access?");
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
       //console.log("onDestroy")
       Hint="";
    });

    function btngethint(e){
        console.log(e);
        //dispatch("hevent",{action:"forgotclose"});
    }


    function btncancel(e){
        dispatch("hevent",{action:"forgotclose"});
    }
</script>

<style>

</style>
<div id="{idcomponent}">
    <table>
        <tr>
            <td>Question #1:</td>
            <td><input type="text" bind:value={Question1} placeholder="Question"></td>
        </tr>
        <tr>
            <td>Question #1:</td>
            <td><input type="text" bind:value={Question2} placeholder="Question"></td>
        </tr>
        <tr>
            <td>Hint:</td>
            <td><input type="text" bind:value={Hint} placeholder="Hint"></td>
        </tr>
        <tr>
            <td>
            </td><td style=" text-align: center;">
                <button on:click={btngethint}>Get Hint</button>
                <button on:click={btncancel}>Cancel</button>
            </td>
        </tr>
    </table>
</div>