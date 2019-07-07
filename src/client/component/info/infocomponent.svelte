<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    function handle_info_resize(event){
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
        handle_info_resize();
        window.addEventListener('resize', handle_info_resize);
        //activeobject = mjs.context.view_layer.objects.active;
    });

    //afterUpdate(() => {
        //console.log("afterUpdate");
    //});

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_info_resize);
    });

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'INFO'});
    }
</script>

<style>

</style>
<div  id="{idcontent}" on:mousemove={handle_mousemove}>
    Info
</div>