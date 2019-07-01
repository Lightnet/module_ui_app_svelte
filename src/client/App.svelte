<script>
//https://svelte.dev/docs#setContext
//https://svelte.dev/examples#reactive-statements

	import { onMount, setContext } from 'svelte'

	import Modal from './component/basic/modalcomponent.svelte';

	import Home from './component/basic/homecomponent.svelte'
	import News from './component/basic/newscomponent.svelte'
	import Account from './component/account/accountcomponent.svelte'
	import Login from './component/account/logincomponent.svelte'
	import Server from './component/admin/servercomponent.svelte'
	import Admin from './component/admin/admincomponent.svelte'
	import Panel from './component/basic/panel.svelte'
	import NavHeader from './component/basic/navheader.svelte'
	import NavFooter from './component/basic/navfooter.svelte'
	//import DivResize from './component/basic/divresizable.svelte'
	import SSplitter from './component/basic/splitter.svelte'
	import SContextmenu from './component/basic/scontextmenu.svelte'
	
	import { count, UserName, SessionHash, Sl_blogin } from './stores.js';

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

//===============================================
// onMount
//===============================================

	onMount(async () => {
		//console.log("onMount");
		//const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		//photos = await res.json();
		//console.log(this);
	});
	
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

	//let self = this;

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
</script>
	
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
		<!--<div id="splitterh"></div>-->
		<SSplitter></SSplitter>
		<div>
		Hello World
		</div>
	</div>
	<NavFooter></NavFooter>
</div>
<SContextmenu></SContextmenu>
<!--
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