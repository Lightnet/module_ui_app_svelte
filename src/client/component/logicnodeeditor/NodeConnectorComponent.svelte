<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    //import SVG from 'svg.js';
    const dispatch = createEventDispatcher();

    let idcomponent;// = "node" + generateId(20);
    let elcomponent;
    export let px;
    export let py;
    //let height;
    //let width;
    let color = "#FFA07A";
    let defaultcolor = "#FFA07A";
    let overcolor = "#B9785C";
    let outcolor = "#FFA07A";
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
        //let svgP;
        //console.log(elpinin.id)
        //console.log(elpinin.parentNode.id);
        //point1.x = elpinin.parentNode.getBoundingClientRect().x + parseFloat(elpinin.getAttribute("x"));
        //point1.y = elpinin.parentNode.getBoundingClientRect().y + parseFloat(elpinin.getAttribute("y"));
        //point1.x = g.x() + parseFloat(elpinin.getAttribute("x"));
        //point1.y = g.y() + parseFloat(elpinin.getAttribute("y"));
        //let svgP = svgPoint(svg, point1.x, point1.y);
        //point1.x = svgP.x;
        //point1.y = svgP.y;
        //point1=point1;
        //point2.x = elpinout.parentNode.getBoundingClientRect().x + parseFloat(elpinout.getAttribute("x"));
        //point2.y = elpinout.parentNode.getBoundingClientRect().y + parseFloat(elpinout.getAttribute("y"));
        //svgP = svgPoint(svg, point2.x, point2.y);
        //point2.x = svgP.x;
        //point2.y = svgP.y;
        //point2.x = g.x() + parseFloat(elpinout.getAttribute("x"));
        //point2.y = g.y() + parseFloat(elpinout.getAttribute("y"));
        //point2 = point2
    }

    onMount(() => {
        elcomponent = document.getElementById(idcomponent);
        elpinin = document.getElementById(idpinin);
        elpinout = document.getElementById(idpinout);
        //console.log(elpinin);
        //console.dir(elpinin.parentNode);

        //console.log(elpinin.parentNode.transform.baseVal.consolidate());
        //console.log(elpinin.parentNode.getBoundingClientRect());
        //let point = {};
        //point.x = elpinin.parentNode.transform.baseVal.consolidate().e + elpinin.getAttribute("x");
        //point.y = elpinin.parentNode.transform.baseVal.consolidate().f + elpinin.getAttribute("y");
        //console.log(elpinin.parentNode.getBoundingClientRect().x )
        //console.log( elpinin.getAttribute("x") )
        //point1.x = elpinin.parentNode.getBoundingClientRect().x + parseFloat(elpinin.getAttribute("x"));
        //point1.y = elpinin.parentNode.getBoundingClientRect().y + parseFloat(elpinin.getAttribute("y"));
        //point1=point1;

        //point2.x = elpinout.parentNode.getBoundingClientRect().x + parseFloat(elpinout.getAttribute("x"));
        //point2.y = elpinout.parentNode.getBoundingClientRect().y + parseFloat(elpinout.getAttribute("y"));
        //point2 =point2
        //console.log(point);
        //console.log(elpinout.parentNode.transform.baseVal.consolidate());
        //console.log(elpinin.getAttribute("x"));
        //console.log(elpinin.getAttribute("y"));
        //assignid = idcomponent;
        updateline();
        //console.log(point1);
        //console.log(point2);
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
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("over");
        //color = overcolor;
        //dispatch("node",{id:idcomponent,type:"connector",mouse:"over",pinout:boutput});
        //updateline();
        
    }

    function handle_mouseout(e){
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //console.log("out");
        //color = outcolor;
        //dispatch("node",{id:idcomponent,type:"connector",mouse:"out",pinout:boutput});
        //updateline();
    }

</script>
<style>
    .nonselect{
        pointer-events: none;
    }
</style>

<line id="{idcomponent}" on:mouseover={handle_mouseover} on:mouseout={handle_mouseout} class="{ bselect == false ? "nonselect" : "" }" x1="{point1.x}" y1="{point1.y}" x2="{point2.x}" y2="{point2.y}" style="stroke:rgb(255,0,0);stroke-width:2" />
<!--
<line id="{idcomponent}" class="{ bselect == false ? "nonselect" : "" }" x1="0" y1="0" x2="100" y2="10" style="stroke:rgb(255,0,0);stroke-width:2" />
-->
<!--
<rect 
    id="{idcomponent}"
    x="{px}"
    y="{py}"
    width="20" 
    height="20" 
    fill="{color}"
    on:mouseover={handle_mouseover}
    on:mouseout={handle_mouseout}
    >
</rect>
-->
