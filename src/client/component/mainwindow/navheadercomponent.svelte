<script>
	//https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
	//https://www.w3schools.com/howto/howto_js_dropdown.asp
	import { onMount, setContext, createEventDispatcher } from 'svelte'
	import Panel from '../base/panel.svelte'
	import DropMenu from '../base/dropmenu.svelte';
	import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

	import mjs from '../../mjs.js';
	//import { generateId } from '../helper/generateid.js';

	export let name;
	export let idassign;
    const dispatch = createEventDispatcher();
	let blogin = false;
	//let menus = [];
	let templatepanel;

	let filemenus = {};
	let editmenus = {};
	let viewmenus = {};
	let rendermenus = {};
	let windowmenus = {};
	let accessmenus = {};
	let helpmenus = {};

	let workspaces = [];

	//const bloginunsub = Sl_blogin.subscribe(value => {
		//blogin = value;
		//console.log(value);
	//});

	//bloginunsub() //off

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

	function workspace_view(value){
		//console.log(value);
		//console.log("workspace_default");
		dispatch('workspace',value);
	}

	onMount(async () => {
		//console.log(mjs.ops)
		//console.log(mjs);

		workspaces = [
			{sm_label:"layout", sm_context:"layout",ops:workspace_view },
			{sm_label:"horizontal", sm_context:"horizontal",ops:workspace_view },
			{sm_label:"vertical", sm_context:"vertical",ops:workspace_view },
			//{sm_label:"Layout", sm_context:"Layout",ops:workspace_view },
			//{sm_label:"Modeling", sm_context:"Modeling",ops:workspace_view },
			//{sm_label:"Sculpting", sm_context:"Sculpting",ops:workspace_view },
			//{sm_label:"UV Editing", sm_context:"UVEditing",ops:workspace_view },
			//{sm_label:"Texture Paint", sm_context:"TexturePaint",ops:workspace_view },
			//{sm_label:"Shading", sm_context:"Shading",ops:workspace_view },
			//{sm_label:"Animation", sm_context:"Animation",ops:workspace_view },
			//{sm_label:"Rendering", sm_context:"Rendering",ops:workspace_view },
			//{sm_label:"Compositing", sm_context:"Compositing",ops:workspace_view  },
			//{sm_label:"Scripting", sm_context:"Scripting",ops:workspace_view }
		]

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "FILE_MENU"){
				//console.log(mjs.ops[obj].sm_label)
				//filemenus.push(mjs.ops[obj])
				filemenus[obj] = {}
				filemenus[obj].sm_label = mjs.ops[obj].sm_label;
				//filemenus[obj].sm_idname = mjs.ops[obj].sm_idname;
				//mjs.ops[obj]
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
		console.log(mjs.ops.object_ot_calltest.sm_label);
		mjs.ops.object_ot_calltest()
	}

</script>

<style>
  	.navbar {
    	overflow: hidden;
    	background-color: #333;
    	font-family: Arial, Helvetica, sans-serif;
		width:100%;
		/*height:32px;*/
		/*border-style: solid;*/
		/*border-bottom-color: #666;*/
  	}

  	.navbar a {
    	float: left;
    	font-size: 12px;
    	color: white;
    	text-align: center;
    	padding: 4px 4px;
    	text-decoration: none;
		overflow: hidden;
  	}

  	.navbar a:hover {
    	background-color: lightslategrey;
  	}

	.navbar a:active {
  		background-color: #333;
  		/*box-shadow: 0 1px #666;*/
  		/*transform: translateY(1px);*/
	}

	.workspace{
		/*width:100%;*/
		position: relative;
		overflow: hidden;
		float: left;
		height: 22px;
		max-height: 22px;
		padding: 0px 0px 0px 0px;
	}

	button{
        background-color:#333;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 0px 4px;
		display: inline-block;
		text-decoration: none;
		/*border: none;*/
		border-color: #666;
    }

	button:hover{
        background-color: lightslategrey;
    }

	button:active {
  		background-color: #333;
  		/*box-shadow: 0 1px #666;*/
  		/*transform: translateY(1px);*/
	}

</style>

<div id="{idassign}" on:mousemove={handleMousemove} class="navbar">
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

	<div class="workspace">

		{#each workspaces as workspace}
			<button on:click={()=>{workspace.ops(workspace.sm_context)}}>{workspace.sm_label}</button>	
		{/each}
		<button>+</button>
		<!--
		<button>Test</button>
		<button>+</button>
		-->
	</div>
</div>