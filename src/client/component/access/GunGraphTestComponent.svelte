<script>
    import { onMount, onDestroy } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../helper/generateid.js';
    import { gun, pair } from '../../mjs.js';




    onMount(()=>{
        //gun.get("RVALUE").put("test");
    });


    function btnClick01(){
        console.log(gun);
    }

    function btnset(){
        console.log(gun);
        gun.get("RVALUE").encryptput("test",ack=>{
            console.log(ack)
        });
    }

    function btnget(){
        console.log(gun);
        gun.get("RVALUE").decryptvalue(ack=>{
            console.log(ack);
        });
    }

    function btndata(){
        console.log(gun);
        gun.get("RVALUE").once(ack=>{
            console.log(ack);
        });
    }

    function btntrustdata(){
        console.log(gun);
        gun.get("RVALUE")
            .get('trust')
            .get('uPrVZC0gZ_ZFO6sVtHlXQLpRv4dIr5XXQdqmB16lvH8.yMHCDgghJ6TyejUic-u-mIBUo36cQaPWW059HFfrIW4')
            .get('RVALUE')
            //.put('test');
            .once(ack=>{
                console.log(ack);
            });
    }

</script>
<button on:click={btnClick01}>Test</button>
<button on:click={btnset}>Set</button>
<button on:click={btnget}>Get</button>
<button on:click={btndata}>data</button>

<button on:click={btntrustdata}>trust data</button>