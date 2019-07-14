<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    let id = "ran";
    let elcontent;
    let bmove = false;
    let mx;
    let my;
    let px= 0;
    let py=0;
    let el;
    let tx = 0;
    let ty = 0;

    function handle_mouseclick(e){
        //console.log(e);
        //console.log("test");
    }

    function translate( _element , _x , _y )
    {
    var transform = _element.transform.baseVal.getItem(0);   
    var mat = transform.matrix;   

    mat = mat.translate( _x, _y );  
    transform.setMatrix( mat );

    }

    function handle_mousedown(e){
        if(e.button == 0){
            //el = e.target;
            bmove = true;
            px = e.clientX - elcontent.getAttribute('x');
            py = e.clientY - elcontent.getAttribute('y');
            tx = elcontent.getAttribute('x');
            ty = elcontent.getAttribute('y');
        }
        window.addEventListener('mouseup',handle_mouseup);
        window.addEventListener('mousemove',handle_mousemove);
    }

    function handle_mouseup(e){
        //console.log(e);
        if(e.button == 0){
            bmove = false;
            //console.log(bmove);
        }
        window.removeEventListener('mouseup',handle_mouseup);
        window.removeEventListener('mousemove',handle_mousemove);
    }

    function handle_mousemove(e){
        //let x = e.clientX - e.pageX;
        //console.log(x)
        if(bmove){
            elcontent.setAttribute ('x', e.clientX - px);
            elcontent.setAttribute ('y', e.clientY - py);
            tx = e.clientX - px;
            ty = e.clientY - py;
            //console.log(elcontent);
            //translate(elcontent,e.clientX,e.clientY);
        }
    }

    function handle_loaded(e){
        console.log("loaded");
    }
    /*
    on:mouseup={handle_mouseup}
    on:mousemove={handle_mousemove}
    */

   onMount(() => {
       elcontent = document.getElementById(id);
       console.log(elcontent);
   });
</script>
<style>

</style>
<g id="ran" x="100" y="0" 
    transform="translate({tx} {ty})"
    >

    <polygon id="target1" points="83.97 253.74 87.35 260.6 94.91 261.69 89.44 267.03 90.73 274.56 83.97 271.01 77.2 274.56 78.49 267.03 73.02 261.69 80.58 260.6 83.97 253.74" style="fill: gray"/>
    <rect 
        id="Sqaure"
        x="0"
        y="0"
        width="100" 
        height="100" 
        fill="#333" 
        on:click={handle_mouseclick} 
        on:mousedown={handle_mousedown}
        >
    </rect>

    <rect 
        id="test"
        x="10"
        y="10"
        width="10" 
        height="10" 
        fill="#FFA07A" 
        on:click={handle_mouseclick} 
        on:mousedown={handle_mousedown}
        >
    </rect>
    <text x="10" y="10" style="stroke: #660000; fill: #660000">
        Text grouped with shapes</text>
</g>