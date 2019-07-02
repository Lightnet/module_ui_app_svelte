<script>
//https://svelte.dev/docs#setContext
//https://svelte.dev/examples#reactive-statements

	import { onMount, setContext } from 'svelte'

	import Modal from './component/base/modalcomponent.svelte';

	import Home from './component/base/homecomponent.svelte'
	import News from './component/base/newscomponent.svelte'
	import Account from './component/account/accountcomponent.svelte'
	import Login from './component/account/logincomponent.svelte'
	import Server from './component/admin/servercomponent.svelte'
	import Admin from './component/admin/admincomponent.svelte'
	import Panel from './component/base/panel.svelte'
	import NavHeader from './component/base/navheader.svelte'
	import NavFooter from './component/base/navfooter.svelte'
	import SSplitter from './component/base/splitter.svelte'
	import SContextmenu from './component/base/scontextmenu.svelte'

	import Sdivwindow from './component/base/sdivwindow.svelte'
	import Scontext from './component/base/scontext.svelte'
	import { count, UserName, SessionHash, Sl_blogin } from './stores.js';


	//import object_ot_test from './component/types/object_ot_test.js'



	import mjs from './mjs.js';

	//import {ops} from './scontext.js';

	export let name;

	let showModal = false;
	let blogin = false;
	let view = "account";
	let msgmodal = "None";
	//let sessionhash = "";
	let compparam = "Panel";
	let count_value;

	const unsubscribe = count.subscribe(value => {
		count_value = value;
	});
	const bloginunsubscribe = Sl_blogin.subscribe(value => {
		blogin = value;
		//console.log(value);
	});
	function handleview(_view){
		view = _view;
		//console.log(_view);
	}
	function logouthandle(){
		blogin = false;
		SessionHash.set('');
		UserName.set('Guest');
	}
	function showmodal(msg){
		showModal = true;
		msgmodal = msg;
	}
	function handle_msg(event){
		if(event.detail.msg){
			console.log("event.detail.message:"+event.detail.msg);
			//register
			if(event.detail.msg == 'userexist'){
				showmodal('User Exist!');
			}
			if(event.detail.msg == 'usercreated'){
				showmodal('User Created!');
			}
		}

		//login
		if(event.detail.message){
			if(event.detail.message == 'passwordpass'){
				showmodal('Login Pass!');
				blogin = true;
				//sessionhash = event.detail.sessionhash;
				view = "account";
				//console.log(sessionhash);
			}

			if(event.detail.message == 'passwordfail'){
				showmodal('Login Fail!');
			}

			if(event.detail.message == 'donotexist'){
				showmodal("User Doesn't Exist!");
			}
		}
		
	}

	//let gdiv = document.createElement('div');
	//gdiv.setAttribute("id", "test");
	//document.body.appendChild(gdiv);

	function testfun(){
		console.log("test");
		//var gdiv = document.createElement('Panel');
		//var att = gdiv.createAttribute("class");
		//att.value = "box svelte-1mrm2ks";
		//gdiv.setAttribute("class", "box svelte-1mrm2ks");
		//box svelte-1mrm2ks
		//document.body.appendChild(gdiv);
		//console.log(self);
		//console.log(this);
		console.log(window)
		var panel = new Panel({
			//target: document.body,
			target: gdiv,
			props: {
				name: 'Panel Template!'
			}
		});

		//console.log(panel);
		//console.log(panel.$$);
	}
	/*
	if (document.addEventListener) { // IE >= 9; other browsers
        document.addEventListener('contextmenu', function(e) {
            //alert("You've tried to open context menu"); //here you draw your own menu
            e.preventDefault();
        }, false);
    } else { // IE < 9
        document.attachEvent('oncontextmenu', function() {
            //alert("You've tried to open context menu");
            window.event.returnValue = false;
        });
	}
	*/
	function navheader_handle(event){
		//console.log(event);
		if(event.detail){
			view = event.detail;
			//console.log(event.detail);
		}
	}

	//===============================================
	// onMount
	//===============================================

	onMount(async () => {
		//console.log(mjs);
		//console.dir(mjs);

		//scontext.ops.push({text:"test"});
		//let ops = scontext.ops;
		//let ops = {}
		
		//ops.push({text:"test"});
		//console.log(ops);
		//console.log(ops);
		//ops["text"] = "test";
		//console.log(ops);
		//let obj = new scontext();
		//console.log(obj)
		//console.log("onMount");

		//mjs.ops.object_ot_test = new object_ot_test();

		//mjs.ops.object_ot_test

		//console.log(mjs.ops.object_ot_test)
	});
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<style>
	.panelc {
		background-color: dimgrey;
	}
	.sheight{
		height:calc(100vh - 44px);
		background-color: dodgerblue;
	}
</style>

<div>
	<NavHeader 
		name={name}
		on:navmenu={navheader_handle} >
	</NavHeader>
	<div class="panelc sheight ">
		<SSplitter></SSplitter>
		<Scontext></Scontext>
		<!--<div id="splitterh"></div>
		-->
	</div>
	<NavFooter></NavFooter>
</div>
<SContextmenu></SContextmenu>

<!--
<Sdivwindow></Sdivwindow>
<DivResize></DivResize>
-->
<!--
{#if blogin === true}
	{#if view == "account"}
		<Account />
	{:else if view == 'home'}	
		<Home />
	{:else if view == 'news'}	
		<News />
	{:else if view == 'server'}	
		<Server />
	{:else if view == 'admin'}	
		<Admin />
	{:else if view == 'login'}	
		<Login on:message={handle_msg}/>
	{:else}	
		<Home />
	{/if}
{:else}
	{#if view == 'login'}	
		<Login on:message={handle_msg}/>
	{:else if view == 'news'}	
		<News />
	{:else}	
		<Home />
	{/if}	
{/if}
-->
<!--
Test
<button on:click="{() => showModal = true}">
	show modal
</button>
-->
<!--
{#if showModal}
	<Modal on:close="{() => showModal = false}">
		<h2 slot="header">
			Message
		</h2>
		<p>{msgmodal}</p>
	</Modal>
{/if}

<Panel>
	<label>Test</label>
</Panel>
-->