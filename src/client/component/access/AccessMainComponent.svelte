<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutoSizeDivComponent from "../base/AutoSizeDivComponent.svelte";
    import LoginComponent from "./LoginComponent.svelte";
    import ForgotComponent from "./ForgotComponent.svelte";

    import ProfileComponent from "./ProfileComponent.svelte";
    import ContactsComponent from "./ContactsComponent.svelte";
    import UserPassphaseHintComponent from "./UserPassphaseHintComponent.svelte";
    import UserChangePassphaseComponent from "./UserChangePassphaseComponent.svelte";
    import LogoutComponent from "./LogoutComponent.svelte";

    import AdminComponent from "./AdminComponent.svelte";
    import MessagesComponent from "./MessagesComponent.svelte";

    import { generateId } from '../helper/generateid.js';
    import { gun, onLogin } from '../../mjs.js';
    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    let idcomponent = generateId(20);
    let blogin = false;
    let bforgot = false;
    let navmenus = [];
    let accessview = ProfileComponent;

    const LoginuUsub = onLogin.subscribe(value => {
        //console.log(value);
        //console.log("login",value);
		blogin = value;
	});

    onMount(() => {
        //console.log("mount")
        //console.log(gun);
        //console.log(mjs.gun);
        //console.log(mjs.getGun());
        //console.log(getGun());

        navmenus.push({name:"Profile",context:"profile",comp:ProfileComponent});
        navmenus.push({name:"Messages",context:"messages",comp:MessagesComponent});
        navmenus.push({name:"Contacts",context:"contacts",comp:ContactsComponent});
        navmenus.push({name:"Passphase Hint",context:"passphasehint",comp:UserPassphaseHintComponent});
        navmenus.push({name:"Change Passphase",context:"changepassphase",comp:UserChangePassphaseComponent});
        navmenus.push({name:"Database",context:"database",comp:null});
        navmenus.push({name:"Admin",context:"admin",comp:AdminComponent});
        navmenus.push({name:"Logout",context:"logout",comp:LogoutComponent});
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
       //console.log("onDestroy");
       LoginuUsub();
    });

    function h_event(e){
        console.log(e)
        if(e.detail != null){
            if(e.detail.action !=null){
                /*
                if(e.detail.action == "login"){
                }
                */
                if(e.detail.action == "forgot"){
                    bforgot=true;
                }

                if(e.detail.action == "forgotclose"){
                    bforgot=false;
                }
            }
        }
        //bforgot=true;
    };

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

</style>
<AutoSizeDivComponent idcomponent={idcomponent}>
    {#if blogin}
        {#each navmenus as menu}
            <a href="/#" on:click="{()=>h_context(menu.comp)}">{menu.name} </a>
        {/each}
        {#if accessview !=null}
            <svelte:component this={accessview} on:hevent={hevent}/>
        {/if}
    {:else}
        {#if bforgot}
            <ForgotComponent on:hevent={h_event}></ForgotComponent>
        {:else}
            <LoginComponent on:hevent={h_event}></LoginComponent>
        {/if}
    {/if}


</AutoSizeDivComponent>