<script>
    //https://stackoverflow.com/questions/42737693/is-it-possible-in-svelte-to-have-each-loops-with-two-way-binding-to-nested-obje
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    export let name = "menu";
    export let id = generateId(20);
    let idcomponent = generateId(20);
    let elcomponent;
    export let prefix = generateId(20);
    export let items = {};
    //export let cstyle = {};
    //export let btntag = "menubtn";
    export let clmenu = "menubtn";

    let btoggle = false;

    function onclick(e) {
        //console.log("click");
        //console.log(e.target);
        if(e.target.id == null){
            btoggle = false;
        }

        if(e.target.id != name+prefix){
            //console.log(".....");
            if (btoggle == true) {
      			//myDropdown.classList.remove('show');
      			btoggle = false;
			}
        }else{
            //btoggle = false;
        }
		//if (!e.target.matches('.dropbtn')){
        /*
        if (!e.target.matches("#"+name+prefix)){
			//var myDropdown = document.getElementById(iddropmenu);
			//if (myDropdown.classList.contains('show')) {
            if (btoggle == true) {
      			//myDropdown.classList.remove('show');
      			btoggle = false
			}
        }
        */
    }
    
    onMount(()=>{
        window.addEventListener("click",onclick);
        //console.log("========================================");
        //console.log(cstyle);
        elcomponent = document.getElementById(idcomponent);
        //console.log(elcomponent);
        //loopnodes(elcomponent);

    });

    function loopnodes(node){
        for (var i = 0; i < node.childNodes.length; i++) {
            //console.log(node.childNodes[i].className);
            if(node.childNodes[i].className !=null){
                //console.log(node.childNodes[i].className)
                if(node.childNodes[i].className.match("menubtn")){
                    //console.log(node.childNodes[i]);
                    //console.log(node.childNodes[i].style);
                    //createstyle(node.childNodes[i]);
                    //var css = 'button:hover{ background-color: white;color:black; }';
                    //console.log(node.childNodes[i].style.cssText );
                    //node.childNodes[i].style.cssText = css;
                }
            }
            //if (nodes.childNodes[i].className == "4") {
                //notes = nodes.childNodes[i];
                //break;
            //}        
        }
    }

    function createstyle(element){
        var css = '.menubtn:hover{ background-color: white !important; }';
        var style = document.createElement('style');

        if (element.style.styleSheet) {
            //console.log("found! sheet");
            style.styleSheet.cssText = css;
        } else {
            //console.log("create style");
            style.appendChild(document.createTextNode(css));
        }
        element.appendChild(style);
    }

    onDestroy(()=>{

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
  		background-color: #5177b2;
	}

    .navbar a:hover, .dropdown:hover .dropbtn, .dropbtn:focus {
        background-color: #5177b2;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #232323;
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
        background-color: #232323;
        color: white;
    }

    .dropdown-content a:active {
  		background-color: #5177b2;
	}

    .dropdown-content a:hover {
        background-color: #5177b2;
    }

    .show {
        display: block;
    }
    button{
        height:22px;
    }
</style>

<div id={idcomponent} class="dropdown">
    <button id="{name}{prefix}" class="dropbtn {clmenu}" on:click={()=>{togglecontent()}}>{name}
    </button>
    <div class="dropdown-content {btoggle === true ? 'show' : ''}" id="{id}">
        {#each Object.keys(items) as item}
            <a class="{clmenu}" href="/#" on:click={()=>{items[item]()}}>  {items[item].sm_label}</a>
        {/each}
    </div>
</div>