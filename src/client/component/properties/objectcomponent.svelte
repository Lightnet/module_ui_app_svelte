<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();
    let activeobject;//objectc

    let idcontent = generateId(20);
    let elementcontent;
    //activeobject = mjs.context.view_layer.objects.active;
    const bloginunsub = mjs.context.view_layer.objects.active.subscribe(value => {
		activeobject = value;
    	//console.log(value);
	});

    function handle_object_resize(event){
        //console.log("resize");
        //console.log(elementcontent);
        if(elementcontent == null){
            return;
        }

        let parent = elementcontent.parentNode;
        //if(parent == null){
            //console.log(idcontent)
            //elementcontent = document.getElementById(idcontent);
            //parent = elementcontent.parentNode;
        //}
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    onMount(() => {
        //console.log("mount");
        handle_object_resize();
        window.addEventListener('resize', handle_object_resize);
        elementcontent = document.getElementById(idcontent);
        //activeobject = mjs.context.view_layer.objects.active;
        
    });

    afterUpdate(() => {
        //console.log("afterUpdate");
        //activeobject = mjs.context.view_layer.objects.active;
        //handle_object_resize();
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_object_resize);
        bloginunsub();
    });
    //{console.log(activeobject)}
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

    .objectcomponent{
        height: 100%;
        width: 100%;
    }

</style>
<div id="{idcontent}" class="objectcomponent">
    <label>Object</label>
    {#if activeobject != null}
        {#if activeobject.el != null}
            <label> Name: {activeobject.el.localName}  </label>
            <button on:click={()=>{activeobject.visible = !activeobject.visible}}> Visible: {activeobject.visible}  </button>
        {/if}
    {/if}

</div>