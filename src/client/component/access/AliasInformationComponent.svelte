<script>
    import { onMount, onDestroy } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, pair } from '../../mjs.js';

    let idcomponent = generateId(20);
    let alias = "";
    let born = "";
    let education = "";
    let skills = "";

    let show_grant_Modal = false;
    let show_access_Modal = false;
    let show_revoke_Modal = false;
    let show_revokekey_Modal = false;
    let profileparam = "";
    let publickey = "";
    let access_message="";
    let showModal = false;
    let message = "";

    onMount(async () => {
        //console.log(gun);
        //let user = gun.user()
        //console.log(user._.sea);
        let user = gun.user();
        //console.log(profi);
        user.get('profile').get('alias').decryptvalue(ack=>{
            //console.log("???");
            //console.log(ack);
            alias= ack;
        });
        //,{sharekeytype:"graph"}

        user.get('profile').get('born').decryptvalue(ack=>{
            //console.log("???");
            //console.log(ack);
            born= ack;
        });

        user.get('profile').get('education').decryptvalue(ack=>{
            //console.log("???");
            //console.log(ack);
            education= ack;
        });

        user.get('profile').get('skills').decryptvalue(ack=>{
            //console.log("???");
            //console.log(ack);
            skills= ack;
        });
    });

    onDestroy(() => {
       //console.log("onDestroy")
    });

    async function inputalias(event){
        //console.log(event);
        console.log("typing...");
        let user = gun.user();
        user.get('profile').get('alias').encryptput(alias);
    }

    async function decryptalias(event){
        let user = gun.user();
        user.get('profile').get('alias').decryptget('alias',ack=>{
            console.log("???")
            console.log(ack);
        });
    }

    function aliasrevokekey(){
        let user = gun.user();
        if((publickey != "")||(publickey.length == 0)){
            return;
        }
        let to = gun.user(publickey);
        user.get('profile').get('alias').revokekey(to);
    }

    async function getaliaskey(event){
        let user = gun.user();
        user.get('profile').get('alias').secretgetkey('alias');
    }

    async function inputborn(event){
        let user = gun.user();
        //user.get('profile').get('born').secret(this.born,ack=>{
            //console.log(ack);
        //});
        user.get('profile').get('born').encryptput(born);
        //user.get('profile').get('born').put(born);
        console.log("born");
    }
    async function inputeducation(event){
        let user = gun.user();
        //user.get('profile').get('education').secret(this.education,ack=>{
            //console.log(ack);
        //});
        user.get('profile').get('education').encryptput(education);
        //user.get('profile').get('education').put(education);
        console.log("education");
    }
    async function inputskills(event){
        //console.log("enter",event.target.value);
        let user = gun.user();
        user.get('profile').get('skills').encryptput(skills);
        //user.get('profile').get('skills').put(skills);
        console.log("skills");
    }

    function btngrant(param){
        console.log(param);
        profileparam = param;
        show_grant_Modal = true;
    }

    function btnrevoke(param){
        console.log(param);
        profileparam = param;
        show_revokekey_Modal = true;
    }

    async function btnCheckGrant(){
        show_grant_Modal=false;
        show_access_Modal=true;
        //Zf3MC4zSKx9brn3LSRN0bobf3dCUvWyDZG40ioiRj2c.PL7ChkXlFyCK5CFbJibhd2bpw2fpfSxxSLmGnh1LkOg
        let key = publickey;
        //console.log(key);
        let to = gun.user(key);
        let who = await to.get('alias').then();
        if((!who)||(key.length == 0)){
            console.log('No Alias!');
            message = "No Alias!";
            showModal = true;
            //alert('No Alias!');
        }else{
            //AliasTag
            //console.log(who);
            access_message = who;
            show_access_Modal = true;
        }

        console.log("check");
    }

    async function btnCheckRevoke(){
        show_revokekey_Modal=false;
        show_revoke_Modal=true;

        let key = publickey;
        //console.log(key);
        let to = gun.user(key);
        let who = await to.get('alias').then();
        if((!who)||(key.length == 0)){
            console.log('No Alias!');
            message = "No Alias!";
            showModal = true;
            //alert('No Alias!');
        }else{
            //AliasTag
            //console.log(who);
            access_message = who;
            //show_revokekey_Modal = true;
        }
    }

    function btnRevokeAccess(){
        show_revoke_Modal=false;

        let user = gun.user();
        //console.log(user);
        let key = publickey;
        let to = gun.user(key);
        //user.get('profile').get(this.profiledata).grant(to);
        user.get('profile').get(profileparam).revokekey(to);

        console.log("finish");
    }



    function btnAllowAccess(){
        show_access_Modal=false;

        let user = gun.user();
        //console.log(user);
        let key = publickey;
        let to = gun.user(key);
        //user.get('profile').get(this.profiledata).grant(to);
        user.get('profile').get(profileparam).grantkey(to);

        console.log("finish");
    }

