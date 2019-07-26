<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, pair } from '../../mjs.js';

    let idcomponent = generateId(20);
    let Alias = "";
    let aliasinput = "";
    let Question1 = "";
    let Question2 = "";
    let Hint = "";
    let publickey = "";
    let statusdisplay = "None";
    let showModal = false;
    let message = "";
    let bverify = false;

    const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});

    async function checkAlias(){
        let alias = await gun.get('~@'+aliasinput).then(); //broken or remove?
        console.log(alias);
        if(!alias){
            statusdisplay = 'Not Found!';
            bverify = false;
            return;
        }else{
            statusdisplay = 'Found!';
            bverify = true;
        }
        //let publickey = '';
        for(var obj in alias){
            console.log(obj);
            publickey = obj;
        }
        publickey = publickey.substring(1,publickey.length);//remove ~ string begin
    }
    
    onMount(() => {
        //console.log("mount")
        //console.log("access?");
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
       //console.log("onDestroy")
       Hint="";
    });

    async function btngethint(e){
        //console.log(e);
        let q1 =  (Question1 || '').trim(); //get q1 input
        let q2 = (Question2 || '').trim(); //get q2 input

        console.log("11");
        if((!q1)||(!q2)){
            //console.log('Q Empty!');
            message="Question (1 || 2) Empty!";
            showModal=true;
            return;
        }

        if(bverify == false){
            message="Alias Not Verify!";
            showModal=true;
            return;
        }
        
        //console.log("============");
        //console.log(publickey);
        let to = gun.user(publickey);
        let who = await to.get('alias').then();
        if(!who){
            //console.log(who);
            console.log('Not Alias!');
            showModal=true;
            message="Not Alias!";
            return;
        }
        let hint = await to.get('hint').then();
        let dec = await Gun.SEA.work(q1,q2);//get q1 and q2 string to key hash
        hint = await Gun.SEA.decrypt(hint,dec);//get hint and key decrypt message
        if(hint !=null){//check if hint is string or null
            //$('#hint').val(hint);//get hint and set input value
            Hint = hint;
        }else{
            //$('#hint').val('Fail Decrypt!');//if null set input to message user.
            //Hint = 'Fail Decrypt!';
            message="Fail Decrypt!";
            showModal=true;
        }
    }

    function btncancel(e){
        dispatch("hevent",{action:"forgotclose"});
    }
</script>

<style>

</style>
<div id="{idcomponent}">
    <table>
        <tr>
            <td>Alias:</td>
            <td><input type="text" on:keyup={checkAlias} bind:value={aliasinput} placeholder="Alias"> Status: {statusdisplay}</td>
        </tr>
        <tr>
            <td>Question #1:</td>
            <td><input type="text" bind:value={Question1} placeholder="Question"></td>
        </tr>
        <tr>
            <td>Question #1:</td>
            <td><input type="text" bind:value={Question2} placeholder="Question"></td>
        </tr>
        <tr>
            <td>Hint:</td>
            <td><input type="text" bind:value={Hint} placeholder="Hint"></td>
        </tr>
        <tr>
            <td>
            </td><td style=" text-align: center;">
                <button on:click={btngethint}>Get Hint</button>
                <button on:click={btncancel}>Cancel</button>
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