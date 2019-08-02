<script>
    import { onMount, onDestroy } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import { gun } from '../../mjs.js';
    let idcomponent = generateId(20);
    let publickey = "";
    //publickey = "";
    let alias = "";
    let born = "";
    let education = "";
    let skills = "";

    let displaystatus = "Input Public Key!";
    let bpublickey = true;
    
    onMount(() => {
        //console.log("mount")
    });

    onDestroy(() => {
       //console.log("onDestroy")
    });

    async function inputcheck(e){
        let to = gun.user(publickey);
        //console.log(to);
        let aliascheck = await to.get("alias").then();
        //console.log(aliascheck)
        if(aliascheck){
            displaystatus=`Found ${aliascheck}!`;
            bpublickey = true;
        }else{
            displaystatus=`None!`;
            bpublickey = false;
        }
    }

    async function checkprofile_alias(){
        if(!bpublickey){
            console.log("none!");
            return;
        }
        //console.log(gun);
        let user = gun.user();
        //console.log(user);
        //publickey = "";
        let to = gun.user(publickey);
        //console.log(to);
        to.get("profile").get("alias").decryptdata(to,ack=>{
            //console.log(ack);
            alias = ack;
        });

        to.get("profile").get("born").decryptdata(to,ack=>{
            //console.log(ack);
            born = ack;
        });

        to.get("profile").get("education").decryptdata(to,ack=>{
            //console.log(ack);
            education = ack;
        },{sharekeytype:"graph"});

        to.get("profile").get("skills").decryptdata(to,ack=>{
            //console.log(ack);
            skills = ack;
        });
    }

</script>

<style>

</style>
<div id="{idcomponent}">
    
    <table>
    <tr>
        <td>
            <button on:click={checkprofile_alias}>Alias Public Key:</button>
        </td>
        <td>
            <input type="text" bind:value={publickey} on:keyup={inputcheck}> Status: {displaystatus}
        </td>
    </tr>

    <tr>
        <td>
            Alias:
        </td>
        <td>
            <input type="text" bind:value={alias}>
        </td>
    </tr>

    <tr>
        <td>
            born:
        </td>
        <td>
            <input type="text" bind:value={born}>
        </td>
    </tr>

    <tr>
        <td>
            education:
        </td>
        <td>
            <input type="text" bind:value={education}>
        </td>
    </tr>

    <tr>
        <td>
            skills:
        </td>
        <td>
            <input type="text" bind:value={skills}>
        </td>
    </tr>
    
    </table>

</div>