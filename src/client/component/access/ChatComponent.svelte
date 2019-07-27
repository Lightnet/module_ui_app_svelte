<script>
    import { onMount, onDestroy } from 'svelte';
    import { onUserName } from '../../mjs.js';
    import { gun } from '../../mjs.js';
    //let username = "Guest";

    //const onUserNameUnsubscribe = onUserName.subscribe(value => {
		//console.log(value);
		//username = value;
	//});

    onDestroy(()=>{
        //onUserNameUnsubscribe();
    });

</script>
<label>User: </label>