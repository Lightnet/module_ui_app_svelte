<script>
    import { onMount, onDestroy } from 'svelte';
    import { generateId } from '../../helper/generateid.js';
    import { onPub } from '../../../mjs.js';

    let publickey = generateId(20);
    let pub = "";

    const onPubUnsubscribe = onPub.subscribe(value => {
		  //console.log(value);
		  pub = value;
	  });

    onDestroy(()=>{
        onPubUnsubscribe();
        pub=null;
        publickey=null;
    });

    function copykey(){
      let CodeToCopy = document.getElementById(publickey);
      CodeToCopy.select();
      document.execCommand('copy');
    }

</script>
<label>Public Key:<input id="{publickey}" bind:value={pub} readonly></label><button on:click={copykey}>Copy</button>