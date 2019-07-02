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
		console.log(mjs);

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].SContext == "FILE_MENU"){
				//filemenus.push(mjs.ops[obj])
				filemenus[obj] = mjs.ops[obj]
			}
		}

	});

	function handleMousemove(event){
		//console.log("header");
		Sl_Mouseregion.set("header");
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
    	background-color: red;
  	}

</style>

<div on:mousemove={handleMousemove} class="navbar">
	<a href="/#"> {name} </a>

	<DropMenu name="File" prefix="_menuheader" itemlist={filemenus}>
	</DropMenu>

	<DropMenu name="Edit" prefix="_menuheader">
	</DropMenu>

	<DropMenu name="View" prefix="_menuheader">
	</DropMenu>

	<DropMenu name="Render" prefix="_menuheader">
	</DropMenu>

	<DropMenu name="Window" prefix="_menuheader">
	</DropMenu>

	<DropMenu name="Access" prefix="_menuheader">
	</DropMenu>

	<DropMenu name="Help" prefix="_menuheader">
	</DropMenu>
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