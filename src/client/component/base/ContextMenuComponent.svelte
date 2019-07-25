<script>
    //https://dev.to/iamafro/how-to-create-a-custom-context-menu--5d7p
    //https://jsfiddle.net/softvar/6ny94/
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    //import { UserName } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    let div1;
    let div2;
    let m = {x:0,y:0};
    let bresize = false;

    //let idmenu = generateId(20);
    let idmenu = "contextmenu"
    let menu;

    let itemlist = {}
    let MouseRegion = "";
    let contextmenu;

    const contextmenuunsubscribe = mjs.context.contextmenu.subscribe(event => {
        //console.log(event);
        if(event.sm_context != null){
            contextmenu = event.sm_context;
        }
    });

    //console.log(menu);
    let menuVisible = false;

    const toggleMenu = command => {
        menu.style.display = command === "show" ? "block" : "none";
        menuVisible = !menuVisible;
    };

    const setPosition = ({ top, left }) => {
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
        toggleMenu("show");
    };

    function contextmenuclick(e){
        if(menuVisible)toggleMenu("hide");
    } 

    function updatelist(){
        itemlist = {}
        let count = 0;

        for(var obj in mjs.ops){
			//console.log(obj);
			//if(mjs.ops[obj].sm_context == MouseRegion){
            if(mjs.ops[obj].sm_context == contextmenu){
                count=count + 1
				//accessmenus[obj] = mjs.ops[obj]
				itemlist[obj] = {}
				itemlist[obj].sm_label = mjs.ops[obj].sm_label;
			}
        }
        //console.log(count)
        if(count == 0){
            toggleMenu("hide");
        }
    }

    function handle_contextmenu(e){
        //console.log("contextmenu");
        //e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition(origin);
        updatelist();
        return false;
    }

    onMount(async () => {
        //console.log("onMount");
        menu = document.getElementById(idmenu);
        window.addEventListener("click",contextmenuclick);
        window.addEventListener("contextmenu",handle_contextmenu);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        contextmenuunsubscribe();
        window.removeEventListener("click",contextmenuclick);
        window.removeEventListener("click",handle_contextmenu);
    });
</script>

<style>
    .menuitem {
        list-style:none;
        margin:0px;
        margin-top:4px;
        padding-left:4px;
        padding-right:4px;
        padding-bottom:4px;
        font-size:12px;
        color: #333333;
    }

    .menuitem :hover{
        color: white;
        background:lightslategrey;
        border-radius:2px;
    }

    /*
    hr { width: 85%; 
        background-color:#E4E4E4;
        border-color:#E4E4E4;
        color:#E4E4E4;
    }*/

    .cntnr{
        display:none;
        position:fixed;
        left:0;
        top:0;
        border:1px solid #B2B2B2;
        width:150px;      
        background:#333;
        /*box-shadow: 3px 3px 2px #E9E9E9;*/
        border-radius:4px;
    }

    li{
        text-align: center;
        padding: 3px;
        padding-left:4px;
    }

    li a{
        text-decoration: none;
        display: block;
        font-size: 12px;
        color: white;
    }
</style>

<div id="{idmenu}" class="cntnr">
    <ul id="contextmenulist" class="menuitem">
        {#each Object.keys(itemlist) as item}
            <li><a href="/#" on:click={()=>{mjs.ops[item]()}}>  {itemlist[item].sm_label}</a></li>
            <!--<a href="/#" on:click={ itemlist[item] } > {itemlist[item]}  {itemlist[item].sm_label}</a>-->
        {/each}
        <!--
        <li>Back</li>
        <li>Reload</li>
        <li>Save</li>
        <li>Save As</li>
        <li>Inspect</li>
        -->
    </ul>
</div>