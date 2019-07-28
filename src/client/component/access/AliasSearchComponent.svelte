<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import { gun } from '../../mjs.js';
    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);
    let publickey = "uPrVZC0gZ_ZFO6sVtHlXQLpRv4dIr5XXQdqmB16lvH8.yMHCDgghJ6TyejUic-u-mIBUo36cQaPWW059HFfrIW4";

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

    async function checkprofile_alias(){
        if(publickey == ""){
            console.log("none!");
            return;
        }
        let user = gun.user();
        //console.log(user);
        //publickey = "";
        let to = gun.user(publickey);
        //console.log(to);
        to.get("profile").get("alias").decryptdata(to,ack=>{
            console.log(ack);
        });

        //to.get("profile").get("alias").decryptdata();


        //let proalias = to.get("profile").get("alias").decryptdata();
        //let proalias = to.get("profile").get("alias");
        //console.log(proalias)
        //console.dir(proalias)

        //.decryptdata();
        //let to = gun.user(publickey);
        //console.log(to);

        //let aliasl = await to.get("profile").get("alias").then();
        //console.log(aliasl);









        //console.log(user.is);
        //to.get("profile").get("alias").once((ack)=>{
            //console.log(ack);
        //});


        //{ ok code here... self
        //let v = await to.get("profile").get("alias").then();
        //console.log(v);
        //v = "SEA"+ JSON.stringify(v);
        //console.log(v);
        //let mix;
        //let key;
        //mix = "v1cKN214dvZdXDac";
        //key = await Gun.SEA.decrypt(v, mix);
        //console.log(key);
        //}

        /* //some what work
        let v = await to.get("profile").get("alias").then();
        console.log(v);
        v = "SEA"+ JSON.stringify(v);
        let path = "aliasprofile~uPrVZC0gZ_ZFO6sVtHlXQLpRv4dIr5XXQdqmB16lvH8.yMHCDgghJ6TyejUic-u-mIBUo36cQaPWW059HFfrIW4";
        let key = await to.get('trust').get(pair.pub).get(path).then();
        key = "SEA"+ JSON.stringify(key);
        console.log(key);
        let sec = await SEA.decrypt(key, pair);
        let mvalue = await SEA.decrypt(v, sec);
        console.log(sec);
        console.log(mvalue);
        */







        //to.get('trust').get(pair.pub).get(path).once((data,key)=>{
            //console.log(data,key);
        //})
        //to.get('trust').map().once((data,key)=>{
            //console.log(data,key);
        //})
        //to.get('trust').get(pair.pub).once((data,key)=>{
            //console.log(data,key);
        //});
        //let mix;
        //mix = await Gun.SEA.secret(await to.get('epub').then(), user._.sea);
        

        //user.get("profile").get("alias").decryptget("alias",(ack)=>{
            //console.log("ACK:", ack);
        //});
    }

</script>

<style>

</style>
<div id="{idcomponent}">
    <button on:click={checkprofile_alias}>Alias</button><input bind:value={publickey}>

</div>