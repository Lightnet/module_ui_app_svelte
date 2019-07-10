<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
    //import { UserName } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';
    import { context } from '../../mjs.js';

    //const dispatch = createEventDispatcher();

    export let idcontent = generateId(20);
    export let elementcontent;

    export function setposition(x,y){
        if(elementcontent){
            elementcontent.style.top = y + 'px';
            elementcontent.style.left = x + 'px';
        }
    }

    export function update(align,event){
        if(elementcontent){
            let screenregion = context.screenregion;
            //console.log(screenregion);
            if(!screenregion){
                //console.log("found!");
                return;
            }
            //console.log(event.pageX - screenregion.offsetWidth);
            //console.log(screenregion.offsetWidth);
            if(align == 'v'){
                //console.log("test...");
                let px = event.pageX - screenregion.offsetWidth;
                if(px < 0){
                    elementcontent.style.marginTop = screenregion.offsetTop + screenregion.offsetParent.offsetTop + 'px';
                    elementcontent.style.marginLeft  = event.pageX + 'px';
                    elementcontent.style.height = screenregion.offsetHeight + 'px';
                    elementcontent.style.width = 10 + 'px';
                    //console.log(event.pageX);
                    //console.log("hello????")
                }else{
                    //if((event.pageX - screenregion.offsetWidth) > screenregion.offsetWidth){
                        //return;
                    //}
                    //console.log("hello?")
                    elementcontent.style.marginLeft = event.pageX - screenregion.offsetWidth + 'px';
                    console.log(screenregion);
                    console.dir(screenregion);
                    elementcontent.style.height = screenregion.offsetHeight + 'px';
                    elementcontent.style.width = 10 + 'px';
                }
                
                //elementcontent.style.top = event.clientY + 'px';
                //elementcontent.style.left = event.clientX + 'px';
            }
        }
    }


    export function display(bool){
        if(bool){
            elementcontent.style.display = 'initial';
        }else if(bool == false){
            elementcontent.style.display = 'none';
        }else{
            elementcontent.style.display = 'none';
        }
    }
    
    onMount(() => {
        //console.log("mount")
        elementcontent = document.getElementById(idcontent);
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
        
    //});

    //onDestroy(() => {
        //console.log("onDestroy")
    //});
</script>

<style>
    .box{
        position: fixed;
        top:0px;
        left:0px;
        height:10px;
        width:10px;
        background-color: blue;
        z-index: 3;
        display: none;
    }
</style>
<div id="{idcontent}" class="box"></div>