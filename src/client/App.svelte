<script>
	//https://svelte.dev/docs#setContext
	//https://svelte.dev/examples#reactive-statements
	//https://github.com/svgdotjs/svg.draggable.js
	//https://codepen.io/osublake/pen/4c3752574267b3a986cb8eee7ccb8c81
	//https://github.com/depuits/ned

	import { onMount, afterUpdate, onDestroy, createEventDispatcher} from 'svelte'
	import { generateId } from './component/helper/generateid.js';

	import AppHeaderComponent from './component/mainwindow/AppHeaderComponent.svelte';
	import AppFooterComponent from './component/mainwindow/AppFooterComponent.svelte';
	import ContextMenuComponent from './component/base/ContextMenuComponent.svelte';
	import SplitterComponent from './component/base/splittercomponent.svelte';

	import LayoutLayoutComponent from './component/base/LayoutLayoutComponent.svelte';
	import DivDividerVComponent from './component/base/sdivdividerv.svelte';
	import DivDividerHComponent from './component/base/sdivdividerh.svelte';
	import LayoutLogicNodeEditorComponent from './component/base/layoutlogicnodeeditorcomponent.svelte';
	import LayoutPreferencesComponent from './component/base/layoutpreferencescomponent.svelte';
	import DivDividerOffSetHComponent from './component/base/testoffsetdividercomponent.svelte';
	import TestDivideHComponent from './component/base/testdividecomponent.svelte';
	import LayoutTextEditorComponent from './component/base/LayoutTextEditorComponent.svelte';
	//import Gun from 'gun/gun';
	import mjs from './mjs.js';
	import { appconfig,setGun } from './mjs.js';

	const dispatch = createEventDispatcher();
	let config;
	let gun;
	//console.log(store);
	const unsubscribe = appconfig.subscribe(value => {
		//console.log(value);
		config = value;
	});
	/*
	appconfig.set({
		name: 'mjs',
		usegunlocal:false,
		usecustomtheme:false,
		username:"Guest"
	});
	*/
	export let name;
	export let version = "0.0.1";

	export function getVersion(){
		return version;
	}

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

	//function showmodal(msg){
		//showModal = true;
		//msgmodal = msg;
	//}

	function checktheme(){

	}

	function handle_workspace(event){
		//console.log(event);
		viewworkspace = event.detail;
		dispatch("workspace",event.detail);
	}

	function resizediv(){
		//console.log("resize");
		
		//console.log("elementheader.clientHeight: "+elementheader.clientHeight );
		//console.log("elementfooter.clientHeight: "+elementfooter.clientHeight );
		let parent = elementcontent.parentNode;
		//console.log(elscreen.parentNode)
		elscreen.style.height = elscreen.parentNode.clientHeight + 'px';
		//console.dir(elementcontent );
		//elementcontent.style.height = (parent.clientHeight - (elementheader.clientHeight + elementfooter.clientHeight + elementcontent.offsetTop )) + 'px';
		elementcontent.style.height = (parent.clientHeight - (elementcontent.offsetTop + elementfooter.clientHeight )) + 'px';
		//elementcontent.style.height = (parent.clientHeight - (elementheader.clientHeight + elementfooter.clientHeight )) + 'px';
		elementcontent.style.width = parent.clientWidth + 'px';
	}

	onMount(async () => {
		elscreen = document.getElementById(idscreen);

		elementheader = document.getElementById(idheader);
		elementcontent = document.getElementById(idcontent);
		elementfooter = document.getElementById(idfooter);
		
		if(config.usegunlocal == true){
			gun = Gun();
			//console.log("gun client storage");
			mjs.gun = gun;
			mjs.setGun(gun);
		}else{
			//console.log("guin client network");
			//gun = mjs.gun = Gun(['http://localhost:8080/gun']);
			//gun = mjs.gun = Gun(location.origin + '/gun');
			//console.log(window.location.hostname);
			//console.log(window.location);
			//console.dir(window.location);

			if(window.location.hostname == 'localhost'){
				//console.log("localhost:3000");
				gun = Gun(['http://localhost:8080' + '/gun']);
			}else{
				//console.log("url");
				//gun = mjs.gun = Gun('http://'+ window.location.hostname + '/gun');
				gun = mjs.gun = Gun(window.location.origin + '/gun');
			}

			gun.on('hi', peer => {//peer connect
				//console.log('connect peer to',peer);
				//console.log('peer connect!');
			});

			gun.on('bye', (peer)=>{// peer disconnect
				//console.log('disconnected from', peer);
				//console.log('disconnected from peer!');
			});

			mjs.gun = gun;
			mjs.setGun(gun);
			//setGun(gun);
			//console.log(setGun);
			//gun.get('mark').put({
				//name: "Mark",
				//email: "mark@gunDB.io",
			//});
			//gun.get('mark').on(function(data, key){
				//console.log("update:", data);
			//});
			//console.log(gun);
		}
		
		//window.dispatchEvent(new Event('resize'));
		//console.log(AFRAME);
		//console.dir(AFRAME);
		//let scene = new AFRAME.AScene();
		let scene = new THREE.Scene();
		let geometry = new THREE.BoxGeometry( 1, 1, 1 );
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		let cube = new THREE.Mesh( geometry, material );
		cube.position.x = -1;
		cube.position.y = 0.5;
		cube.position.z = -3;
		cube.name = "Cube";
		scene.add( cube );

		//let cube2 = new THREE.Mesh( geometry, material );
		//cube2.name = "Cube"
		//cube.add(cube2)

		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		camera.name = "PerspectiveCamera";
		scene.add( camera );

		// Create a light, set its position, and add it to the scene.
    	let light = new THREE.PointLight(0xffffff);
		light.position.set(-100,200,100);
		light.name = "PointLight";
		scene.add(light);
		//console.log(THREE);

		//let sky = new THREE.Sky();
		//sky.scale.setScalar( 450000 );
		//scene.add( sky );
		//console.log(THREE);
		//console.log(scene.object3D);
		//console.dir(scene.object3D);
		mjs.context.scene.set(scene);
		resizediv();

		window.addEventListener('resize', resizediv);
	});

	afterUpdate(()=>{
		
	});

	onDestroy(()=>{
		window.removeEventListener('resize', resizediv);
	});

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
<ContextMenuComponent></ContextMenuComponent>
