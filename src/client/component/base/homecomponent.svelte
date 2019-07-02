<script>
//https://svelte.dev/docs#setContext
    import { UserName } from '../../stores.js';

    //let username = "Guest";
    //let charactername = "Guest Name";
    //let accesslevel = "member";
</script>
<style>

</style>
[ Home ]
<p> Hello {$UserName}!</p>

