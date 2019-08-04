<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../../helper/generateid.js';
    import { gun } from '../../../mjs.js';
    import GunQueryComponent from "../gun/GunQueryComponent.svelte";

    //const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);

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

    function btnTest(){
        console.log(gun);
        let user = gun.user();
        console.log(user);
        //gun.get('@').once(function(data, key){//none
            //console.log(data,key);
        //});

        //gun.get('#').once(function(data, key){//none
            //console.log(data,key);
        //});


        //gun.get('~').once(function(data, key){//none
            //console.log(data,key);
        //});

        //gun.get('*').once(function(data, key){//none
            //console.log(data,key);
        //});

        //gun.get('~@test').once(function(data, key){//account auth create if exist
            //console.log(data,key);
        //});

        //gun.get('~Np4cyzLc2O30ml32fsje3hrNXNpDe5OZK-cPuIuG-oI.lohRaxbKr4_ilTB3y7f202mI-Oz17WUH2c_Rb8mFkeo').once(function(data, key){//account auth create if exist
            //console.log(data,key);
        //});

        gun.get('~@test').once(function(data, key){//account auth create if exist
            console.log(data,key);
        });
    }

    function btntestg01(){
        console.log(gun);
        console.log("test1");
        //gun.once(function(data, key){//nope testing...
            //console.log(data,key);
        //});

        //gun.once(function(ack){//nope testing...
            //console.log(ack);
        //});

        //gun.map(function(ack){//nope testing...
            //console.log(ack);
        //});
        //text-encoding
        //node-webcrypto-ossl
        //gun.map().once(function(ack){//nope testing...
            //console.log(ack);
        //});

        //gun.map().once().then(function(ack){//nope testing...
            //console.log(ack);
        //});

        //let gunjson = gun.toJSON();
        //console.log(gunjson);

        gun.get("R").put("test");

    }
</script>

<style>

</style>
<div id="{idcomponent}">
    <button on:click={btnTest}>Test</button>

    <button on:click={btntestg01}>test1</button>

    <GunQueryComponent></GunQueryComponent>
</div>