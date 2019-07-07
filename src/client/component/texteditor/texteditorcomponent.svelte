<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import svelte from 'svelte/compiler';

    //console.log(svelte);

    let idcontent = generateId(20);
    let elementcontent;

    let inputscript = "";
    let outputscript = "";

    //const dispatch = createEventDispatcher();

    function handle_texteditor_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }
    
    onMount(() => {
        //console.log("mount")
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handle_texteditor_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_texteditor_resize();

    });

    function compilescript(){
        let result = svelte.compile(inputscript, {
	        // options
        });
        console.log(result)
        outputscript = result.js.code;
    }

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_texteditor_resize);
    });

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'TEXTEDITOR'});
    }
    
</script>

<style>

</style>
<div id="{idcontent}" on:mousemove={handle_mousemove}>
    Text Editor
    <textarea bind:value={inputscript}></textarea>
    <button on:click={compilescript}> Compile </button>

    <textarea bind:value={outputscript}></textarea>
</div>