<script>
	import { spring } from 'svelte/motion';
	import { pannable } from './pannable.js';
	import { onMount, setContext } from 'svelte'

	export let Sl_information={
		name:"test",
		version:"0.0.1",
	}

	export let name = "Panel";
	export let id = "0";
	export let bdisplay = true;

	export function show(bool = false){//default set if null
		bdisplay = bool;
	}

	export function toggledisplay(){
		bdisplay = !bdisplay;
	}

	// register function
	export function OBJECT_OT_Panel(){
		console.log("test");
	}

	const coords = spring({ x: 0, y: 0 }, {
		stiffness: 0.2,
		damping: 0.4
	});

	function handlePanStart() {
		coords.stiffness = coords.damping = 1;
	}

	function handlePanMove(event) {

        coords.update($coords => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy
        }));
	}

	function handlePanEnd(event) {
		coords.stiffness = 0.2;
		coords.damping = 0.4;
		//coords.set({ x: 0, y: 0 });
	}

	onMount(async () => {
		//console.log("onMount");
		//const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		//photos = await res.json();
		//console.log(name);
	});

	function toggle_spliter(){
		//console.log("test");
	}
</script>

<style>
	.box {
		--width: 100px;
		--height: 100px;
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #333;
		cursor: move;
	}
</style>

{#if bdisplay == true}
<div class="box"
	use:pannable
	on:panstart={handlePanStart}
	on:panmove={handlePanMove}
	on:panend={handlePanEnd}
	style="transform:
		translate({$coords.x}px,{$coords.y}px);
	">
	<slot name='header'></slot>
	<slot></slot>
</div>
{/if}
