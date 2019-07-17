<script>
	//https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
	//https://www.w3schools.com/howto/howto_js_dropdown.asp
	import { onMount, onDestroy, createEventDispatcher } from 'svelte'
	import Panel from '../base/panel.svelte'
	//import DropMenu from '../base/dropmenu.svelte';
	import DropMenuComponent from '../base/dropmenucomponent.svelte';
	import DropMenuListComponent from '../base/dropmenulistcomponent.svelte';

	import mjs from '../../mjs.js';
	import {MainHeaderConfig} from '../../mjs.js';
	//import { generateId } from '../helper/generateid.js';

	let MainHeaderStyle = {};
	const MainHeaderConfigUnsub = MainHeaderConfig.subscribe(value=>{
    	MainHeaderStyle = value;
	});

	export let name;
	export let idassign;
    const dispatch = createEventDispatcher();
	//let menus = [];
	let templatepanel;

	let mainmenus = [];
	let filemenus = [];
	let editmenus = [];
	let viewmenus = [];
	let rendermenus = [];
	let windowmenus = [];
	let accessmenus = [];
	let helpmenus = [];

	let workspaces = [];
	let CollapseFileMenu = false;

	const CollapseFileMenuUnsubscribe = mjs.data.CollapseFileMenuMainHeader.subscribe(value => {
        //console.log(event);
        CollapseFileMenu = value;
    });

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

	onMount(() => {
		//console.log(mjs.ops)
		//console.log(mjs);
		//console.log(MainHeaderStyle);

		workspaces = [
			{sm_label:"Layout", sm_context:"layout",ops:workspace_view },
			{sm_label:"Horizontal", sm_context:"horizontal",ops:workspace_view },
			{sm_label:"Vertical", sm_context:"vertical",ops:workspace_view },
			{sm_label:"Test Divide", sm_context:"testdivide",ops:workspace_view },
			{sm_label:"Test Offset divide", sm_context:"testoffsetdivide",ops:workspace_view },
			{sm_label:"Logic Node Editor", sm_context:"logicnodeeditor",ops:workspace_view },
			{sm_label:"Preferences", sm_context:"preferences",ops:workspace_view },
			
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

		workspaces = workspaces;

		for(var obj in mjs.ops){
			//console.log(obj);
			if(mjs.ops[obj].sm_context == "FILE_MENU"){
				filemenus.push(mjs.ops[obj]);
			}
			if(mjs.ops[obj].sm_context == "EDIT_MENU"){
				editmenus.push(mjs.ops[obj]);
			}
			if(mjs.ops[obj].sm_context == "VIEW_MENU"){
				viewmenus.push(mjs.ops[obj]);
			}
			if(mjs.ops[obj].sm_context == "RENDER_MENU"){
				rendermenus.push(mjs.ops[obj]);
			}
			if(mjs.ops[obj].sm_context == "WINDOW_MENU"){
				windowmenus.push(mjs.ops[obj]);
			}
			if(mjs.ops[obj].sm_context == "ACCESS_MENU"){
				accessmenus.push(mjs.ops[obj]);
			}
			if(mjs.ops[obj].sm_context == "HELP_MENU"){
				helpmenus.push(mjs.ops[obj]);
			}
		}
		filemenus = filemenus;
		editmenus = editmenus;
		viewmenus = viewmenus;
		rendermenus = rendermenus;
		windowmenus = windowmenus;
		helpmenus = helpmenus;

		mainmenus.push({sm_label:"File",children:filemenus});
		mainmenus.push({sm_label:"Edit",children:editmenus});
		mainmenus.push({sm_label:"View",children:viewmenus});
		mainmenus.push({sm_label:"Render",children:rendermenus});
		mainmenus.push({sm_label:"Window",children:windowmenus});
		mainmenus.push({sm_label:"Access",children:accessmenus});
		mainmenus.push({sm_label:"Help",children:helpmenus});
		mainmenus = mainmenus;
	});

	onDestroy(()=>{
		MainHeaderConfigUnsub();
		CollapseFileMenuUnsubscribe();
	})

	function handleMousemove(event){
		//console.log("header");
		mjs.context.contextmenu.set({sm_context:'HEADER'});
	}

	function testcall(event){
		//console.log(mjs.ops.object_ot_calltest.sm_label);
		mjs.ops.object_ot_calltest()
	}

</script>

<style>
  	.navbar {
    	overflow: hidden;
    	background-color: #212121;
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
		overflow: hidden;
  	}

  	.navbar a:hover {
    	background-color: #424242;
  	}

	.navbar a:active {
  		background-color: #333;
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
		border:none;
        outline: none;
        background-color:#333;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 0px 4px;
		display: inline-block;
		text-decoration: none;
    }

	button:hover{
        background-color: #424242;
    }

	button:active {
  		background-color: #333;
	}

</style>

<div id="{idassign}" on:mousemove={handleMousemove} class="navbar">

	{#if CollapseFileMenu == true}

		<DropMenuListComponent name="Menu" prefix="_menuheader" items={mainmenus} />	

	{:else}

		<a href="/#"> {name} </a>
		<DropMenuComponent cstyle={MainHeaderStyle} name="File" prefix="_menuheader" items={filemenus} />
		<DropMenuComponent  name="Edit" prefix="_menuheader" items={editmenus} />
		<DropMenuComponent  name="View" prefix="_menuheader" items={viewmenus} />
		<!--
		<DropMenuComponent name="Render" prefix="_menuheader" items={rendermenus} />
		-->
		<DropMenuComponent name="Window" prefix="_menuheader" items={windowmenus} />
		<DropMenuComponent name="Access" prefix="_menuheader" items={accessmenus} />
		<DropMenuComponent name="Help" prefix="_menuheader" items={helpmenus} />
		<a href="/#" on:click={testcall}>Test Call</a>
		<a href="/#" on:click={checktemplatepanel}>Test Panel</a>

	{/if}

	<div class="workspace">
		{#each workspaces as workspace}
			<button on:click={()=>{workspace.ops(workspace.sm_context)}}>{workspace.sm_label}</button>	
		{/each}
		<button>+</button>
	</div>


</div>