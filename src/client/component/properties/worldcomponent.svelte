<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    function handle_world_resize(event){
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
        window.addEventListener('resize', handle_world_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_world_resize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_world_resize);
    });
</script>

<style>
    .worldprops{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="worldprops">
    world
</div>