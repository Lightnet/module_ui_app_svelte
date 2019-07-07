<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    function handle_preferences_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("mount");
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handle_preferences_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_preferences_resize();
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_preferences_resize);
    });

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'PREFERENCES'});
    }
</script>

<style>

</style>
<div id="{idcontent}" on:mousemove={handle_mousemove}>
    Preferences
</div>