<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    //const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    function handle_objectdata_resize(event){
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
        window.addEventListener('resize', handle_objectdata_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_objectdata_resize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_objectdata_resize);
    });
</script>

<style>
    .objectdataprops{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="objectdataprops">
    objectdata
</div>