</script>

<style>

</style>
<div id="{idcomponent}">
    Profile Information:: (Typing will update profile information.)
    <table>
        <tr>
            <td>Alias</td>
            <td><input type="text" on:keyup={inputalias} bind:value={alias}>
            <button on:click={()=>btngrant('alias')}>+</button>
            <button on:click={()=>btnrevoke('alias')}> Revoke </button>
            </td>
        </tr>
        <tr>
            <td>Born</td>
            <td>
                <input type="text" on:keyup={inputborn} bind:value={born}>
                <button on:click={()=>btngrant('born')}>+</button>
                <button on:click={()=>btnrevoke('born')}> Revoke </button>
            </td>
        </tr>
        <tr>
            <td>Education</td>
            <td>
                <input type="text" on:keyup={inputeducation} bind:value={education}>
                <button on:click={()=>btngrant('education')}>+</button>
                <button on:click={()=>btnrevoke('education')}> Revoke </button>
            </td>
        </tr>
        <tr>
            <td>Skills</td>
            <td>
                <input type="text" on:keyup={inputskills} bind:value={skills}>
                <button on:click={()=>btngrant('skills')}>+</button>
                <button on:click={()=>btnrevoke('skills')}> Revoke </button>
            </td>
        </tr>
    </table>

    {#if show_grant_Modal}
    <ModalComponent on:close="{()=> {show_grant_Modal=false;}}">
        <h2 slot="header">
            Grant:
        </h2>

        <div slot="body">
            Public Key: <input bind:value={publickey}>
        </div>

        <div slot="footer">
            <button on:click={btnCheckGrant}>Confirm</button><button on:click={()=>{show_grant_Modal=false;}}>Cancel</button>
        </div>

    </ModalComponent>
    {/if}


    {#if show_revokekey_Modal}
    <ModalComponent on:close="{()=> {show_revokekey_Modal=false;}}">
        <h2 slot="header">
            Revoke access:
        </h2>

        <div slot="body">
            Public Key: <input bind:value={publickey}>
        </div>
        <div slot="footer">
            <button on:click={btnCheckRevoke}>Confirm</button><button on:click={()=>{show_revokekey_Modal=false;}}>Cancel</button>
        </div>
    </ModalComponent>
    {/if}

    {#if show_revoke_Modal}
    <ModalComponent on:close="{()=> {show_revoke_Modal=false;}}">
        <h2 slot="header">
            Alias to:
        </h2>

        <div slot="body">
            {access_message}
        </div>
        <div slot="footer">
            <button on:click={btnRevokeAccess}>Confirm</button><button on:click={()=>{show_revoke_Modal=false;}}>Cancel</button>
        </div>
    </ModalComponent>
    {/if}

    {#if show_access_Modal}
    <ModalComponent on:close="{()=> {show_access_Modal=false;}}">
        <h2 slot="header">
            Alias to:
        </h2>

        <div slot="body">
            {access_message}
        </div>
        <div slot="footer">
            <button on:click={btnAllowAccess}>Confirm</button><button on:click={()=>{show_access_Modal=false;}}>Cancel</button>
        </div>
    </ModalComponent>
    {/if}

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