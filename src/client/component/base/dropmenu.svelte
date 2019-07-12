<script>
    //https://stackoverflow.com/questions/42737693/is-it-possible-in-svelte-to-have-each-loops-with-two-way-binding-to-nested-obje
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    //import {  Sl_blogin } from '../../stores.js';

    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    export let name = "menu";
    export let id = generateId(20);
    export let prefix = generateId(20);

    export let itemlist = {};
    //let items = {};

    let btoggle = false;

    function onclick(e) {
        //console.log("click");
        //console.log(e.target)
		//if (!e.target.matches('.dropbtn')){
        if (!e.target.matches("#"+name+prefix)){
			//var myDropdown = document.getElementById(iddropmenu);
			//if (myDropdown.classList.contains('show')) {
            if (btoggle == true) {
      			//myDropdown.classList.remove('show');
      			btoggle = false
			}
		}
    }

    //window.onclick = onclick;
    
    onMount(()=>{
        //console.log("mount");
        window.addEventListener("click",onclick);
        //console.log(itemlist);
        //items = itemlist;
        //for(var item in itemlist){
            //console.log(itemlist[item])
        //}
    });

    onDestroy(()=>{
        //console.log("destroy");
        window.removeEventListener("click",onclick);
    });

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function togglecontent() {
		//console.log("toggle");
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

    .dropdown button:active {
  		background-color: #424242;
  		/*box-shadow: 0 1px #666;*/
  		/*transform: translateY(1px);*/
	}

    .navbar a:hover, .dropdown:hover .dropbtn, .dropbtn:focus {
        background-color: #424242;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #333;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        font-size: 12px;
        padding: 4px 4px;
        text-decoration: none;
        display: block;
        text-align: left;
        color: white;
    }

    .dropdown-content a:active {
  		background-color: #333;
  		/*box-shadow: 0 1px #666;*/
  		/*transform: translateY(1px);*/
	}

    .dropdown-content a:hover {
        background-color: #424242;
    }

    .show {
        display: block;
    }
</style>

<div class="dropdown">
    <button id="{name}{prefix}" class="dropbtn" on:click={()=>{togglecontent()}}>{name}
        <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content {btoggle === true ? 'show' : ''}" id="{id}">
        {#each Object.keys(itemlist) as item}
            <a href="/#" on:click={()=>{mjs.ops[item]()}}>  {itemlist[item].sm_label}</a>
            <!--
            <a href="/#" on:click={ itemlist[item] } > {itemlist[item]}  {itemlist[item].sm_label}</a>
            -->
        {/each}
        <!--
        <a href="/#">Link 1</a>
        <a href="/#">Link 2</a>
        <a href="/#">Link 3</a>
        -->
    </div>
</div>