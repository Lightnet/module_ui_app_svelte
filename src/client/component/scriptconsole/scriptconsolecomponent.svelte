<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    //const dispatch = createEventDispatcher();
    let idcontent = generateId(20);
    let elementcontent;

    function handle_scriptconsole_resize(event){
        if(elementcontent == null){
            return;
        }
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("mount");
        elementcontent = document.getElementById(idcontent);
        handle_scriptconsole_resize();
        window.addEventListener('resize', handle_scriptconsole_resize);
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_scriptconsole_resize);
    });

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'SCRIPTCONSOLE'});
    }
</script>

<style>

</style>
<div id="{idcontent}" on:mousemove={handle_mousemove}>
    Script Console
</div>