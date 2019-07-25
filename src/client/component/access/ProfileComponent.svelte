<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AliasInformationComponent from './AliasInformationComponent.svelte';
    import DisplayUser from './DisplayUserComponent.svelte';
    import PublicKeyComponent from "./PublicKeyComponent.svelte";
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
    <DisplayUser></DisplayUser>
    <PublicKeyComponent></PublicKeyComponent>
    
    <AliasInformationComponent></AliasInformationComponent>
</div>