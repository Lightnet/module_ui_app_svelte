<script>
    import { onMount } from 'svelte';
    //import EditorApp from "../client/App.svelte";

    let EditorComponent;

	onMount(async () => {
		const module = await import("../client/App.svelte");
		EditorComponent = module.default;
        //await import('../client/index.js');
        await import('../client/editor.js');
	});	
</script>

<svelte:head>
	<title>Editor</title>
</svelte:head>

<svelte:component this={EditorComponent} name="mjs"/>