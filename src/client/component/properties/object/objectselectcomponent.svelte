<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../../helper/generateid.js';
    import CollapsePanelComponent from '../../base/collapsepanelcomponent.svelte';
    import { get } from 'svelte/store';
    import mjs from '../../../mjs.js';
    const dispatch = createEventDispatcher();

    export let activeobject;
    export let entities;
    //id div
    let idcontent = generateId(20);
    let elementcontent;
    //input
    let idinputobj = generateId(20);
    let inputel;
    //select object list
    let idobjectselect = generateId(20);
    let objselectel;
    let prefix = "_objselect";
    let bobjselecttoggle = false;

    function handle_objectselect_resize(event){
        if(elementcontent == null){
            return;
        }
        
        let parent = elementcontent.parentNode;
        //elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';

        if(inputel){
            let iwidth = (parent.clientWidth - objselectel.clientWidth - 40)
            if(iwidth < 0){
                iwidth  = 128;
            }
            inputel.style.width = iwidth + 'px';
        }
        
    }

    function onclick(e) {
        //console.log("click");
        //console.log(e.target);
		//if (!e.target.matches('.dropbtn')){
        let idsel = "#"+idobjectselect+prefix;
        if (!e.target.id != null){
            if (e.target.id == idsel){
                if (bobjselecttoggle == true) {
      			    //myDropdown.classList.remove('show');
      			    bobjselecttoggle = false
			    }
            }
        }else{
            if (bobjselecttoggle == true) {
                //myDropdown.classList.remove('show');
                bobjselecttoggle = false
            }
        }
    }

    onMount(() => {
        //console.log("mount")
        elementcontent = document.getElementById(idcontent);
        inputel = document.getElementById(idinputobj);
        //console.log(inputel);
        objselectel = document.getElementById(idobjectselect);
        //console.log(objselectel);
        handle_objectselect_resize();
        window.addEventListener('resize', handle_objectselect_resize);
        window.addEventListener("click",onclick);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener("click",onclick);
        window.removeEventListener('resize', handle_objectselect_resize);
    });

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function toggle_objselect() {
		//console.log("toggle");
        bobjselecttoggle = !bobjselecttoggle;
    }

    function handle_objselect(obj){
        //console.log(obj);
        activeobject = obj;
        dispatch('objectselect',obj);
    }
</script>

<style>
    input{
        /*background-color:grey;*/
        font-size: 12px;
        height:22px;
    }

    button{
        background-color:grey;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 10px 4px;
    }

    button:hover{
        background-color: lightslategrey;
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

    .dropdown button:active {
  		background-color: #333;
  		box-shadow: 0 1px #666;
  		transform: translateY(1px);
	}

    .navbar a:hover, .dropdown:hover .dropbtn, .dropbtn:focus {
        background-color: lightslategrey;
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
  		box-shadow: 0 1px #666;
  		transform: translateY(1px);
	}

    .dropdown-content a:hover {
        background-color: lightslategrey;
    }

    .show {
        display: block;
    }
</style>
<div id="{idcontent}" class="objelect">
    <div class="dropdown" on:click={()=>{toggle_objselect()}}>
        <button id="{idobjectselect}{prefix}" class="dropbtn">
            <i class="fas fa-vector-square"></i>
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content {bobjselecttoggle === true ? 'show' : ''}" id="{idobjectselect}">
            {#each entities as entity}
                <a href="/#" on:click={()=>{handle_objselect(entity)}}>  {entity.name}</a>
            {/each}
        </div>
    </div>

    <input id="{idinputobj}" bind:value={activeobject.name} placeholder="None" class="objinput">
</div>



        

