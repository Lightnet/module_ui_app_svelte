<script>
	//https://svelte.dev/docs#setContext
	//https://svelte.dev/examples#reactive-statements

	import { onMount, afterUpdate, onDestroy, createEventDispatcher} from 'svelte'
	import { generateId } from './component/helper/generateid.js';

	import Modal from './component/base/modalcomponent.svelte';
	import Panel from './component/base/panel.svelte'
	import NavHeaderComponent from './component/mainwindow/navheadercomponent.svelte'
	import NavFooterComponent from './component/mainwindow/navfootercomponent.svelte'
	import SplitterComponent from './component/base/splittercomponent.svelte'
	import ContextMenuComponent from './component/base/contextmenucomponent.svelte'
	import DivDividerComponent from './component/base/divdividercomponent.svelte'
	import DivDividerVComponent from './component/base/sdivdividerv.svelte'
	import DivDividerHComponent from './component/base/sdivdividerh.svelte'

	import DivDividerOffSetHComponent from './component/base/testoffsetdividercomponent.svelte'

	import TestDivideHComponent from './component/base/testdividecomponent.svelte'
	import mjs from './mjs.js';

	const dispatch = createEventDispatcher();

	export let name;
	//let showModal = false;
	//let msgmodal = "None";
	let view;

	let viewworkspace = "horizontal";
	viewworkspace = "layout";
	//viewworkspace = "testdivide";
	//viewworkspace = "testoffsetdivide";

	let elementheader;
	let elementcontent;
	let elementfooter;

	let idheader = generateId(20);
	let idcontent = generateId(20);
	let idfooter = generateId(20);

	//const bloginunsubscribe = Sl_blogin.subscribe(value => {
		//blogin = value;
		//console.log(value);
	//});

	//function showmodal(msg){
		//showModal = true;
		//msgmodal = msg;
	//}

	function handle_workspace(event){
		//console.log(event);
		viewworkspace = event.detail;
		dispatch("workspace",event.detail);
	}

	function resizediv(){
		//console.log("resize")
		elementcontent.style.height = (window.innerHeight - elementheader.clientHeight - elementfooter.clientHeight) + 'px';
		elementcontent.style.width = window.innerWidth + 'px';
	}

	onMount(async () => {
		window.addEventListener('resize', resizediv);
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
	});

	afterUpdate(()=>{
		elementheader = document.getElementById(idheader);
		elementcontent = document.getElementById(idcontent);
		elementfooter = document.getElementById(idfooter);
		//console.log(elementheader)
		//console.log(elementcontent)
		//console.log(elementfooter)
		resizediv();
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

<div class="editarea">
	<NavHeaderComponent
		idassign={idheader}
		name={name}
		on:workspace={handle_workspace} >
	</NavHeaderComponent>
	<div id={idcontent} class="panelcontent contentarea">

		{#if viewworkspace == 'layout'}
			<DivDividerComponent></DivDividerComponent>
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

	</div>
	<NavFooterComponent idassign={idfooter}></NavFooterComponent>
</div>
<ContextMenuComponent></ContextMenuComponent>
