<script>
    import { onMount, onDestroy } from 'svelte'
    import { generateId } from '../helper/generateid.js';

    export let idcomponent = generateId(20);
    let elementcontent;

    function handle_auto_resize(event){
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
        elementcontent = document.getElementById(idcomponent);
        handle_auto_resize();
        window.addEventListener('resize', handle_auto_resize);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_auto_resize);
    });
</script>

<style>
    .autoresizediv{
        height:100%;
        width:100%;
    }
    div{
        color: azure;
    }
</style>
<div id="{idcomponent}" class="autoresizediv">
    <slot></slot>
</div>