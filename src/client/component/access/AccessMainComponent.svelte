<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AutoSizeDivComponent from "../base/AutoSizeDivComponent.svelte";
    import LoginComponent from "./account/LoginComponent.svelte";
    import ForgotComponent from "./account/ForgotComponent.svelte";

    //import ProfileComponent from "./account/ProfileComponent.svelte";
    import AccountComponent from "./account/AccountComponent.svelte";
    //import ContactsComponent from "./contacts/ContactsComponent.svelte";
    //import UserPassphaseHintComponent from "./account/UserPassphaseHintComponent.svelte";
    //import UserChangePassphaseComponent from "./account/UserChangePassphaseComponent.svelte";
    import LogoutComponent from "./account/LogoutComponent.svelte";
    import AdminComponent from "./admin/AdminComponent.svelte";
    import MessagesComponent from "./messages/MessagesComponent.svelte";

    import ForumComponent from "./forum/ForumComponent.svelte";
    import ChatComponent from "./chat/ChatComponent.svelte";

    import DatabaseComponent from "./database/DatabaseComponent.svelte";
    import TestAreaComponent from "./gun/TestAreaComponent.svelte";

    import { generateId } from '../helper/generateid.js';
    import { gun, onLogin } from '../../mjs.js';
    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    let idcomponent = generateId(20);
    let blogin = false;
    let bforgot = false;
    let navmenus = [];
    let accessview = AccountComponent;
    //accessview = TestAreaComponent;

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
        navmenus.push({name:"Test Area",context:"testarea",comp:TestAreaComponent});
        navmenus.push({name:"Account",context:"account",comp:AccountComponent});
        //navmenus.push({name:"Profile",context:"profile",comp:ProfileComponent});
        navmenus.push({name:"Messages",context:"messages",comp:MessagesComponent});
        //navmenus.push({name:"Contacts",context:"contacts",comp:ContactsComponent});
        navmenus.push({name:"Chat",context:"chat",comp:ChatComponent});
        navmenus.push({name:"Forum",context:"forum",comp:ForumComponent});
        //navmenus.push({name:"Passphase Hint",context:"passphasehint",comp:UserPassphaseHintComponent});
        //navmenus.push({name:"Change Passphase",context:"changepassphase",comp:UserChangePassphaseComponent});
        navmenus.push({name:"Database",context:"database",comp:DatabaseComponent});
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
    .access_navmenu{
        height:22px;
        width:100%;
    }
</style>
<AutoSizeDivComponent idcomponent={idcomponent}>
    {#if blogin}
        <div class="access_navmenu">
            {#each navmenus as menu}
                <a href="/#" on:click="{()=>h_context(menu.comp)}">{menu.name} </a>
            {/each}
        </div>
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