<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    //import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let idcomponent;// = "node" + generateId(20);
    let elcomponent;
    //export let px;
    //export let py;
    let strokecolor = "rgb(100,100,100)";
    strokecolor = "green";
    let strokewidth = 2;
    strokewidth = 4;

    //export let draw;
    export let svg;
    export let bselect = false;

    let point1 = {x:0,y:0};
    let point2 = {x:0,y:0};
    export let idpinin;
    let elpinin;
    export let idpinout;
    let elpinout;
    let pinsize = 20;

    // translate page to SVG co-ordinate
    function svgPoint(element, x, y) {
        var pt = svg.createSVGPoint();
        pt.x = x ;
        pt.y = y ;
        return pt.matrixTransform(element.getScreenCTM().inverse());
    }

    function updateline(){
        //console.log(elpinin.x);
        //console.log("update lines?");
        if(elpinin == null){
            return;
        }
        if(elpinout == null){
            return;
        }
        let g = SVG.get(elpinin.parentNode.id);
        let p = SVG.get(elpinin.id);
        point1.x = g.x() + p.x() + (pinsize/2);
        point1.y = g.y() + p.y() + (pinsize/2);
        g = SVG.get(elpinout.parentNode.id);
        p = SVG.get(elpinout.id);
        point2.x = g.x() + p.x() + (pinsize/2);
        point2.y = g.y() + p.y() + (pinsize/2);
    }

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        elpinin = document.getElementById(idpinin);
        elpinout = document.getElementById(idpinout);
        updateline();
        window.addEventListener('updateconnectors', UpdateConnector);
    });

    afterUpdate(()=>{
        updateline();
    });

    function UpdateConnector(e){
        //console.log("update connector?");
        //updateline();
        point1 = point1;
    }

    onDestroy(()=>{
        window.removeEventListener('updateconnectors', UpdateConnector);
    });

    function handle_mouseover(e){
        //console.log("over");
        //dispatch("node",{id:idcomponent,type:"connector",mouse:"over",pinout:boutput});
    }

    function handle_mouseout(e){
        //console.log("out");
        //dispatch("node",{id:idcomponent,type:"connector",mouse:"out",pinout:boutput});
    }

</script>
<style>
    .nonselect{
        pointer-events: none;
    }
</style>

<line 
    id="{idcomponent}" 
    on:mouseover={handle_mouseover} 
    on:mouseout={handle_mouseout} 
    class="{ bselect == false ? "nonselect" : "" }" 
    x1="{point1.x}" 
    y1="{point1.y}" 
    x2="{point2.x}" 
    y2="{point2.y}" 
    style="stroke:{strokecolor};stroke-width:{strokewidth};"
/>
<!--
<line 
    id="{idcomponent}" 
    class="{ bselect == false ? "nonselect" : "" }" 
    x1="0" 
    y1="0" 
    x2="100" 
    y2="10" 
    style="stroke:rgb(255,0,0);stroke-width:2"
/>
-->
