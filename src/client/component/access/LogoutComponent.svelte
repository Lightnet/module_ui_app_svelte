<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import { gun, onLogout } from '../../mjs.js';

    const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);
    
    onMount(async () => {
        //console.log("mount")
        //console.log(gun);
        let user = gun.user();
        //console.log(gun.user())
        //console.log(user);
        //console.log("user");
        //console.log(user._);

        if(user.is){
            console.log("logout");
            //user.leave({},ack=>{
                //console.log(ack);
            //});
            //user.leave().then(ack=>{ //get user data
                //console.log(ack);
            //});
            user.leave();
            onLogout();
            dispatch('hevent','profile');
        }
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
       //console.log("onDestroy")
    });
</script>

<style>

</style>
<div id="{idcomponent}">

</div>