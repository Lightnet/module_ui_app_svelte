<script>
    //https://codepen.io/cnupm99/pen/pvNyYX
    //https://jsbin.com/qewecajiro/edit?css,js,output

    import { onMount, afterUpdate, onDestroy, setContext, createEventDispatcher } from 'svelte'
    import { count, UserName, SessionHash, Sl_blogin, Sl_Mouseregion } from '../../stores.js';
    import { generateId } from '../helper/generateid.js';

    export let iddiv1;
    export let elementdiv1;
    export let iddiv2;
    export let elementdiv2;
    let m = {x:0,y:0};
    export let bresize = false;
    export let bhorizontal = false;
    let sheight = '100%';
    let swidth = '10px';
    let resizetag = 'n-resize';
    let splitter;

    var cont1,cont2;
    var last_x;

    let bpress = false;
    let window_width,window_height;

    let idsplitter = generateId(20);

    function handleMousemove(event){
        m.x = event.clientX;
        m.y = event.clientY;
        //console.log(m);
        Sl_Mouseregion.set("splitter");
    }

    function handleMousedrag(event){
        m.x = event.clientX;
        m.y = event.clientY;
        //console.log(m);
        if((bresize == true)&&(bhorizontal == false)){
            //console.log("move resize");
            //splitter.style.top = m.y + 'px';
            //console.log(event);
            //elementdiv1
            //console.log(splitter);
            //splitter.style.left = m.x + 'px';
            splitter.style.marginLeft = m.x + 'px';
            //resetPosition(event.clientX);
            resetPosition();
        }
    }

    //function resetPosition(nowX){
    function resetPosition(){
        //let parent = splitter.parentNode;
        //window_width = parent.clientWidth;
        //window_height = parent.clientHeight;
        //splitter.style.height = window_height +'px';
        //cont1.style.height = window_height +'px';
        //cont2.style.height = window_height +'px';
        //console.log(splitter.style.marginLeft)
        
        let dxf = splitter.style.marginLeft;
        var dx = parseFloat(dxf.replace('px', ''))
        cont1.style.width=dx+"px";
        dx+=splitter.clientWidth;
        cont2.style.marginLeft=dx+"px";
        dx=window_width-dx;
        cont2.style.width=dx+"px";

        /*
        var dx=nowX-last_x;
        dx+=cont1.clientWidth;
        cont1.style.width=dx+"px";
        splitter.style.marginLeft=dx+"px";
        dx+=splitter.clientWidth;
        cont2.style.marginLeft=dx+"px";
        dx=window_width-dx;
        cont2.style.width=dx+"px";
        last_x=nowX;
        */
    }

    function handledivresize(){
        //console.log("resize");
        //splitter = document.getElementById(idsplitter);
        //cont1 = document.getElementById(iddiv1);
        //cont1 = document.getElementById(iddiv1);
        let parent = splitter.parentNode;
        window_width = parent.clientWidth;
        console.log(window_width);
        window_height = parent.clientHeight;

        splitter.style.height = window_height +'px';
        cont1.style.height = window_height +'px';
        cont2.style.height = window_height +'px';

        //resetPosition()
        let dx=cont1.clientWidth;
        splitter.style.marginLeft=dx+"px";
        dx+=splitter.clientWidth;

        dx = splitter.clientWidth + cont1.clientWidth;
        cont2.style.marginLeft=dx+"px";
        dx = window_width - (splitter.clientWidth + cont1.clientWidth);
        cont2.style.width=dx+"px";
        //console.log(cont2.style.width);
        /*
        let dx=cont1.clientWidth;
        splitter.style.marginLeft=dx+"px";
        dx+=splitter.clientWidth;
        cont2.style.marginLeft=dx+"px";
        dx=window_width-dx;
        cont2.style.width=dx+"px";
        */
        
    }

    function handleMouseclick(event){
        //console.log(event);
        //console.log(event.buttons)
        bpress = true;
        //window.addEventListener('mouseup', stopResize)
        if(bresize){
            window.addEventListener('mouseup', stopResize);
            window.addEventListener('mousemove', handleMousedrag);
        }
    }

    function stopResize(e){
        window.removeEventListener('mouseup', stopResize);
        window.removeEventListener('mousemove', handleMousedrag);
        //console.log("up");
        bpress = false;
    }

    onMount(async () => {
        //console.log("onMount");
        window_width=window.innerWidth;
        splitter = document.getElementById(idsplitter);
        cont1 = document.getElementById(iddiv1);
        cont2=document.getElementById(iddiv2);
        handledivresize();
        /*
        if(bhorizontal){
            sheight = '10px';
            swidth = '100%';
            resizetag = 'n-resize';
        }else{
            sheight = '100%';
            swidth = '10px';
            resizetag = 'w-resize';
        }
        splitter = document.getElementById(idsplitter);
        splitter.style.height = sheight;
        splitter.style.width = swidth;
        splitter.style.cursor = resizetag;
        */

        //elementdiv1  = document.getElementById(iddiv1)
        //elementdiv2  = document.getElementById(iddiv2)
        window.addEventListener('resize', handledivresize);
    });

    afterUpdate(()=>{
        window_width=window.innerWidth;
        splitter = document.getElementById(idsplitter);
        cont1 = document.getElementById(iddiv1);
        cont2=document.getElementById(iddiv2);

        handledivresize();
    });

    onDestroy(()=>{
        window.removeEventListener('resize', handledivresize);
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

<div id="{idsplitter}" class="splitter" on:mousemove={handleMousemove} on:mousedown={handleMouseclick}></div>