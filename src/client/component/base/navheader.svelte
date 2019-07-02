<script>
	//https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
	//https://www.w3schools.com/howto/howto_js_dropdown.asp
	import { onMount, setContext, createEventDispatcher } from 'svelte'
	import Panel from './panel.svelte'
    //import { createEventDispatcher } from 'svelte';

	import { count, UserName, SessionHash, Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    export let name;
    
    const dispatch = createEventDispatcher();

	let blogin = false;
	let msgmodal = "None";
  	let btoggle = false;
	let menus = [];
	let templatepanel;

	//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	// dec2hex :: Integer -> String
	// i.e. 0-255 -> '00'-'ff'
	function dec2hex (dec) {
		return ('0' + dec.toString(16)).substr(-2)
	}

	// generateId :: Integer -> String
	function generateId (len) {
		var arr = new Uint8Array((len || 40) / 2)
		window.crypto.getRandomValues(arr)
		return Array.from(arr, dec2hex).join('')
	}

	let iddropmenu = generateId(20);

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
		if(templatepanel == null){
			templatepanel = new Panel({
				target: document.body,
				//target: gdiv,
				props: {
					name: 'Panel Template!'
				}
			});
		}
		console.log(templatepanel)
		templatepanel.OBJECT_OT_Panel();
	}

	//===============================================
	// onMount
	//===============================================

	onMount(async () => {
		//console.log("onMount");
		//const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		//photos = await res.json();
	});

    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function togglecontent() {
		//console.log("toggle");
      	btoggle = !btoggle;
    }
	
	// Close the dropdown if the user clicks outside of it
	window.onclick = function(e) {
		//console.log("click");
		if (!e.target.matches('.dropbtn')) {
			var myDropdown = document.getElementById(iddropmenu);
			if (myDropdown.classList.contains('show')) {
      			//myDropdown.classList.remove('show');
      			btoggle = false
			}
		}
	}

	function handleMousemove(event){
		//console.log("header");
		Sl_Mouseregion.set("header");
	}

</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

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

  	.dropdown {
    	float: left;
    	overflow: hidden;
  	}

  	.dropdown .dropbtn {
    	cursor: pointer;
    	font-size: 12px;  
    	border: none;
    	outline: none;
    	color: white;
    	padding: 4px 4px;
    	background-color: inherit;
    	font-family: inherit;
    	margin: 0;
  	}

  	.navbar a:hover, .dropdown:hover .dropbtn, .dropbtn:focus {
    	background-color: red;
  	}

  	.dropdown-content {
    	display: none;
    	position: absolute;
    	background-color: #f9f9f9;
    	min-width: 160px;
    	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    	z-index: 1;
  	}

  	.dropdown-content a {
    	float: none;
    	color: black;
    	padding: 4px 4px;
    	text-decoration: none;
    	display: block;
    	text-align: left;
  	}

  	.dropdown-content a:hover {
    	background-color: #ddd;
  	}

  	.show {
    	display: block;
  	}
</style>

<div on:mousemove={handleMousemove} class="navbar">
	<a href="/#"> {name} </a>
	<div class="dropdown">
    	<button class="dropbtn" on:click={()=>{togglecontent()}}>View
    		<i class="fa fa-caret-down"></i>
    	</button>
      	<div class="dropdown-content {btoggle === true ? 'show' : ''}" id={iddropmenu}>
      		<a href="/#" on:click={()=>{handleview('home')}}>Home</a>
			<a href="/#" on:click={()=>{handleview('news')}}>News</a>
      	</div>
  	</div>
	<a href="/#" on:click={()=>{handleview('account')}}>Account</a>
	<!--
	<a href="/#" on:click={()=>{handleview('character')}}>Character</a>
	<a href="/#" on:click={()=>{handleview('creatures')}}>Creatures</a>

	<a href="/#" on:click={()=>{handleview('shop')}}>Shop</a>
	<a href="/#" on:click={()=>{handleview('map')}}>Map</a>

	<a href="/#" on:click={()=>{handleview('server')}}>Server</a>
  	-->
	<a href="/#" on:click={()=>{checktemplatepanel()}}>Template Panel</a>
	<a href="/#" on:click={()=>{handleview('admin')}}>Admin</a>

	{#if blogin === true}
		<a href="/#" on:click={logouthandle}>Logout</a>
	{:else}
		<a href="/#" on:click={()=>{handleview('login')}}>Login</a>
	{/if}

</div>