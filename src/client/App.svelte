<script>
//https://svelte.dev/docs#setContext
//https://svelte.dev/examples#reactive-statements

	import { onMount, afterUpdate, onDestroy } from 'svelte'
	//import { Sl_blogin } from './stores.js';
	import { generateId } from './component/helper/generateid.js';

	import Modal from './component/base/modalcomponent.svelte';
	import Panel from './component/base/panel.svelte'
	import NavHeaderComponent from './component/mainwindow/navheadercomponent.svelte'
	import NavFooterComponent from './component/mainwindow/navfootercomponent.svelte'
	import SplitterComponent from './component/base/splittercomponent.svelte'
	//import SContextmenu from './component/base/scontextmenu.svelte'
	//import Scontext from './component/base/scontext.svelte'
	import DivDividerComponent from './component/base/divdividercomponent.svelte'
	//import mjs from './mjs.js';

	export let name;

	//let showModal = false;
	//let msgmodal = "None";
	let view;

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

	function navheader_handle(event){
		//console.log(event);
		if(event.detail){
			view = event.detail;
			//console.log(event.detail);
		}
	}

	function resizediv(){
		//console.log("resize")
		elementcontent.style.height = (window.innerHeight - elementheader.clientHeight - elementfooter.clientHeight) + 'px';
		elementcontent.style.width = window.innerWidth;
	}

	onMount(async () => {
		window.addEventListener('resize', resizediv);
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

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

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
		on:navmenu={navheader_handle} >
	</NavHeaderComponent>
	<div id={idcontent} class="panelcontent contentarea">
		
		<DivDividerComponent></DivDividerComponent>
		
	</div>
	<NavFooterComponent idassign={idfooter}></NavFooterComponent>
</div>
