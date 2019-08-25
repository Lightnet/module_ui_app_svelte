<script>
    import { onMount, onDestroy } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import OimoBaseComponent from './OimoBaseComponent.svelte';

    let idcontent = generateId(20);
    let elementcontent;

    let idnavmenu = generateId(20);
    let elnavmenu;

    let idcontext = generateId(20);
    let elcontext;

    function handle_oimo_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
        elnavmenu.style.height = 22 + 'px';
        elnavmenu.style.width = parent.clientWidth + 'px';

        elcontext.style.height = parent.clientHeight - 22 + 'px';
        elcontext.style.width = parent.clientWidth + 'px';
    }

    onMount(async ()=>{
        elementcontent = document.getElementById(idcontent);
        elnavmenu = document.getElementById(idnavmenu);
        elcontext = document.getElementById(idcontext);
        window.addEventListener('resize', handle_oimo_resize);
        //activeobject = mjs.context.view_layer.objects.active;
        handle_oimo_resize();
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_oimo_resize);
    });
</script>

<style>
    .oimomain{
        position:fixed;
    }
    .oimomenu{
        /*position:fixed;*/
    }
    .oimocontext{
        /*position:fixed;*/
    }
</style>
<div id="{idcontent}" class="oimomain">
    <div id="{idnavmenu}" class="oimomenu">Menu</div>
    <div id="{idcontext}" class="oimocontext">
        <OimoBaseComponent />
    </div>
</div>