<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    const dispatch = createEventDispatcher();

    let idcontent = generateId(20);
    let elementcontent;

    function handledivresize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }
    
    onMount(() => {
        //console.log("mount");
        elementcontent = document.getElementById(idcontent);
        window.addEventListener('resize', handledivresize);
        //activeobject = mjs.context.view_layer.objects.active;
        handledivresize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.addEventListener('resize', handledivresize);
    });
</script>

<style>
    .objectconstraintseditor{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="objectconstraintseditor">
    objectconstraint
</div>