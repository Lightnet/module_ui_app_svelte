<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import { gun } from '../../mjs.js';

    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);
    let sec = "";
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
    });

    async function btnDecrypt(){
        console.log(gun);
        let user = gun.user();
        console.log(user);

        sec = await SEA.decrypt(sec, user._.sea);
        console.log(sec);
    }

</script>

<style>

</style>
<div id="{idcomponent}">
    <button on:click={btnDecrypt}>Decrypt</button>
    <input bind:value={sec} >
    
</div>