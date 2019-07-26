<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import { gun, onUserName } from '../../mjs.js';
    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);

    let statussearch='Normal';
    let bfound='';
    let alias='';
    let publickey='';
    let contacts=[];
    let selectitem='';
    
    onMount(() => {
        //console.log("mount")
        //console.log("access?");
        UpdateContactList();
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
       //console.log("onDestroy")
    });

    function UpdateContactList(){
        //let self = this;
        let user = gun.user();
        contacts = [];

        let contact = user.get('contact').once().map().once((data,id)=>{
            console.log(data);
            console.log(id);

            if(data == null){
                return;
            }
            if(!data.alias)//check for name to exist
                return;
            //var option = $('#' + id).get(0) || $('<option>').attr('id', id).appendTo('#contacts');//check if option id exist else create.
            if(data){
                if(data == 'null'){
                    //$(option).hide();//hide element
                    return;
                }
                //console.log('data',data);
                contacts.push({id:id,alias:data.alias,pub:data.pub});
                contacts = contacts;
            }
        });

        //contact.off();
    }

    function selectcontact(event){
        //console.log("event");
        //console.log(event);
        //console.log(selectitem);
        publickey = selectitem;
        console.log(publickey);
        checkalias();
    }

    async function addcontact(){
        console.log("added");
        if((publickey == "") || (publickey.length == 0)){
            console.log("empty key!");
        }

        if (bfound == false){
            return;
        }
        let user = gun.user();
        user.get('contact').get(alias).put({alias:alias,pub:publickey});
        //publickey = '';
        //console.log("Add Contact");
        UpdateContactList();
    }
    function removecontact(){
        if (bfound == false)
            return;
        let user = gun.user();
        console.log(alias);
        user.get('contact').get(alias).put('null');//null contact list match id
        UpdateContactList();
    }
    async function checkalias(event){
        //console.log("typing...");
        //console.log(event.target.value);
        let pub = publickey;

        console.log(pub);
        let to = gun.user(pub);
        let who = await to.get('alias').then();
        //console.log(who);
        if(!who){
            statussearch = 'No Alias!';
            bfound = false;
            //publickey = '';
            //alias = '';
            return;
        }else{
            statussearch = 'Found! ' + who;
            bfound = true;
            publickey = pub;
            alias = who;
            console.log(pub);
            //this.$emit('publickey',this.publickey);
        }
    }
</script>

<style>

</style>
<div id="{idcomponent}">
 Contacts:
    <select bind:value={selectitem} on:change={selectcontact}>
        <option>None</option>
        {#each contacts as item}
            <option value={item.pub}> {item.alias}</option>
        {/each}
    </select>
    <button on:click={addcontact}>Add</button>
    <input bind:value={publickey} on:keyup={checkalias}>
    <button on:click={removecontact}>Remove</button>
    <label>Status: {statussearch}</label>
</div>