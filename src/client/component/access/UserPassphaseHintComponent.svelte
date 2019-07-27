<script>
    import { onMount, onDestroy } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, pair } from '../../mjs.js';

    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);
    let question1 = "t";
    let question2 = "e";
    let hint = "s";
    let showModal = false;
    let message = "";

    async function getchangehint(){
        //console.log("get data");
        let user = gun.user();
        let sec = await Gun.SEA.secret(user.is.epub, pair());//get user for encrypt message
        //console.log(sec);

        question1 = await user.get('forgot').get('q1').then();
        question1 = await Gun.SEA.decrypt(question1, sec);//encrypt hint

        question2 = await user.get('forgot').get('q2').then();
        question2 = await Gun.SEA.decrypt(question2, sec);//encrypt hint

        sec = await Gun.SEA.work(question1,question2);//encrypt key
        hint = await user.get('hint').then();
        //console.log(this.hint);
        hint = await Gun.SEA.decrypt(hint, sec);//encrypt hint
    }
    
    onMount(() => {
        //console.log("mount")
        //console.log("access?");
        getchangehint();
    });

    onDestroy(() => {
       //console.log("onDestroy")
       question1="";
       question2="";
       hint="";
       message="";
    });

    async function clickchangehint(e){
            let user = gun.user();
            //let self = this;

            //console.log(pair());
            //console.log(user.is);
            
            let q1 = question1; //get input q1
            let q2 = question2;//get input q2
            console.log(question1,question2,hint);
            //let hint = this.hint;//get input hint
            let sec = await Gun.SEA.secret(user.is.epub, pair());//get user for encrypt message
            let enc_q1 = await Gun.SEA.encrypt(q1, sec);//encrypt q1
            user.get('forgot').get('q1').put(enc_q1);//set hash q1 to user data store
            let enc_q2 = await Gun.SEA.encrypt(q2, sec);//encrypt q1
            user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
            sec = await Gun.SEA.work(q1,q2);//encrypt key
            //console.log(sec);

            console.log(Gun.SEA);
            
            let enc = await Gun.SEA.encrypt(hint, sec);//encrypt hint
            console.log(enc);
            user.get('hint').put(enc,ack=>{//set hash hint
                console.log(ack);
                if(ack.err){
                    console.log("Error!");
                    message = ack.err;
                    showModal = true;
                    return;
                }
                //if(ack.ok){
                    //displayeffectmessage('Hint Apply!'); //display message effects
                    //self.$root.$emit('dialogmessage','Hint Apply!');
                    console.log('Hint Apply!');
                    message = 'Hint Apply!';
                    showModal = true;
                //}
            });
            
        }
</script>

<style>

</style>
<div id="{idcomponent}">
    Recover Hint Passphase:
    <table>
    <tr>
        <td>Question 1</td>
        <td><input bind:value={question1} placeholder="Question #1"></td>
    </tr>
    <tr>
        <td>Question 1</td>
        <td><input bind:value={question2} placeholder="Question #1"></td>
    </tr>
    <tr>
        <td>Hint</td>
        <td><input bind:value={hint} placeholder="Hint"></td>
    </tr>
    <tr>
        <td></td>
        <td><button on:click={clickchangehint}>Sumbit</button></td>
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