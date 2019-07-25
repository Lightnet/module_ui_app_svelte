<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import DisplayUser from './DisplayUser.svelte';
    import { generateId } from '../helper/generateid.js';

    let idcomponent = generateId(20);

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
    });
</script>

<style>

</style>
<div id="{idcomponent}">
    Profile...
    <DisplayUser></DisplayUser>
</div>