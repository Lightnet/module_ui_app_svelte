<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();
    let activeobject;//objectc

    let idcontent = generateId(20);
    let elementcontent;

    function handledivresize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        if(parent){
            elementcontent.style.height = parent.clientHeight + 'px';
            elementcontent.style.width = parent.clientWidth + 'px';
            //console.log("hello");
        }
    }
    
    onMount(() => {
        //console.log("mount");
        window.addEventListener('resize', handledivresize);
        elementcontent = document.getElementById(idcontent);
        activeobject = mjs.context.view_layer.objects.active;
        handledivresize();
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        //activeobject = mjs.context.view_layer.objects.active;
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