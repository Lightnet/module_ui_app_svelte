<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    const dispatch = createEventDispatcher();

    //onMount(async () => {	
    //});

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
        window.addEventListener('resize', handledivresize);
        //activeobject = mjs.context.view_layer.objects.active;
        handledivresize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        elementcontent = document.getElementById(idcontent);
        //activeobject = mjs.context.view_layer.objects.active;
        handledivresize();
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.addEventListener('resize', handledivresize);
    });
</script>

<style>
    .materialeditor{
        height:100%;
        width:100%;
    }
</style>
<div id="{idcontent}" class="materialeditor">
    materialcomponent
</div>