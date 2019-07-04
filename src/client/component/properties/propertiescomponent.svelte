<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let idtab = generateId(20);
    let elementtab;
    let idcontent = generateId(20);
    let elementcontent;
    let activeobject;

    function handledivresize(event){
        //console.log("resize");
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth - elementtab.clientWidth + 'px';
    }
    
    onMount(() => {
        //console.log("mount")
        window.addEventListener('resize', handledivresize);
        activeobject = mjs.context.view_layer.objects.active;
    });

    afterUpdate(() => {
        //console.log("afterUpdate")
        elementtab = document.getElementById(idtab);
        elementcontent = document.getElementById(idcontent);
        activeobject = mjs.context.view_layer.objects.active;
    });

    onDestroy(() => {
        //console.log("onDestroy")
        window.addEventListener('resize', handledivresize);
    });
</script>

<style>
    .context{
        position: absolute;
        float:left;
        width:100%;
        height:100%;
    }
    .tab{
        float:left;
        width:48px;
        height:100%;
        background-color: dimgrey;
    }
    .panel{
        float:left;
        width:90%;
        height:100%;
        background-color: gray;
    }

    button{
        background-color:#333;
        font-size: 12px;
        color:white;
        height:22px;
        /*align-self: auto;*/
        /*text-align: center;*/
        /*padding-bottom:10px;*/
        padding: 0px 4px 10px 4px;
    }

    button:hover{
        background-color: lightslategrey;
    }
</style>
<div class="context">
    
    <div id={idtab} class="tab">
        tab
    </div>

    <div id="{idcontent}" class="panel">
        {#if activeobject != null}
            {#if activeobject.el != null}
                <label> Name: {activeobject.el.localName}  </label>
                <button on:click={()=>{activeobject.visible = !activeobject.visible}}> Visible: {activeobject.visible}  </button>
                
            {/if}
        {/if}
    </div>
</div>