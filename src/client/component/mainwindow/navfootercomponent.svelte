<script>
    //https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
    //https://www.w3schools.com/howto/howto_js_dropdown.asp
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import mjs from '../../mjs.js';

    export let idassign;
    export let name ="0";
    let MouseRegion = "None";
    let mouse = {x:0,y:0};
    let contextmenu = "";
    
    const dispatch = createEventDispatcher();

    let blogin = false;
    let menus = [];

    const contextmenuunsubscribe = mjs.context.contextmenu.subscribe(event => {
        //console.log(event);
        if(event.sm_context != null){
            contextmenu = event.sm_context;
        }
    });

    function handleMousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'FOOTER'});
    }

    function handle_MousePostion(event){
        //console.log(m);
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    onMount(() => {
        //console.log("onMount");
        //const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
        //photos = await res.json();
        window.addEventListener('mousemove', handle_MousePostion);
    });

    onDestroy(()=>{
        window.removeEventListener('mousemove', handle_MousePostion);
        bloginunsubscribe();
        mouseregionunsub();
        contextmenuunsubscribe();
    });
</script>

<style>
    .navbar {
        overflow: hidden;
        background-color: #212121;
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
        background-color: lightslategrey;
    }
</style>

<div id="{idassign}" on:mousemove={handleMousemove} class="navbar">
    <a href="/#"> {name} </a>
    <label>Status:Normal</label>
    <label> ContextMenu: {contextmenu} </label>
    <label> | x:{mouse.x} y:{mouse.y} |</label>
</div>