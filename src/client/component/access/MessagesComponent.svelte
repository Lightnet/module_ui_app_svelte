<script>
    import { onMount, onDestroy } from 'svelte';
    import { gun, onUserName } from '../../mjs.js';

    let messages=[];
    let contacts=[];
    let bdisplaycontact=true;
    let alias='';
    let publickey='BS--EegYmTqQOmgPm-VXlIa6ZGjCt37ohqkpDTdO5Xo.1EmRqLHjuBy5wymWxkg9URmytpdYK8C792-9SgTZtjc';
    let messagesubject='test';
    let messagecontent='test';
    let selectitem='';
    let bfound=false;
    let statussearch='Normal';
    let chatboxheight=134;
    let chatmessageheight=136;

    //const onUserNameUnsubscribe = onUserName.subscribe(value => {
		//console.log(value);
		//username = value;
    //});
    
    onMount(()=>{
        UpdateContactList();
    })

    onDestroy(()=>{
        //onUserNameUnsubscribe();
    });

    function togglecontact(){
        if(bdisplaycontact){
            bdisplaycontact = false;
        }else{
            bdisplaycontact = true;
        }
    }
    async function sendprivatemessage(){
        let user = gun.user();
        //let gun = this.$gun;
        //let userprivatemessageid = await user.get('privatemessage').get('key').then();//create private message table incase of spam
        //create it
        if(!user.is){ return }//check if user exist
        let pub = (publickey || '').trim();
        let message = (messagecontent || '').trim();
        if(!message) return;//check if not message empty
        if(!pub) return;//check if not id empty
        let to = gun.user(pub);//get alias
        let who = await to.then() || {};//get alias data
        if(!who.alias){
            //console.log("No Alias!");
            return;
        }
        //console.log(who);
        //user._.sea = pair()
        console.log(user._.sea)
        let sec = await Gun.SEA.secret(who.epub, user._.sea); // Diffie-Hellman
        let enc = await Gun.SEA.encrypt(message, sec); //encrypt message
        //console.log(to);
        user.get('messages').get(pub).set(enc);
        //messagecontent = '';
    }

    async function viewprivatemessages(){
        console.log("view messages");
        let user = gun.user();
        //let gun = this.$gun;
        messages = [];
        //let userprivatemessageid = await user.get('privatemessage').get('key').then();//create private message table incase of spam
        //create it
        if(!user.is){ return }//check if user exist
        let pub = (publickey || '').trim();
        //let message = (this.messagecontent || '').trim();
        //if(!message) return;//check if not message empty
        if(!pub) return;//check if not id empty
        let to = gun.user(pub);//get alias
        let who = await to.then() || {};//get alias data
        if(!who.alias){
            console.log("No Alias!");
            messages = [];
            return;
        }
        UI.dec = await Gun.SEA.secret(who.epub, user._.sea); // Diffie-Hellman
        //console.log(user);
        //this.UI.alias = user.is.alias;
        console.log("getting message");
        //user.get('messages').off();
        user.get('messages').get(pub).map().once((data,id)=>{
            UI(data,id,user.is.alias)
        });
        //console.log(to);
        //this.UI.alias = who.alias;
        //to.get('messages').off();
        to.get('messages').get(user._.sea.pub).map().once((data,id)=>{
            UI(data,id,who.alias)
        });
        console.log("end messages");
    }
    async function UI(say, id, alias){
        //console.log("test????");
        say = await Gun.SEA.decrypt(say, UI.dec);
        //var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
        //$(li).text(say);
        //console.log(say);
        //console.log(id);
        messages.push({id:id,alias:alias,message:say});
        messages =messages;
        let element = document.getElementById("messagebox");
        element.scrollTop = element.scrollHeight;
    }

    function UpdateContactList(){
        //let self = this;
        let user = gun.user();
        contacts = [];

        user.get('contact').once().map().once((data,id)=>{
            //console.log(data);
            if(!data.alias)//check for name to exist
                return;
            //var option = $('#' + id).get(0) || $('<option>').attr('id', id).appendTo('#contacts');//check if option id exist else create.
            if(data){
                if(data == 'null'){
                    //$(option).hide();//hide element
                }
                //console.log('data',data);
                contacts.push({id:id,alias:data.alias,pub:data.pub});
                contacts = contacts;
                console.log({id:id,alias:data.alias,pub:data.pub});
                //$(option).text(data.name);//set text
            } else {
                //$(option).hide();//hide element
            }
        });
    }

    function selectcontact(event){
        //console.log("event");
        //console.log(event.target);
        //console.log(this.selectitem);
        publickey = selectitem;
        checkalias();
    }

    async function addcontact(){
        console.log("addcontact");
        if (bfound == false)
            return;
        let user = gun.user();
        user.get('contact').get(alias).put({alias:alias,pub:publickey});
        //this.publickey = '';
        //console.log("Add Contact");
        UpdateContactList();
    }

    function removecontact(){
        if (bfound == false)
            return;
        let user = gun.user();
        user.get('contact').get(alias).put('null');//null contact list match id
        UpdateContactList();
    }

    async function checkalias(event){
        //console.log("typing...");
        //console.log(event.target.value);
        let pub = null;
        if (event == null){
            pub = publickey;
        }else{
            pub = event.target.value;
        }
        let to = gun.user(pub);
        let who = await to.get('alias').then();
        if(!who){
            statussearch = 'No Alias!';
            bfound = false;
            return;
        }else{
            statussearch = 'Found! ' + who;
            bfound = true;
            publickey = pub;
            alias = who;
        }
        console.log("checking message...");
        viewprivatemessages();
    }
    //on:keyup={sendprivatemessage}
</script>

<style>
    .chatmessage{
        position: fixed;
        width:100%;
        height:200px;
        top:250px;
    }

    .chatbox{
        width:100%;
        height:100%;
    }

</style>

<div id="chatmessagebox" class="chatmessage">
    <div id="messagebox" class="chatbox" style="background-color:#aaa;overflow-y: scroll;">
        Message(s):
        {#each messages as item}
            <div>
                { item.alias } | > | { item.message }
            </div>
        {/each}
    </div>
    <div class="col" style="width:100px; background-color:#bbb;"></div>
</div>
<div style="height:70px;width:100%;background-color:gray;padding: 4px;">
    <button on:click={togglecontact}>Contact</button>
        {#if bdisplaycontact == true}
            <select type="text" bind:value={selectitem} on:change={selectcontact}>
                <option selected="true"> None </option>
                {#each contacts as item}
                    <option value={item.pub}> {item.alias}</option>
                {/each}
                <!--<option v-for="item in contacts" :key="item.id" v-bind:value="item.pub"> {item.alias}}</option>-->
            </select>
            Public Key:
            <input type="text" bind:value={publickey} on:keyup={checkalias}>
            <button on:click={addcontact}>Add</button>
            <button on:click={removecontact}>Remove</button>
        {/if}
    <label>Status:{statussearch}</label>

    <table>
        <tr>
            <td>
                Content:
            </td>
        </tr>
        <tr>
            <td>
                <textarea bind:value={messagecontent}  /> 
            </td>
        </tr>
        <tr>
            <td>
                <button on:click={sendprivatemessage}>Send</button>
            </td>
        </tr>
    </table>
    
</div>