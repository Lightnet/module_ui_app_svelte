<script>
    import { onMount, onDestroy } from 'svelte';
    import ModalComponent from "../../base/ModalComponent.svelte";
    import { generateId } from '../../helper/generateid.js';
    import { gun, pair } from '../../../mjs.js';

    import ProfileComponent from "./ProfileComponent.svelte";
    import ContactsComponent from "../contacts/ContactsComponent.svelte";
    import UserPassphaseHintComponent from "./UserPassphaseHintComponent.svelte";
    import UserChangePassphaseComponent from "./UserChangePassphaseComponent.svelte";

    let idcomponent = generateId(20);
    let navmenus = [];
    let accessview = ProfileComponent;

    onMount(async () => {
        navmenus.push({name:"Profile",context:"profile",comp:ProfileComponent});
        navmenus.push({name:"Contacts",context:"contacts",comp:ContactsComponent});
        navmenus.push({name:"Passphase Hint",context:"passphasehint",comp:UserPassphaseHintComponent});
        navmenus.push({name:"Change Passphase",context:"changepassphase",comp:UserChangePassphaseComponent});
        navmenus=navmenus;
    });

    onDestroy(() => {
       //console.log("onDestroy")
    });

    function h_context(e){
        //console.log(e);
        accessview=e;
    };

    function hevent(e){
        //console.log(e);
        for(let i=0;i<navmenus.length;i++){
            if(navmenus[i].context == e.detail){
                accessview = navmenus[i].comp;
                break;
            }
        }
    }


</script>

<style>
    .account_navmenu{
        height:22px;
        width:100%;
    }
</style>
<div id="{idcomponent}">
    <div class="account_navmenu">
        {#each navmenus as menu}
            <a href="/#" on:click="{()=>h_context(menu.comp)}">{menu.name} </a>
        {/each}
    </div>
    {#if accessview !=null}
            <svelte:component this={accessview} on:hevent={hevent}/>
    {/if}
</div>