<script>
    import { onMount, onDestroy } from 'svelte';
    import ModalComponent from "../../base/ModalComponent.svelte";
    import { generateId } from '../../helper/generateid.js';
    import { gun, pair } from '../../../mjs.js';

    let keyID = "Q64yIfkgENykj0cu";
    let ValueText = "datarandom";
    let kvalue = "test";
    let publickey = "";
    //publickey ="";

    // Define the string
    //var decodedString = atob(encodedString);
    // Encode the String
    //var encodedString = btoa(string);

    let hashkey = "";

    onMount(()=>{
        //gun.get("RVALUE").put("test");
    });

    function btnTestGun(){
        console.log(gun);
        console.log(Gun.text.random(16));
    }

    async function btnsharekeysetup(){
        gun.get(keyID).put({
            trust:"trust",
            value:"none",
        });
    }

    async function btnsharekeyset(){
        //https://scotch.io/tutorials/how-to-encode-and-decode-strings-with-base64-in-javascript
        //https://www.geeksforgeeks.org/javascript-encode-decode-a-string-to-base64/
        console.log(gun);
        let user = gun.user();
        let pair = user._.sea;
        //console.log(pair);
        let enc, sec;
        sec = await gun.get(keyID).get('trust').get(pair.pub).get(keyID).then();
        console.log(sec);
        if(sec !=null){
            sec = JSON.parse(sec);
            sec = await SEA.decrypt(sec, pair);
        }
        console.log("SECRET",sec);
        if(!sec){
            sec = SEA.random(16).toString();
            enc = await SEA.encrypt(sec, pair);
            enc = JSON.stringify(enc);
            gun.get(keyID).get('trust').get(pair.pub).get(keyID).put(enc);
            //console.log("created finish?");
        }
        enc = await SEA.encrypt(ValueText, sec);
        console.log(enc);
        enc = JSON.stringify(enc);
        //enc = window.btoa(enc);
        //console.log(enc);
        gun.get(keyID).put({value:enc});
        //let v = await gun.get(keyID).get('value').then();
        //console.log(v);
    }

    async function btnsharekeyget(){
        //console.log(gun);
        let user = gun.user();
        let pair = user._.sea;
        //console.log(pair);
        let enc, sec;
        sec = await gun.get(keyID).get('trust').get(pair.pub).get(keyID).then();
        sec = JSON.parse(sec);
        //console.log(sec);
        sec = await SEA.decrypt(sec, pair);
        console.log("SECRET:",sec);
        gun.get(keyID).get('value').once(ack=>{
            console.log(ack);
        });
        let key = await gun.get(keyID).get('value').then();
        console.log(key);
        //key = window.atob(key);
        //console.log(key);
        key = JSON.parse(key);
        //console.log(key);
        //console.log(typeof key);
        let mvalue = await SEA.decrypt(key, sec);
        console.log(mvalue);
    }

    async function btnkeysetvalue(){
        let user = gun.user();
        let pair = user._.sea;
        gun.get(keyID).get('value').put(ValueText);
        console.log(ValueText)
    }

    async function btnkeygetvalue(){
        let user = gun.user();
        let pair = user._.sea;
        let v = await gun.get(keyID).get('value').then();
        console.log(v);
    }

    async function btnkeydata(){
        let user = gun.user();
        let pair = user._.sea;
        gun.get(keyID).once(ack=>{
            console.log(ack);
        });
        let v = await gun.get(keyID).then();
        console.log(v)
    }

    async function btnkeyquery(){
        gun.get(hashkey).once(ack=>{
            console.log(ack);
        });

        let v = await gun.get(hashkey).then();
        console.log(v);
    }


    async function btngrantkey(){
        let to = gun.user(publickey);
        gun.get("yEh5TG412ppoqXTm").get('key').grantkey(to);
    }

    async function btnrevokekey(){
        let to = gun.user(publickey);
        gun.get("yEh5TG412ppoqXTm").get('key').revokekey(to);
    }

    async function btndecryptdatauser(){
        let to = gun.user(publickey);
        gun.get("yEh5TG412ppoqXTm").get('key').decryptdata(to,ack=>{
            console.log(ack);
        });
    }

    async function btnencryptput(){
        gun.get("yEh5TG412ppoqXTm").get('key').encryptput(kvalue);
    }

    async function btndecryptvalue(){
        gun.get("yEh5TG412ppoqXTm").get('key').decryptvalue(ack=>{
            console.log(ack);
        });
    }
    async function btndecryptdata(){
        gun.get("yEh5TG412ppoqXTm").get('key').once(ack=>{
            console.log(ack);
        });
    }

</script>
<!--
<br>KEY: <input bind:value={keyID} />
<br>VALUE: <input bind:value={ValueText} />
<button on:click={btnTestGun}>Test gun</button>
<button on:click={btnsharekeyset}>Sharekey Set</button>
<button on:click={btnsharekeyget}>Sharekey Get</button>
<button on:click={btnkeydata}>Key data</button>
KEY Query: <input bind:value={hashkey} />
<br><button on:click={btnkeyquery}>Query</button>
-->
<br>
<br>
<button on:click={btnencryptput}>btnencryptput</button>
<button on:click={btndecryptvalue}>btndecryptvalue</button>
<br>Public Key: <input bind:value={publickey} />
<br>Value: <input bind:value={kvalue} />
<br><button on:click={btngrantkey}>btngrantkey</button>
<button on:click={btnrevokekey}>btnrevokekey</button>
<button on:click={btndecryptdatauser}>btndecryptdatauser</button>
