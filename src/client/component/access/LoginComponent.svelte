<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, setSea, onLogin, setUser } from '../../mjs.js';

    let idcomponent = generateId(20);
    let loginid = "test";
    let password = "test";
    let showModal = false;
    let message = "";

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
       password="";
       message="";
    });

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    function btnlogin(e){
        //console.log(e);
        //console.log(loginid);
        //console.log(password);
        if(isEmpty(loginid)||isEmpty(password)){
            console.log("empty");
            return;
        }
        //console.log(gun);
        let user = gun.user();
        user.auth(loginid, password,(ack)=>{
            if(ack.err){
                //console.log("fail!");
                message = ack.err;
                showModal = true;
            }else{
                //self.$parent.$emit('view','index');
                //console.log("do something");
                //console.log(ack);
                //console.log(ack.sea);
                //console.log(ack.put);
                setUser(ack.put);
                setSea(ack.sea);
                //dispatch("hevent",{action:"login"});
                onLogin.set(true);
            }
        });
        
    }

    function btnregister(e){
        //console.log(e);
        let user = gun.user();
        if(isEmpty(loginid)||isEmpty(password)){
            console.log("empty");
            return;
        }
        user.create(loginid, password, function(ack){
            //console.log(ack);
            if(ack.err){
                //console.log("fail!");
                //self.msg = "Register Alias Fail!";
                //console.log(ack.err);
                message = ack.err;
                showModal = true;
            }
            if(ack.pub){
                //console.log("created!", ack.pub);
                //self.msg = "Alias Created!";
                //self.bregister = false;
                message = "Alias Created!";
                showModal = true;
            }
        });
    }

    function clickForgot(e){
        dispatch("hevent",{action:"forgot"});
    }
</script>

<style>

</style>
<div id="{idcomponent}">
    <table>
        <tr>
            <td>Alias:</td>
            <td><input type="text" bind:value={loginid} placeholder="Alias"></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type="text" bind:value={password} placeholder="Passphase"></td>
        </tr><tr>
            <td>
                <button on:click={btnregister}>Register</button>
            </td><td style=" text-align: center;">
                <button on:click={btnlogin}>Login</button>
                <button on:click={clickForgot}>Forgot</button>
            </td>
        </tr>
    </table>
    
    {#if showModal}
    <ModalComponent on:close="{()=> {showModal=false;}}">
        <h2 slot="header">
            Message:
        </h2>

        <div slot="body">
            {message}
        </div>
    </ModalComponent>
    {/if}
</div>