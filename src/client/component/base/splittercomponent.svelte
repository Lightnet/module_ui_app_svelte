<script>
    //https://codepen.io/cnupm99/pen/pvNyYX
    //https://jsbin.com/qewecajiro/edit?css,js,output

    import { onMount, beforeUpdate, afterUpdate, onDestroy, setContext, createEventDispatcher } from 'svelte'
    import { generateId } from '../helper/generateid.js';
    //import mjs from '../../mjs.js';
    import { context } from '../../mjs.js';

    export let iddiv1;
    //export let elementdiv1;
    export let iddiv2;
    //export let elementdiv2;
    let m = {x:0,y:0};
    export let bresize = false;
    export let bhorizontal = false;
    export let px;
    export let py;
    let sheight = '100%';
    let swidth = '10px';
    let resizetag = 'n-resize';
    let splitter;

    var cont1,cont2;
    var last_x = 0;
    var last_y = 0;

    //let bpress = false;
    let window_width,window_height;

    let idsplitter = generateId(20);

    function handle_screenarea(event){
        m.x = event.clientX;
        m.y = event.clientY;
        //console.log(m);
        context.contextmenu.set({sm_context:'SPLITTER'});
        context.splitregion = splitter;
    }

    function handle_splitter_resize(event){
        m.x = event.clientX;
        m.y = event.clientY;
        //console.log(m);
        if((bresize == true)&&(bhorizontal == true)){
            let parent = splitter.parentNode;
            last_x = m.x - parent.offsetLeft;
            if(last_x < 0){
                return;
            }
            if(last_x > (parent.clientWidth - splitter.clientWidth)){
                return;
            }
            splitter.style.marginLeft = m.x - parent.offsetLeft + 'px';
            resetPosition();
        }
        if((bresize == true)&&(bhorizontal == false)){
            if(event.clientY){
                let parent = splitter.parentNode;
                last_y = m.y - parent.offsetTop;
                //console.dir(parent);
                if(last_y < 0){
                    return;
                }
                if(last_y > (parent.clientHeight - splitter.clientHeight)){
                    return;
                }
                splitter.style.marginTop = m.y - parent.offsetTop +  'px';
                resetPosition();
            }
        }
        window.dispatchEvent(new Event('resize'));
    }

    function resetPosition(){
        //function resetPosition(){
        let parent = splitter.parentNode;
        window_width = parent.clientWidth;
        window_height = parent.clientHeight;

        if(bhorizontal == true){
            let dx = last_x;
            if(cont1){
                cont1.style.width=dx+"px";
            }
            dx += splitter.clientWidth;
            if(cont2){
                cont2.style.marginLeft=dx+"px";
                dx = window_width - dx;
                cont2.style.width=dx+"px";
            }
        }else{
            let dy = last_y;
            if(cont1){
                cont1.style.height=dy+"px";
            }
            dy += splitter.clientHeight
            if(cont2){
                cont2.style.marginTop=dy+"px";
                dy = window_height - dy;
                cont2.style.height=dy+"px";
            }
        }
        //window.dispatchEvent(new Event('resize')); //overload not used here
    }

    function handleMouseclick(event){
        if(bresize){
            window.addEventListener('mouseup', stopResize);
            window.addEventListener('mousemove', handle_splitter_resize);
        }
    }

    function stopResize(e){
        window.removeEventListener('mouseup', stopResize);
        window.removeEventListener('mousemove', handle_splitter_resize);
    }

    onMount(() => {
        //console.log("onMount");
        //window_width=window.innerWidth;
        splitter = document.getElementById(idsplitter);
        let parent = splitter.parentNode;
        window_width = parent.clientWidth;
        window_height = parent.clientHeight;

        cont1 = document.getElementById(iddiv1);
        cont2 = document.getElementById(iddiv2);
        
        if(bhorizontal){
            sheight = '100%';
            swidth = '10px';
            resizetag = 'w-resize';
            if(px == null){
                splitter.style.marginLeft = (window_width / 2) + 'px';
            }else{
                splitter.style.marginLeft = px + 'px';
                //console.log(px);
            }
            
            last_x = window_width / 2;
            last_y = 0;
        }else{
            sheight = '10px';
            swidth = '100%';
            resizetag = 'n-resize';
            if(py == null){
                splitter.style.marginTop = (window_height / 2) + 'px';
            }else{
                //splitter.style.marginTop = py + 'px';
            }
            last_x = 0;
            last_y = window_height / 2;
        }
        //console.log(bhorizontal);
        splitter.style.height = sheight;
        splitter.style.width = swidth;
        splitter.style.cursor = resizetag;
        
        //console.log(splitter.style.height)
        //console.log(splitter.style.width)
        resetPosition();

        window.addEventListener('resize', resetPosition);
        window.dispatchEvent(new Event('resize'));
    });

    beforeUpdate(()=>{
        //console.log("afterUpdate");
        
    });

    afterUpdate(()=>{
        //console.log("afterUpdate");
        /*
        console.log(px);
        console.log(px);
        splitter = document.getElementById(idsplitter);
        if(bhorizontal){
            sheight = '100%';
            swidth = '10px';
            resizetag = 'w-resize';
            if(px == null){
                splitter.style.marginLeft = (window_width / 2) + 'px';
            }else{
                splitter.style.marginLeft = px + 'px';
                console.log(px);
            }
            
            //last_x = window_width / 2;
            //last_y = 0;
        }
        console.log(splitter);
        */
    });

    onDestroy(()=>{
        //console.log("onDestroy");
        window.removeEventListener('resize', resetPosition);
    });

</script>
<style>
    .splitter{
        background-color:#002200;
        cursor:w-resize;
        width:10px;
        height:100%;
        float:left;
        position:absolute;
        z-index:1;
    }
</style>

<div id="{idsplitter}" class="splitter" on:mousemove={handle_screenarea} on:mousedown={handleMouseclick}></div>