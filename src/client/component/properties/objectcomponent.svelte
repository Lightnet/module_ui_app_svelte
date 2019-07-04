<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();
    let activeobject;

    let idcontent = generateId(20);
    let elementcontent;

    //onMount(async () => {	
    //});

    function handledivresize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        //elementcontent.style.width = parent.clientWidth - elementtab.clientWidth + 'px';
    }
    
    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handledivresize);
        activeobject = mjs.context.view_layer.objects.active;
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        elementcontent = document.getElementById(idcontent);
        activeobject = mjs.context.view_layer.objects.active;
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.addEventListener('resize', handledivresize);
    });
</script>

<style>
    button{
        background-color:grey;
        font-size: 12px;
        color:white;
        height:22px;
        padding: 0px 4px 10px 4px;
    }

    button:hover{
        background-color: lightslategrey;
    }
</style>
<div id="{idcontent}">
    object
    {#if activeobject != null}
        {#if activeobject.el != null}
            <label> Name: {activeobject.el.localName}  </label>
            <button on:click={()=>{activeobject.visible = !activeobject.visible}}> Visible: {activeobject.visible}  </button>
        {/if}
    {/if}
</div>