<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { count, UserName, SessionHash, Sl_blogin } from '../../stores.js';

    const dispatch = createEventDispatcher();

    export let name;
    export let id;

    let btoggle = false;

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function togglecontent() {
		console.log("toggle");
        btoggle = !btoggle;
    }
</script>


<style>
    .dropdown {
        float: left;
        overflow: hidden;
    }

    .dropdown .dropbtn {
        cursor: pointer;
        font-size: 12px;  
        border: none;
        outline: none;
        color: white;
        padding: 4px 4px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
    }

    .navbar a:hover, .dropdown:hover .dropbtn, .dropbtn:focus {
        background-color: red;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        color: black;
        padding: 4px 4px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .show {
        display: block;
    }
</style>

<div class="dropdown">
    <button class="dropbtn" on:click={()=>{togglecontent()}}>Dropdown
        <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content {btoggle === true ? 'show' : ''}" id="myDropdown">
        <a href="/#">Link 1</a>
        <a href="/#">Link 2</a>
        <a href="/#">Link 3</a>
    </div>
</div>