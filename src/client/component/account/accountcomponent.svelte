<script>
//https://svelte.dev/docs#setContext
    import { UserName, SessionHash, CharacterName, AccessLevel} from '../../stores.js';
    //let username = "Guest";
    //let charactername = "Guest Name";
    //let accesslevel = "member";
</script>
<style>
</style>

<div>[ Account ]
<a href="/#"> Profile </a>
<a href="/#"> Options </a>
</div>

<p> User Name: {$UserName}</p>
<p> SessionHash {$SessionHash}</p>
<p> Character Name: {$CharacterName}</p>
<p> Rank: {$AccessLevel}</p>
