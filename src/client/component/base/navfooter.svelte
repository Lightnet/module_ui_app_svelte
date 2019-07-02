<script>
    //https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
    //https://www.w3schools.com/howto/howto_js_dropdown.asp
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    //import { createEventDispatcher } from 'svelte';

    import { count, UserName, SessionHash, Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    export let name ="0";
    let MouseRegion = "None";
    
    const dispatch = createEventDispatcher();

    let blogin = false;
    let menus = [];

    const bloginunsubscribe = Sl_blogin.subscribe(value => {
        blogin = value;
        //console.log(value);
    });

    const mouseregionunsub = Sl_Mouseregion.subscribe(value => {
        MouseRegion = value;
        //console.log(value);
    });
//===============================================
// onMount
//===============================================
    onMount(async () => {
        //console.log("onMount");
        //const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
        //photos = await res.json();
    });

    function handleMousemove(event){
        //console.log(m);
        Sl_Mouseregion.set("footer");
    }
</script>

<style>
    .navbar {
        overflow: hidden;
        background-color: #333;
        font-family: Arial, Helvetica, sans-serif;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .navbar a {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar label {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar a:hover {
        background-color: red;
    }
</style>

<div on:mousemove={handleMousemove} class="navbar">
    <a href="/#"> {name} </a>
    <label>Status:Normal</label>
    <label>Mouse Region:{MouseRegion}</label>
</div>