<script>
//https://svelte.dev/docs#setContext
    import { UserName } from '../../stores.js';

    //let username = "Guest";
    //let charactername = "Guest Name";
    //let accesslevel = "member";
</script>
<style>

</style>
<!--
<h1>The count is {$count}</h1>
-->
[ News ]
<p> Hello {$UserName}!</p>

