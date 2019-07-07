<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    function handle_material_resize(event){
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
        window.addEventListener('resize', handle_material_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_material_resize();
    });

    afterUpdate(() => {
        
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_material_resize);
    });
</script>

<style>
    .materialprops{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="materialprops">
    materialcomponent
</div>