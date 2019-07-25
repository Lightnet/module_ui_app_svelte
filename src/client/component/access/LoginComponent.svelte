<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    //import { UserName } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';

    let idcomponent = generateId(20);
    let loginid = "";
    let password = "";

    //const dispatch = createEventDispatcher();

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
       password="";
    });

    function btnlogin(e){
        console.log(e);
    }

    function btnregister(e){
        console.log(e);
    }
</script>

<style>

</style>
<div id="{idcomponent}">
    <br>Access
    <br>User: <input type="text" bind:value={loginid} placeholder="Alias">
    <br>Password: <input type="text" bind:value={password} placeholder="Passphase">
    <br><button on:click={btnlogin}> Login </button>
    <button on:click={btnregister}> Register </button>
</div>