<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, pair } from '../../mjs.js';
    import DecryptComponent from "./DecryptComponent.svelte";

    let idcomponent = generateId(20);
    let alias = "";
    let born = "";
    let education = "";
    let skills = "";

    let show_grant_Modal = false;
    let profileparam = "";
    let publickey = "";
    let show_access_Modal = false;
    let access_message="";

    let showModal = false;
    let message = "";

    //const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});
    async function searchprofile(){
        let user = gun.user();
        let find = gun.user();
        //console.log(user._.sea);
        find.get('profile').on(function(data, key, at, ev){//get map data
            //console.log(data);
            //console.log(key);
            ev.off(); //pervent loops listen add on?
            Gun.node.is(data, async function(v, k){
                //console.log(k);// variable
                //console.log(v);// crypt
                let key = await find.get('trust').get(user.is.pub).get(k+'profile').then();
                let val;
                //console.log(key);
                //if(key == null){
                    //console.log("trust error!")
                    //return;
                //}
                if(key !=null){
                    let mix = await Gun.SEA.secret(await find.get('epub').then(), user._.sea);
                    //console.log(mix);

                    key = await Gun.SEA.decrypt(key, mix);
                    val = await Gun.SEA.decrypt(v, key);
                }

                if(k == 'alias'){
                    alias = val || v
                }
                if(k == 'born'){
                    born = val || v
                }
                if(k == 'education'){
                    education = val || v
                }
                if(k == 'skills'){
                    skills = val || v
                }
                //console.log(val);
            });
        });
        
    }
    
    onMount(async () => {
        //console.log("mount");
        //alias = await getprofilevar('alias', alias);
        //searchprofile();
        //console.log(gun);
        //console.log(gun.user());
        //let user = gun.user()
        //console.log(user._.sea);
        let user = gun.user();
        //console.log(profi);
        user.get('profile').get('alias').decryptvalue(ack=>{
            //console.log("???");
            //console.log(ack);
            alias= ack;
        });
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
       //console.log("onDestroy")
    });

    async function getprofilevar(_name,_value){
        let user = gun.user();
        let pair = user._.sea;
        //console.log(pair);
        //console.log(user.is.pub);
        let pkey = await user.get('trust').get(pair.pub).get(_name+'profile'+"~"+pair.pub).then();
        pkey =  "SEA"+ JSON.stringify(pkey);
        //let pdata = await user.get('trust').get(pair.pub).then();
        //console.log(pdata);
        console.log(pkey);
        
        pkey = await SEA.decrypt(pkey, pair);
        console.log("pkey",pkey);

        var mix = await Gun.SEA.secret(await user.get('epub').then(), pair);
        console.log("mix",mix);

        pkey = await Gun.SEA.decrypt(pkey, mix);
        console.log("pkey:",pkey);
        
        return _value;
        /*
        console.log(pdata);
        console.log(pkey);
        if(pkey == null){
            console.log("KEY NULL");
            return _value;
        }
        var mix = await Gun.SEA.secret(await user.get('epub').then(), pair);
        console.log("mix",mix)
        let epub = await user.get('epub').then();
        console.log("epub",epub)
        pkey = await Gun.SEA.decrypt(pkey, mix);
        console.log(pkey);
        if(pkey == null){
            console.log("KEY NULL");
            return _value;
        }
        let val = await Gun.SEA.decrypt(_value, pkey);
        console.log(val);
        return val || _value;
        */
	}

    async function inputalias(event){
        //console.log(event);
        console.log("typing...");
        let user = gun.user();
        //user.get('profile').get('alias').put(alias);
        //user.get('profile').get('alias').secret(alias,ack=>{
            //console.log(ack);
        //});
        //user.get('profile').get('alias').put(alias);
        user.get('profile').get('alias').encryptput(alias);
        //user.get('profile').get('alias').accesskey('')
        //console.log(user);
        
        //user.get('profile').accesskey('alias')
        //console.log("alias");
    }

    async function decryptalias(event){
        let user = gun.user();
        //console.log(profi);
        //user.get('profile').get('alias').decryptget('alias',ack=>{
            //console.log("???")
            //console.log(ack);
        //});

        //work but not other user data yet
        //user.get('profile').get('alias').decryptvalue('alias',ack=>{
            //console.log("???")
            //console.log(ack);
        //});

        user.get('profile').get('alias').decryptget('alias',ack=>{
            console.log("???")
            console.log(ack);
        });
    }

    function aliasrevokekey(){

        let user = gun.user();
        publickey = "Zf3MC4zSKx9brn3LSRN0bobf3dCUvWyDZG40ioiRj2c.PL7ChkXlFyCK5CFbJibhd2bpw2fpfSxxSLmGnh1LkOg";
        let key = publickey;
        let to = gun.user(key);
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
        //user.get('profile').get('born').secret(born);
        user.get('profile').get('born').put(born);
        console.log("born");
    }
    async function inputeducation(event){
        let user = gun.user();
        //user.get('profile').get('education').secret(this.education,ack=>{
            //console.log(ack);
        //});
        //user.get('profile').get('education').secret(education);
        user.get('profile').get('education').put(education);
        console.log("education");
    }
    async function inputskills(event){
        //console.log("enter",event.target.value);
        let user = gun.user();
        //user.get('profile').get('skills').secret(this.skills,ack=>{
            //console.log(ack);
        //});
        //user.get('profile').get('skills').secret(skills);
        user.get('profile').get('skills').put(skills);
        console.log("skills");
    }

    function grant(param){
        console.log(param);
        profileparam = param;
        show_grant_Modal = true;
    }

    async function btnCheckGrant(){
        show_grant_Modal=false;
        show_access_Modal=true;

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

    async function btntest(){

        console.log(gun);
        console.log(gun.user());
        let user = gun.user();
        console.log(user.pair());
        //let user = gun.user();
        //console.log(user);
        //console.log(user._.sea);

        //user.recall().then(function(ack){
            //if (!ack || !ack.sea){
                //console.log(ack);
            //}
        //});
    }
</script>

<style>

</style>
<div id="{idcomponent}">
    <button on:click={btntest}>Test</button>
    Profile Information:: (Typing will update profile information.)
    <table>
        <tr>
            <td>Alias</td>
            <td><input type="text" on:keyup={inputalias} bind:value={alias}>
            <button on:click={()=>grant('alias')}>+</button>
            <button on:click={aliasrevokekey}> revoke </button>
            <button on:click={decryptalias}> decrypt </button>
            <button on:click={getaliaskey}> Key </button>
            
            </td>
        </tr>
        <tr>
            <td>Born</td>
            <td><input type="text" on:keyup={inputborn} bind:value={born}><button on:click={()=>grant('born')}>+</button></td>
        </tr>
        <tr>
            <td>Education</td>
            <td><input type="text" on:keyup={inputeducation} bind:value={education}><button on:click={()=>grant('education')}>+</button></td>
        </tr>
        <tr>
            <td>Skills</td>
            <td><input type="text" on:keyup={inputskills} bind:value={skills}><button on:click={()=>grant('skills')}>+</button></td>
        </tr>
    </table>

    <DecryptComponent> </DecryptComponent>

    {#if show_grant_Modal}
    <ModalComponent on:close="{()=> {show_grant_Modal=false;}}">
        <h2 slot="header">
            Grant:
        </h2>

        <div slot="body">
            <input bind:value={publickey}>
        </div>

        <div slot="footer">
            <button on:click={btnCheckGrant}>Confirm</button><button on:click={()=>{show_grant_Modal=false;}}>Cancel</button>
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