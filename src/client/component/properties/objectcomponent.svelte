<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import ObjectTransformComponent from './object/objecttransformcomponent.svelte'
    import ObjectRelationsComponent from './object/objectrelationscomponent.svelte'
    import ObjectCollectionsComponent from './object/objectcollectionscomponent.svelte'
    import ObjectVisibilityComponent from './object/objectvisibilitycomponent.svelte'

    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();
    let activeobject;//objectc
    let scene;
    let entities = [];
    let bobjselecttoggle = false;
    let prefix = "_objselect";

    let idinputobj = generateId(20);
    let inputel;

    let idobjectselect = generateId(20);
    let objselectel;

    let idcontent = generateId(20);
    let elementcontent;
    //activeobject = mjs.context.view_layer.objects.active;
    const activeobjunsub = mjs.context.view_layer.objects.active.subscribe(value => {
		activeobject = value;
    	//console.log(value);
    });
    
    const sceneunsub = mjs.context.scene.subscribe(value => {
        scene = value;
        entities = scene.children;
		//console.log(value);
    });

    function handle_object_resize(event){
        //console.log("resize");
        //console.log(elementcontent);
        if(elementcontent == null){
            return;
        }
        

        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
        if(inputel == null){
            inputel = document.getElementById(idinputobj);
            objselectel = document.getElementById(idobjectselect);
        }
        
        //console.log(inputel);
        if(inputel){
            let iwidth = (parent.clientWidth - objselectel.clientWidth - 40)
            if(iwidth < 0){
                iwidth  = 128;
            }
            inputel.style.width = iwidth + 'px';
        }
        //
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
        }
        /*
        if (!e.target.matches(idsel)){
			//var myDropdown = document.getElementById(iddropmenu);
			//if (myDropdown.classList.contains('show')) {
            if (bobjselecttoggle == true) {
      			//myDropdown.classList.remove('show');
      			bobjselecttoggle = false
			}
        }
        */
    }

    onMount(() => {
        //console.log("mount");
        elementcontent = document.getElementById(idcontent);
        console.log(elementcontent)
        //console.log(idinputobj);
        inputel = document.getElementById(idinputobj);
        //console.log(inputel);
        objselectel = document.getElementById(idobjectselect);
        console.log(objselectel);
        //activeobject = mjs.context.view_layer.objects.active;

        if(activeobject == null){
           activeobject = entities[0];
           //console.log(activeobject);
        }
        handle_object_resize();
        window.addEventListener('resize', handle_object_resize);
        window.addEventListener("click",onclick);
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        //activeobject = mjs.context.view_layer.objects.active;
        //handle_object_resize();
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_object_resize);
        activeobjunsub();
        sceneunsub();

        window.removeEventListener("click",onclick);
    });

    function handle_objselect(obj){
        //console.log(obj);
        activeobject = obj;
    }

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function toggle_objselect() {
		//console.log("toggle");
        bobjselecttoggle = !bobjselecttoggle;
    }

    //{console.log(activeobject)}
    // 
</script>

<style>
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

    .objectcomponent{
        height: 100%;
        width: 100%;
    }

    /*input{
        background-color:grey;
        font-size: 12px;
        height:22px;
    }
    */

    .checkbox {
	    /*padding: 0px 0px 0px 0px;*/
        padding-left: 0.4em;
	    /*border-radius: 3px;*/
	    display: inline-block;
	    position: relative;
    }

    input[type="checkbox"],
    input[type="radio"] {
        /*  Reset to static positioning (ideally, remove the position: absolute; from Bootstrap) */
        position: static;
        /* Properly align using flex */
        align-self: center;
        /* Align in the case where flex doesn't apply (checkbox & radio addons, mostly) */
        vertical-align: middle;
        /* Setting width and height is optional; alignment works without. However, setting it allows for more predictable layouts. */
        min-width: 16px;
        min-height: 16px;
    }

    .objelect{
        width:100%;
        float:left;
    }

    .objinput{
        float:left;
        /*width:100%;*/
    }

    input {
        /*background-color:grey;*/
        font-size: 12px;
        height:22px;
        resize: horizontal;
        width: 200px;
    }

    input:active {
        width: auto;   
    }

    input:focus {
        min-width: 200px;
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
<div id="{idcontent}" class="objectcomponent">
    <!--
    <label>Object</label>
    -->
    {#if activeobject != null}
        <div class="objelect">
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

        <ObjectTransformComponent obj={activeobject}></ObjectTransformComponent>

        <ObjectRelationsComponent obj={activeobject}></ObjectRelationsComponent>
        <ObjectCollectionsComponent obj={activeobject}></ObjectCollectionsComponent>
        <ObjectVisibilityComponent obj={activeobject}></ObjectVisibilityComponent>
        

        
        <!--
        
        {#if activeobject.name != null}
            <label>ID: {activeobject.id}</label>
            <label>Name: <input bind:value={activeobject.name} placeholder="None"> 
            visible:<input class="checkbox" type=checkbox bind:checked={activeobject.visible}>
            </label>

            <label> Position:
            x:<input bind:value={activeobject.position.x}>
            y:<input bind:value={activeobject.position.y}>
            z:<input bind:value={activeobject.position.z}>
            </label>

            <label> Rotation:
            x:<input bind:value={activeobject.rotation.x}>
            y:<input bind:value={activeobject.rotation.y}>
            z:<input bind:value={activeobject.rotation.z}>
            </label>

            <label> Scale:
            x:<input bind:value={activeobject.scale.x}>
            y:<input bind:value={activeobject.scale.y}>
            z:<input bind:value={activeobject.scale.z}>
            </label>

            {console.log(activeobject)}
        {/if}
        -->
    {/if}
    <!--
    AFRAME
    {#if activeobject != null}
        {#if activeobject.el != null}
            <label> Name: {activeobject.el.localName}  </label>
            <button on:click={()=>{activeobject.visible = !activeobject.visible}}> Visible: {activeobject.visible}  </button>
        {/if}
    {/if}
    -->
</div>