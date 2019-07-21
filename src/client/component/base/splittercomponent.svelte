<script>
    //https://codepen.io/cnupm99/pen/pvNyYX
    //https://jsbin.com/qewecajiro/edit?css,js,output

    import { onMount, onDestroy, setContext, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import mjs from '../../mjs.js';
    import { context } from '../../mjs.js';

    let idsplitter = generateId(20);
    export let iddiv1;
    export let iddiv2;
    let m = {x:0,y:0};
    export let bresize = false;
    export let bhorizontal = false; //vertical
    export let px;
    export let py;
    export let position = "absolute";
    let sheight = '100%';
    let swidth = '10px';
    let resizetag = 'n-resize';
    let splitter;
    let cont1,cont2;
    let last_x = 0;
    let last_y = 0;
    let oldx = 0;
    let oldy = 0;
    //let bpress = false;
    let window_width,window_height;

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
            //splitter.style.height;
            //console.log(parent.clientHeight);
            //console.dir(splitter);
            //resetPosition();
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
                //resetPosition();
            }
        }
        window.dispatchEvent(new Event('resize'));
    }

    function resetPosition(){
        //function resetPosition(){
        let parent = splitter.parentNode;
        //console.dir(parent);
        window_width = parent.clientWidth;
        window_height = parent.clientHeight;
        //console.log(iddiv2)
        //cont2 = document.getElementById(iddiv2);

        if(bhorizontal == true){
            //console.log("bhorizontal");
            let dx = last_x;
            //if(cont1){
                cont1.style.width=dx+"px";
                cont1.style.height=window_height + 'px';
            //}
            dx += splitter.clientWidth;
            //splitter.style.height = "100px";
            //splitter.style.height = window_height + 'px';
            //console.log(window_height);
            //console.log(cont2)
            //if(cont2 !=null){
                cont2.style.marginLeft=dx+"px";
                dx = window_width - dx;//  - parent;
                cont2.style.width=dx+"px";
                //cont2.style.height=window_height + 'px';
            //}
        }else{
            //window_width = splitter.parentNode.offsetWidth - splitter.parentNode.offsetLeft;
            //window_height = splitter.parentNode.offsetHeight - splitter.parentNode.offsetTop;
            //console.log(splitter.parentNode.offsetWidth);

            window_width = splitter.parentNode.offsetHeight;
            window_width = splitter.parentNode.offsetWidth;
            //console.log(window_width);
            //if(splitter.parentNode.clientWidth == window.innerWidth){
                //console.log("exit?");
                //window_width = oldx;
                //return;
            //}
            //console.dir(splitter.parentNode.clientWidth);
            //console.log("//============================");
            //console.log(splitter.offsetWidth);
            //console.log(splitter.clientWidth);
            //console.log(splitter.parentNode.clientWidth)
            //console.log(splitter.parentNode.offsetWidth)
            //window_width = splitter.offsetWidth;
            //console.log(window.innerWidth);
            //console.log("window_width: "+window_width+"window_height: "+window_height);
            let dy = last_y;
            //if(cont1){
                cont1.style.height=dy+"px";
                cont1.style.width = window_width +"px";
                splitter.style.width = window_width  +"px";
            //}
            dy += splitter.clientHeight
            //if(cont2){
                if(window_width < 0){
                    return;
                }
                //if(window_width == window.innerWidth){
                    //return;
                //}
                cont2.style.marginTop=dy+"px";
                dy = window_height - dy;
                cont2.style.height=dy+"px";
                cont2.style.width = window_width +"px";
                //console.log("offsetWidth:" +  splitter.parentNode.offsetWidth  + " offsetLeft:" + splitter.parentNode.offsetLeft +" : " +  window_width);
            //}
            //oldx = window_width;
            
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
        //console.log("iddiv1:"+ iddiv1);
        //console.log("iddiv2:"+ iddiv2);

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

            splitter.style.top = "0px";
            splitter.style.float = "left";
            
            last_x = window_width / 2;
            last_y = 0;
        }else{
            //console.log("splitter");
            //console.log(splitter);
            //console.dir(splitter);
            /*
            console.log(splitter.clientHeight);
            console.log(splitter.clientLeft);
            console.log(splitter.clientTop);
            console.log(splitter.clientWidth);

            console.log(splitter.parentNode.clientHeight);
            console.log(splitter.parentNode.clientLeft);
            console.log(splitter.parentNode.clientTop);
            console.log(splitter.parentNode.clientWidth);
            
            console.log(splitter.offsetHeight);
            console.log(splitter.offsetLeft);
            console.log(splitter.offsetTop);
            console.log(splitter.offsetWidth);
            
            console.log(splitter.parentNode.offsetHeight);
            console.log(splitter.parentNode.offsetLeft);
            console.log(splitter.parentNode.offsetTop);
            console.log(splitter.parentNode.offsetWidth);
            */

            sheight = '10px';
            swidth = splitter.parentNode.offsetWidth - splitter.parentNode.offsetLeft + "px";
            resizetag = 'n-resize';
            if(py == null){
                splitter.style.marginTop = (window_height / 2) + 'px';
            }else{
                splitter.style.marginTop = py + 'px';
            }
            last_x = 0;
            last_y = window_height / 2;
            //splitter.style.width ="500px";
            //swidth ="500px";
            //cont1.style.width ="500px";
            //cont2.style.width ="500px";

            cont1.style.width = swidth;
            cont2.style.width = swidth;
        }
        //console.log(bhorizontal);
        splitter.style.height = sheight;
        splitter.style.width = swidth;
        splitter.style.cursor = resizetag;
        splitter.style.position = position;
        
        //console.log(splitter.style.height)
        //console.log(splitter.style.width)
        resetPosition();

        window.addEventListener('resize', resetPosition);
        window.dispatchEvent(new Event('resize'));
    });

    onDestroy(()=>{
        //console.log("onDestroy");
        window.removeEventListener('resize', resetPosition);
    });

</script>
<style>
    .splitter{
        background-color:#1f1f1f;
        cursor:w-resize;
        width:10px;
        height:100%;
        float:left;
        position:absolute;
        /*position:fixed;*/
        /*position: relative;*/
        z-index:9999;
    }
</style>

<div id="{idsplitter}" class="splitter" on:mousemove={handle_screenarea} on:mousedown={handleMouseclick}></div>
