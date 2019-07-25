<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, pair } from '../../mjs.js';

    let idcomponent = generateId(20);
    let oldpassphrase="";
    let newpassphrase="";
    let showModal = false;
    let message = "";

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

    function changepassphrase(e){
        let user = gun.user();
        //$("#dialog").dialog('open');
        console.log(user);
        if (user.is ==null){
            //this.$root.$emit('dialogmessage',"Alias is Null");
            return
        }
        //let self = this;
        
        user.auth(user.is.alias, oldpassphrase, (ack) => {//user auth call
            //console.log(ack);
            let status = ack.err || "Saved!";//check if there error else saved message.
            //displayeffectmessage(status);//dsiplay message effect
            console.log(status);
            //this.message = status;
            //$("#dialog").dialog('open');
            //self.$root.$emit('dialogmessage',status);
            showModal = true;
            message = status;
            
        }, {change: newpassphrase});//set config to change password
    }
</script>

<style>

</style>
<div id="{idcomponent}">
    Change Passphrase:
    <table>
    <tr>
        <td>Passphrase</td>
        <td><input bind:value={oldpassphrase} ></td>
    </tr>
    <tr>
        <td>New Passphrase</td>
        <td><input bind:value={newpassphrase} ></td>
    </tr>
    <tr>
        <td></td>
        <td><button on:click={changepassphrase} >Change</button></td>
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