<script>
    //https://stackoverflow.com/questions/42737693/is-it-possible-in-svelte-to-have-each-loops-with-two-way-binding-to-nested-obje
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    //import { generateId } from '../helper/generateid.js';
    //import SubmMenuComponent from './submenucomponent.svelte'
    import mjs from '../../mjs.js';

    export let name = "menu";
    export let items;
    export let active;
    export let activeitem;
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

    function activemenu(obj){
        activeitem = obj;
    }

    //{console.log(children[index].children)}
</script>

<style>
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

    ul{
        background-color: #333;
        padding: 0px 0px 0px 0px;
        display:none;/*hide*/
        list-style: none;
        list-style-type: none;
    }

    ul li{
        width:128px;
        height:22px;/* fixed height else auto when another ul */
        margin: 0 0;
        padding: 0px 0px 0px 0px;
        list-style: none;
        display:block;
    }

    .dropdown-submenu {
        position: relative;
        /*position: inherit;*/
        top:-20px;
        left:128px;
        /*float: left;*/
    }
</style>
<ul class="dropdown-submenu" style="{active == true ? 'display:block;' : 'display:none;'}">
    {#each Object.keys(items) as index}
        <li><a href="/#" on:mouseover={()=>{activemenu(items[index])}}>  {items[index].sm_label}</a>
            <!--{console.log(children[index].sm_label)}-->
            {#if items[index].children != null}
                <!--{console.log(children[index].children)}-->
                {#if items[index].children.length > 0}
                    {#if items[index] == activeitem}
                        <svelte:self items={items[index].children} active={true}/>
                    {:else}
                        <svelte:self items={items[index].children} active={false}/>
                    {/if}    
                {/if}
            {/if}
            
        </li>
    {/each}
</ul>