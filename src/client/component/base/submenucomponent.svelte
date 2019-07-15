<script>
    //https://stackoverflow.com/questions/42737693/is-it-possible-in-svelte-to-have-each-loops-with-two-way-binding-to-nested-obje
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    //import { generateId } from '../helper/generateid.js';
    import SubmMenuComponent from './submenucomponent.svelte'
    import mjs from '../../mjs.js';

    export let name = "menu";
    export let children;
    export let active;
    //export let id = generateId(20);
    //export let prefix = generateId(20);

    //export let itemlist = {};

    let btoggle = false;
    //https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_dropdown_multilevel_css&stacked=h

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
    
    onMount(()=>{
        //window.addEventListener("click",onclick);
    });

    onDestroy(()=>{
        //window.removeEventListener("click",onclick);
    });

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function togglecontent() {
		//console.log("toggle");
        btoggle = !btoggle;
    }
    
</script>

<style>
    ul{
        list-style: none;
        display:none;/*hide*/
        background-color: #333;
        padding: 0;
        list-style-type: none;
    }

    a{
        float: none;
        font-size: 12px;
        padding: 4px 4px;
        text-decoration: none;
        display: block;
        text-align: left;
        color: white;
    }

    a:active {
  		background-color: #333;
    }
    
    a:hover {
        background-color: #424242;
    }

    ul li{
        display:block;
        width:200px;
    }

    .dropdown-submenu {
        position: relative;
        /*position: inherit;*/
        top:-30px;
        left:128px;
        /*float: left;*/
    }
</style>
<ul class="dropdown-submenu" style="{active == true ? 'display:block;' : 'display:none;'}">
    {#each Object.keys(children) as index}
        <li><a href="/#" >  {children[index].sm_label}</a>
            <!--
            {#if children[index].children != null}
                {#if children[index].children.length > 0}
                    <SubmMenuComponent children={children[index].children}/>
                {/if}
            {/if}
            -->
        </li>
    {/each}
</ul>