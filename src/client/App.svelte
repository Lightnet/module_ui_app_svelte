<script>
    import { onMount, onDestroy, createEventDispatcher} from 'svelte';
    import { generateId } from './component/helper/generateid.js';
	import { appconfig } from './mjs.js';
	import mjs from './mjs.js';
	
	import AppHeaderComponent from './component/mainwindow/AppHeaderComponent.svelte';
	import AppFooterComponent from './component/mainwindow/AppFooterComponent.svelte';
	import ContextMenuComponent from './component/base/ContextMenuComponent.svelte';
	import SplitterComponent from './component/base/SplitterComponent.svelte';

	import LayoutLayoutComponent from './component/base/LayoutLayoutComponent.svelte';
	import DivDividerVComponent from './component/base/sdivdividerv.svelte';
	import DivDividerHComponent from './component/base/sdivdividerh.svelte';
	import LayoutLogicNodeEditorComponent from './component/base/layoutlogicnodeeditorcomponent.svelte';
	import LayoutPreferencesComponent from './component/base/layoutpreferencescomponent.svelte';
	import DivDividerOffSetHComponent from './component/base/testoffsetdividercomponent.svelte';
	import TestDivideHComponent from './component/base/testdividecomponent.svelte';
	import LayoutTextEditorComponent from './component/base/LayoutTextEditorComponent.svelte';
    
    const dispatch = createEventDispatcher();
    let config;
    let gun;
    let view;
	let viewworkspace = "horizontal";
	//viewworkspace = "layout";
	//viewworkspace = "testdivide";
	//viewworkspace = "testoffsetdivide";
	//viewworkspace = "preferences";
	viewworkspace = "logicnodeeditor";
    //viewworkspace = "texteditor";
    let elementheader;
	let elementcontent;
	let elementfooter;

	let idheader = generateId(20);
	let idcontent = generateId(20);
	let idfooter = generateId(20);
	let idscreen = generateId(20);
	let elscreen;

    export let name;
    
    const unsubscribe = appconfig.subscribe(value => {
		//console.log(value);
		config = value;
	});
	
	function resizediv(){
		//console.log("resize");
		let parent = elementcontent.parentNode;
		elscreen.style.height = elscreen.parentNode.clientHeight + 'px';
		elementcontent.style.height = (parent.clientHeight - (elementcontent.offsetTop + elementfooter.clientHeight )) + 'px';
		elementcontent.style.width = parent.clientWidth + 'px';
	}
    
    onMount(() => {
        elscreen = document.getElementById(idscreen);
		elementheader = document.getElementById(idheader);
		elementcontent = document.getElementById(idcontent);
		elementfooter = document.getElementById(idfooter);

		if(config.usegunlocal == true){
			gun = Gun('http://localhost:8080' + '/gun');
			console.log("gun client storage");
		}else{
			if(window.location.hostname == 'localhost'){
				console.log("localhost:3000");
				gun = Gun(['http://localhost:8080' + '/gun']);
			}else{
				console.log("url");
				gun = Gun(window.location.origin + '/gun');
			}
		}
		gun.on('hi', peer => {//peer connect
			//console.log('connect peer to',peer);
			console.log('peer connect!');
		});

		gun.on('bye', (peer)=>{// peer disconnect
			//console.log('disconnected from', peer);
			console.log('disconnected from peer!');
		});
		//gun.get('mark').put({
			//name: "Mark",
			//email: "mark@gunDB.io",
		//});
		//gun.get('mark').on(function(data, key){
			//console.log("update:", data);
		//});
		mjs.setGun(gun);
		
		//gun.on('auth',ack=>{
			//console.log('auth');
			//console.log(ack);
		//});
		//let peers = gun.get('peers')
    	//peers.once(function(data){
			//console.log(data);
		//});
		
		let scene = new THREE.Scene();
		let geometry = new THREE.BoxGeometry( 1, 1, 1 );
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		let cube = new THREE.Mesh( geometry, material );
		cube.position.x = -1;
		cube.position.y = 0.5;
		cube.position.z = -3;
		cube.name = "Cube";
		scene.add( cube );
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		camera.name = "PerspectiveCamera";
		scene.add( camera );
		// Create a light, set its position, and add it to the scene.
    	let light = new THREE.PointLight(0xffffff);
		light.position.set(-100,200,100);
		light.name = "PointLight";
		scene.add(light);
		mjs.context.scene.set(scene);

		resizediv();
		window.addEventListener('resize', resizediv);
    });

    onDestroy(()=>{
		window.removeEventListener('resize', resizediv);
	});
	
    function handle_workspace(event){
		//console.log(event);
		viewworkspace = event.detail;
		//dispatch("workspace",event.detail);
	}

</script>

<style>
	.editarea{
		height:100%;
		width:100%;
	}
	.panelcontent {
		background-color: dimgrey;
	}
	.contentarea{
		height:100%;
		width:100%;
		background-color: gray;
	}
</style>

<div id="{idscreen}" class="editarea">

	<AppHeaderComponent
		idassign={idheader}
		name={name}
		on:workspace={handle_workspace} >
	</AppHeaderComponent>

		<div id={idcontent} class="panelcontent contentarea">

		{#if viewworkspace == 'layout'}
			<LayoutLayoutComponent></LayoutLayoutComponent>
		{/if}

		{#if viewworkspace == "horizontal"}
			<DivDividerHComponent></DivDividerHComponent>
		{/if}

		{#if viewworkspace == "vertical"}
			<DivDividerVComponent></DivDividerVComponent>
		{/if}

		{#if viewworkspace == "testdivide"}
			<TestDivideHComponent></TestDivideHComponent>
		{/if}

		{#if viewworkspace == "testoffsetdivide"}
			<DivDividerOffSetHComponent></DivDividerOffSetHComponent>
		{/if}

		{#if viewworkspace == "logicnodeeditor"}
			<LayoutLogicNodeEditorComponent></LayoutLogicNodeEditorComponent>
		{/if}

		{#if viewworkspace == "preferences"}
			<LayoutPreferencesComponent />
		{/if}

		{#if viewworkspace == "texteditor"}
			<LayoutTextEditorComponent />
		{/if}
	</div>
	<AppFooterComponent idassign={idfooter}></AppFooterComponent>
</div>
<!--
<ContextMenuComponent></ContextMenuComponent>
-->