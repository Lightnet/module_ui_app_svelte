<script>
	//https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
	//https://www.w3schools.com/howto/howto_js_dropdown.asp
	import { onMount, setContext, createEventDispatcher } from 'svelte'
	import Panel from './panel.svelte'
	import DropMenu from './dropmenu.svelte';
	import { count, UserName, SessionHash, Sl_blogin, Sl_Mouseregion } from '../../stores.js';

	import mjs from '../../mjs.js';
	//import { generateId } from '../helper/generateid.js';

    export let name;
    const dispatch = createEventDispatcher();
	let blogin = false;
	let msgmodal = "None";
  	let btoggle = false;
	let menus = [];
	let templatepanel;
	//let iddropmenu = generateId(20);

	let filemenus = {};
	let editmenus = {};
	let viewmenus = {};
	let rendermenus = {};
	let windowmenus = {};
	let accessmenus = {};
	let helpmenus = {};

	const bloginunsub = Sl_blogin.subscribe(value => {
		blogin = value;
		//console.log(value);
	});

	function handleview(_view){
        //console.log(_view);        
        dispatch('navmenu', _view);
	}

	function logouthandle(){
		SessionHash.set('');
		UserName.set('Guest');
		Sl_blogin.set(false);
	}

	function checktemplatepanel(){
		//console.log("Test");
		if(templatepanel){
			templatepanel.toggledisplay()
			//templatepanel.show();
		}

		if(templatepanel == null){
			templatepanel = new Panel({
				target: document.body,
				//target: gdiv,
				props: {
					name: 'Panel Template!'
				}
			});
		}
		//console.log(templatepanel)
		//templatepanel.OBJECT_OT_Panel();
	}

	//===============================================
	// onMount
	//===============================================

	onMount(async () => {
		//console.log(mjs.ops)
		//console.log(mjs);

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "FILE_MENU"){
				//console.log(mjs.ops[obj].sm_label)
				//filemenus.push(mjs.ops[obj])
				filemenus[obj] = {}
				filemenus[obj].sm_label = mjs.ops[obj].sm_label;
				//filemenus[obj].sm_idname = mjs.ops[obj].sm_idname;
				//mjs.ops[obj]
				//filemenus[obj]
			}
		}
		
		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "EDIT_MENU"){
				//editmenus[obj] = mjs.ops[obj]
				editmenus[obj] = {}
				editmenus[obj].sm_label = mjs.ops[obj].sm_label;
			}
		}

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "VIEW_MENU"){
				//viewmenus[obj] = mjs.ops[obj]
				viewmenus[obj] = {}
				viewmenus[obj].sm_label = mjs.ops[obj].sm_label;
			}
		}

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "REDNER_MENU"){
				//rendermenus[obj] = mjs.ops[obj]
				rendermenus[obj] = {}
				rendermenus[obj].sm_label = mjs.ops[obj].sm_label;
			}
		}

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "WINDOW_MENU"){
				//windowmenus[obj] = mjs.ops[obj]
				windowmenus[obj] = {}
				windowmenus[obj].sm_label = mjs.ops[obj].sm_label;
			}
		}

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "ACCESS_MENU"){
				//accessmenus[obj] = mjs.ops[obj]
				accessmenus[obj] = {}
				accessmenus[obj].sm_label = mjs.ops[obj].sm_label;
			}
		}

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "HELP_MENU"){
				//helpmenus[obj] = mjs.ops[obj]
				helpmenus[obj] = {}
				helpmenus[obj].sm_label = mjs.ops[obj].sm_label;
			}
		}
	});

	function handleMousemove(event){
		//console.log("header");
		Sl_Mouseregion.set("header");
	}

	function testcall(event){
		//console.log(event)
		//console.log(mjs)
		//console.log(typeof(mjs.ops.object_ot_calltest))
		//console.log(mjs.ops.object_ot_calltest)

		//mjs.ops.object_ot_calltest()
		//console.log(mjs.ops.object_ot_calltest().sm_label);
		//let o = mjs.ops.object_ot_calltest;
		//console.dir(o.obj);
		//let o = mjs.ops.object_ot_calltest();
		//console.log("o.sm_label");
		//console.log(o.sm_label);
		//console.dir(o);

		//console.log(mjs.ops.object_ot_calltest().sm_label);


		console.log(mjs.ops.object_ot_calltest.sm_label);
		mjs.ops.object_ot_calltest()
		

		//console.log(mjs.ops.object_ot_calltest().sm_label)
		//mjs.ops.object_ot_calltest();//need to rework this.
		//mjs.ops.object_ot_calltest.execute();

	}

</script>

<style>
  	.navbar {
    	overflow: hidden;
    	background-color: #333;
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
    	background-color: lightslategrey;
  	}

</style>

<div on:mousemove={handleMousemove} class="navbar">
	<a href="/#"> {name} </a>

	<DropMenu name="File" prefix="_menuheader" itemlist={filemenus}>
	</DropMenu>
	<DropMenu name="Edit" prefix="_menuheader" itemlist={editmenus}>
	</DropMenu>
	<DropMenu name="View" prefix="_menuheader" itemlist={viewmenus}>
	</DropMenu>
	<!--
	<DropMenu name="Render" prefix="_menuheader" itemlist={rendermenus}>
	</DropMenu>
	-->
	<DropMenu name="Window" prefix="_menuheader" itemlist={windowmenus}>
	</DropMenu>
	<DropMenu name="Access" prefix="_menuheader" itemlist={accessmenus}>
	</DropMenu>
	<DropMenu name="Help" prefix="_menuheader" itemlist={helpmenus}>
	</DropMenu>
	<a href="/#" on:click={testcall}>Test Call</a>
	<a href="/#" on:click={checktemplatepanel}>Test Panel</a>
	<!--
	<div class="dropdown">
    	<button class="dropbtn" on:click={()=>{togglecontent()}}>View
    		<i class="fa fa-caret-down"></i>
    	</button>
      	<div class="dropdown-content {btoggle === true ? 'show' : ''}" id={iddropmenu}>
      		<a href="/#" on:click={()=>{handleview('home')}}>Home</a>
			<a href="/#" on:click={()=>{handleview('news')}}>News</a>
      	</div>
  	</div>
	-->
	<!--
	<a href="/#" on:click={()=>{handleview('account')}}>Account</a>
	<a href="/#" on:click={()=>{handleview('character')}}>Character</a>
	<a href="/#" on:click={()=>{handleview('creatures')}}>Creatures</a>
	<a href="/#" on:click={()=>{handleview('shop')}}>Shop</a>
	<a href="/#" on:click={()=>{handleview('map')}}>Map</a>
	<a href="/#" on:click={()=>{handleview('server')}}>Server</a>
	<a href="/#" on:click={()=>{checktemplatepanel()}}>Template Panel</a>
	<a href="/#" on:click={()=>{handleview('admin')}}>Admin</a>
	{#if blogin === true}
		<a href="/#" on:click={logouthandle}>Logout</a>
	{:else}
		<a href="/#" on:click={()=>{handleview('login')}}>Login</a>
	{/if}
	-->
</div>