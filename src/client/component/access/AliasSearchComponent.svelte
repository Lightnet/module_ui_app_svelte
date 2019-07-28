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
        let pair = user._.sea;

        let to = gun.user(publickey);
        console.log(to);
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


        let path = "aliasprofile~uPrVZC0gZ_ZFO6sVtHlXQLpRv4dIr5XXQdqmB16lvH8.yMHCDgghJ6TyejUic-u-mIBUo36cQaPWW059HFfrIW4";
        let key = await to.get('trust').get(pair.pub).get(path).then();
        key = "SEA"+ JSON.stringify(key);
        console.log(key);



        //let epub = await to.get('pub').then();
        //console.log("epub",epub);
        let mix = await Gun.SEA.secret(await to.get('epub').then(), user._.sea);
        

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