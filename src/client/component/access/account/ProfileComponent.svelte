<script>
    import { onMount, onDestroy } from 'svelte';
    import AliasInformationComponent from './AliasInformationComponent.svelte';
    import DisplayUser from './DisplayUserComponent.svelte';
    import PublicKeyComponent from "./PublicKeyComponent.svelte";
    import AliasSearchComponent from "./AliasSearchComponent.svelte"
    import { generateId } from '../../helper/generateid.js';

    let idcomponent = generateId(20);
    
    onMount(() => {
        //console.log("mount")
        //console.log("access?");
    });

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