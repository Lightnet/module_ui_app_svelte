<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    const dispatch = createEventDispatcher();
    export let selecttext = "Viewport 3D";
    export let idcomponent = generateId(20);
    export let viewport = "3dviewport";
    export let name = "menu";
    export let id = generateId(20);
    export let prefix = generateId(20);
    export let items = [];

    let selecticon;
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
    
    onMount(() => {
        //console.log("mount")
        //viewport
        selecteditor(viewport);
        window.addEventListener("click",onclick);
    });

    function selecteditor(selname){
        for (let i = 0; i < items.length;i++) {
            if(items[i].sm_context == selname ){
                //console.log("found!");
                selecttext = items[i].sm_label;
                selecticon = items[i].icon;
                break;
            }
        }
    }

    onDestroy(() => {
        //console.log("onDestroy")
        window.removeEventListener("click",onclick);
    });

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function togglecontent() {
		//console.log("toggle");
        btoggle = !btoggle;
    }

    function selectitem(value){
        //console.log(value);
        //selecttext = value;
        //console.log(items.length)
        for (let i = 0; i < items.length;i++) {
            //console.log(items[i]);
            if(items[i].sm_context == value){
                //console.log("found!");
                selecttext = items[i].sm_label;
                selecticon = items[i].icon;
                break;
            }
        }
        dispatch('viewport', value);
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
        background-color: inherit;
        font-family: inherit;
        margin: 0;
        padding-top:0px;
        padding-bottom:0px;
        padding-left:0px;
        padding-right:0px;
    }

    .dropdown:hover .dropbtn, .dropbtn:focus {
        background-color: #424242;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        float:left;
        background-color: #333;
        min-width: 160px;
        /*box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);*/
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        font-size: 12px;
        /*padding: 4px 4px;*/
        text-decoration: none;
        display: block;
        text-align: left;
        color: white;
    }

    .dropdown-content a:hover {
        background-color: #424242;
    }

    .show {
        display: block;
    }

    i{
        pointer-events: none;
        float:left;
        width:20px;
        height:20px;
    }
    a{
        /*width:128px;*/
        float:left;
    }

</style>

<div id="{idcomponent}" class="dropdown">
    <button href="/#" id="{name}{prefix}" class="dropbtn" on:click={togglecontent}>
        {#if selecticon !=null}
            <svelte:component this={selecticon}/>
        {/if}
        <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content {btoggle === true ? 'show' : ''}" id="{id}">
        {#each Object.keys(items) as item}
            {#if items[item].icon !=null}
                <svelte:component this={items[item].icon}/>
            {/if}
            <a href="/#" on:click={()=>{ selectitem(items[item].sm_context) }}>  {items[item].sm_label}</a>
        {/each}
    </div>
</div>