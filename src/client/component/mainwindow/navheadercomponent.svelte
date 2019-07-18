<script>
	//https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
	//https://www.w3schools.com/howto/howto_js_dropdown.asp
	import { onMount, beforeUpdate, onDestroy, createEventDispatcher } from 'svelte'
	import Panel from '../base/panel.svelte'
	//import DropMenu from '../base/dropmenu.svelte';
	import DropMenuComponent from '../base/dropmenucomponent.svelte';
	import DropMenuListComponent from '../base/dropmenulistcomponent.svelte';

	import mjs from '../../mjs.js';
	import {MainHeaderConfig} from '../../mjs.js';
	import { generateId } from '../helper/generateid.js';

	export let name;
	export let idassign;
	let elcomponent;
	let idstyle = generateId(20)
    const dispatch = createEventDispatcher();
	//let menus = [];
	let templatepanel;
	//let contexttab = "";
	

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

	let MainHeaderStyle = {};

	const MainHeaderConfigUnsub = MainHeaderConfig.subscribe(value=>{
		MainHeaderStyle = value;
		//console.log("vaule theme change?");
		checktheme();
	});

	const CollapseFileMenuUnsubscribe = mjs.data.CollapseFileMenuMainHeader.subscribe(value => {
        //console.log(event);
        CollapseFileMenu = value;
	});
	
	/*
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
	*/
	beforeUpdate(()=>{
		//checktheme();
		//console.log("update???")
	})

	function checktheme(){
		if(elcomponent ==null){
			return;
		}
		//console.log(MainHeaderStyle);
		//https://stackoverflow.com/questions/3304014/how-to-interpolate-variables-in-strings-in-javascript-without-concatenation
		let css = `
		.headerubtn{ background-color: ${MainHeaderStyle.menubtn.d} !important; }
		.headerubtn:hover{ background-color: ${MainHeaderStyle.menubtn.h} !important; } 
		.headerubtn:active{ background-color: ${MainHeaderStyle.menubtn.a} !important; }
		.workspacebtn{ background-color: ${MainHeaderStyle.workspacebtn.d} !important; }
		.workspacebtn:hover{ background-color: ${MainHeaderStyle.workspacebtn.h} !important; } 
		.workspacebtn:active{ background-color: ${MainHeaderStyle.workspacebtn.a} !important; }
		`;
		//console.log(css);
		createstyle(elcomponent,css);
	}

	function createstyle(element,_css){
		//let css = '.menubtn:hover{ background-color: white !important; }';
		//remove element to update style
		let css = _css;
		let elsytle = document.getElementById(idstyle);
		if(elsytle){
			elsytle.remove();
			elsytle =null;
		}
		if(elsytle == null){
			console.log("create style");
			elsytle = document.createElement('style');
			elsytle.setAttribute("id",idstyle);
			elsytle.appendChild(document.createTextNode(css));
			//console.log(elsytle);
			element.appendChild(elsytle);
		}
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
		elcomponent = document.getElementById(idassign);

		checktheme();

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

	//function testcall(event){
		//console.log(mjs.ops.object_ot_calltest.sm_label);
		//mjs.ops.object_ot_calltest()
	//}

</script>

<style>
  	.navbar {
    	overflow: hidden;
    	background-color: #232323;
    	font-family: Arial, Helvetica, sans-serif;
		width:100%;
  	}

  	.navbar a {
    	float: left;
		font-size: 12px;
		background-color: #232323;
    	color: white;
    	text-align: center;
    	padding: 4px 4px;
    	text-decoration: none;
		overflow: hidden;
  	}

  	.navbar a:hover {
    	background-color: #5177b2;
  	}

	.navbar a:active {
  		background-color: #5177b2;
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
        background-color:#232323;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 0px 4px;
		display: inline-block;
		text-decoration: none;
    }

	button:hover{
        background-color: #5177b2;
    }

	button:active {
  		background-color: #5177b2;
	}

	.workspacebtn{
		background-color: #2b2b2b ;
	}

	.workspacebtn:hover{
		background-color: #3a3a3a ;
	}

	.workspacebtn:active{
		background-color: #424242 ;
	}

</style>

<div id="{idassign}" on:mousemove={handleMousemove} class="navbar">

	{#if CollapseFileMenu == true}
		<DropMenuListComponent name="Menu" prefix="_menuheader" items={mainmenus} />	
	{:else}

		<a href="/#"> {name} </a>
		<DropMenuComponent name="File" prefix="_menuheader" items={filemenus} clmenu="headerubtn"/>
		<DropMenuComponent name="Edit" prefix="_menuheader" items={editmenus} clmenu="headerubtn"/>
		<DropMenuComponent name="View" prefix="_menuheader" items={viewmenus} clmenu="headerubtn"/>
		<!--
		<DropMenuComponent name="Render" prefix="_menuheader" items={rendermenus}  clmenu="headerubtn"/>
		-->
		<DropMenuComponent name="Window" prefix="_menuheader" items={windowmenus} clmenu="headerubtn"/>
		<DropMenuComponent name="Access" prefix="_menuheader" items={accessmenus} clmenu="headerubtn"/>
		<DropMenuComponent name="Help" prefix="_menuheader" items={helpmenus} clmenu="headerubtn"/>
		<!--<a href="/#" on:click={testcall}>Test Call</a>
		<a href="/#" on:click={checktemplatepanel}>Test Panel</a>-->

	{/if}

	<div class="workspace">
		{#each workspaces as workspace}
			<button class="workspacebtn" on:click={()=>{workspace.ops(workspace.sm_context)}}>{workspace.sm_label}</button>	
		{/each}
		<button class="workspacebtn">+</button>
	</div>


</div>