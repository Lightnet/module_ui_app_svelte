<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    const dispatch = createEventDispatcher();
    export let selecttext = "Viewport 3D";
    let selecticon;
    export let idcomponent;
    export let viewport = "3dviewport";
    export let name = "menu";
    export let id = generateId(20);
    export let prefix = generateId(20);
    export let items = [];
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
        window.addEventListener("click",onclick);
        /*
        //console.log("afterUpdate")
        items.push({sm_label:"Viewport 3D",sm_context:"3dviewport"});
        //items.push({sm_label:"imageeditor",sm_context:"imageeditor"});
        //items.push({sm_label:"uveditor",sm_context:"uveditor"});
        //items.push({sm_label:"shadereditor",sm_context:"shadereditor"});
        //items.push({sm_label:"compositor",sm_context:"compositor"});
        items.push({sm_label:"Logic Node Editor",sm_context:"logicnodeeditor"});
        //items.push({sm_label:"texturenodeeditor",sm_context:"texturenodeeditor"});
        //items.push({sm_label:"timeline",sm_context:"timeline"});
        //items.push({sm_label:"grapheditor",sm_context:"grapheditor"});
        items.push({sm_label:"Text Editor",sm_context:"texteditor"});
        items.push({sm_label:"Script Console",sm_context:"scriptconsole"});
        items.push({sm_label:"Info",sm_context:"info"});
        items.push({sm_label:"Outliner",sm_context:"outliner"});
        items.push({sm_label:"Properties",sm_context:"properties"});
        items.push({sm_label:"File Browser",sm_context:"filebrowser"});
        items.push({sm_label:"Preferences",sm_context:"preferences"});
        */
        //items = items;
        //viewport
        selecteditor(viewport);
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
        padding: 4px 4px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
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
                <i>
                <svelte:component this={items[item].icon}/>
                </i>
            {/if}
            <a href="/#" on:click={()=>{ selectitem(items[item].sm_context) }}>  {items[item].sm_label}</a>
        {/each}
    </div>
</div>