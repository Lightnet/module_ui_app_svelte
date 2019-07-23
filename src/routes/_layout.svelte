<svelte:head>
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/fontawesome.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/solid.min.css" >
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/brands.min.css" >
	<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
	<link href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
	<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</svelte:head>
<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
	console.log("test");
	//console.log(window);
</script>
<Nav {segment}/>

<slot></slot>


<!--
<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>
-->