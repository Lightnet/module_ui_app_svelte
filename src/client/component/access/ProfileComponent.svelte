<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AliasInformationComponent from './AliasInformationComponent.svelte';
    import DisplayUser from './DisplayUserComponent.svelte';
    import PublicKeyComponent from "./PublicKeyComponent.svelte";
    import AliasSearchComponent from "./AliasSearchComponent.svelte"
    import { generateId } from '../helper/generateid.js';

    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);

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
    <AliasSearchComponent></AliasSearchComponent>
</div>