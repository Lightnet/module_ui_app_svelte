<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    export let screen = "Viewport 3D";

    //let viewport = "3dviewport";
    export let idheader;
    export let viewport = "3dviewport";

    export let name = "menu";
    export let id = generateId(20);
    export let prefix = generateId(20);

    export let itemlist = {};
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
    });

    afterUpdate(() => {
        //console.log("afterUpdate")
        itemlist = {};
        itemlist['3dviewport'] = {};
        itemlist['3dviewport'].sm_label = 'Viewport 3D';
        itemlist['3dviewport'].sm_context = '3dviewport';

        //itemlist['imageeditor'] = {};
        //itemlist['imageeditor'].sm_label = 'imageeditor';

        //itemlist['uveditor'] = {};
        //itemlist['uveditor'].sm_label = 'uveditor';

        //itemlist['shadereditor'] = {};
        //itemlist['shadereditor'].sm_label = 'shadereditor';

        //itemlist['compositor'] = {};
        //itemlist['compositor'].sm_label = 'compositor';

        //itemlist['texturenodeeditor'] = {};
        //itemlist['texturenodeeditor'].sm_label = 'texturenodeeditor';

        //itemlist['timeline'] = {};
        //itemlist['timeline'].sm_label = 'timeline';

        //itemlist['grapheditor'] = {};
        //itemlist['grapheditor'].sm_label = 'grapheditor';

        itemlist['texteditor'] = {};
        itemlist['texteditor'].sm_label = 'Text Editor';
        itemlist['texteditor'].sm_context = 'texteditor';

        itemlist['scriptconsole'] = {};
        itemlist['scriptconsole'].sm_label = 'Script Console';
        itemlist['scriptconsole'].sm_context = 'scriptconsole';

        itemlist['info'] = {};
        itemlist['info'].sm_label = 'Info';
        itemlist['info'].sm_context = 'info';

        itemlist['outliner'] = {};
        itemlist['outliner'].sm_label = 'Outliner';
        itemlist['outliner'].sm_context = 'outliner';

        itemlist['properties'] = {};
        itemlist['properties'].sm_label = 'Properties';
        itemlist['properties'].sm_context = 'properties';

        itemlist['filebrowser'] = {};
        itemlist['filebrowser'].sm_label = 'File Browser';
        itemlist['filebrowser'].sm_context = 'filebrowser';

        itemlist['preferences'] = {};
        itemlist['preferences'].sm_label = 'Preferences';
        itemlist['preferences'].sm_context = 'preferences';

        //screen = viewport;
        //console.log(viewport);

        for (var k in itemlist) {
            if(itemlist[k].sm_context == viewport ){
                //console.log("found!");
                screen = itemlist[k].sm_label;
                break;
            }
        }
        
    });

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

    //function handleMousemove(event){
		//console.log("header");
    //}
    //on:mousemove={handleMousemove}
    
    function testcall(){
        console.log("test")
    }

    function selectitem(value){
        //console.log(value);
        //screen = value;
        for (var k in itemlist) {
            if(itemlist[k].sm_context == value ){
                //console.log("found!");
                screen = itemlist[k].sm_label;
                break;
            }
        }
        
        dispatch('viewport', value);
    }

</script>

<style>
    .navbar {
        overflow: hidden;
        background-color: #3b3b3b;
        font-family: Arial, Helvetica, sans-serif;
        width:100%;
    }

    .navbar a {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar a:hover {
        background-color: #424242;
    }

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

    .dropdown-content a:hover {
        background-color: #424242;
    }

    .show {
        display: block;
    }

</style>

<div id="{idheader}" class="navbar">
    <a href="/#">Editor</a>

    <div class="dropdown">
        <button href="/#" id="{name}{prefix}" class="dropbtn" on:click={togglecontent}>{screen}
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content {btoggle === true ? 'show' : ''}" id="{id}">
            {#each Object.keys(itemlist) as item}
                <a href="/#" on:click={()=>{ selectitem(itemlist[item].sm_context) }}>  {itemlist[item].sm_label}</a>
                <!--<a href="/#" on:click={()=>{mjs.ops[item]()}}>  {itemlist[item].sm_label}</a>-->
            {/each}
        </div>
    </div>
</div>