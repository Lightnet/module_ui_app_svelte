<script>
    //https://www.w3schools.com/howto/howto_css_dropdown_navbar.asp
    //https://www.w3schools.com/howto/howto_js_dropdown.asp
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import mjs from '../../mjs.js';
    import {StatusBarConfig} from '../../mjs.js';
    import { generateId } from '../helper/generateid.js';
    
    export let idassign;
    let elcomponent;
    export let name ="0";
    let MouseRegion = "None";
    let mouse = {x:0,y:0};
    let contextmenu = "";
    let idstyle = generateId(20);
    
    const dispatch = createEventDispatcher();

    let menus = [];

    let StatusBarStyle = {};

	const StatusBarConfigUnsub = StatusBarConfig.subscribe(value=>{
		StatusBarStyle = value;
		//console.log("vaule theme change?");
		checktheme();
	});

    const contextmenuunsubscribe = mjs.context.contextmenu.subscribe(event => {
        //console.log(event);
        if(event.sm_context != null){
            contextmenu = event.sm_context;
        }
    });

    function checktheme(){
		if(elcomponent ==null){
			return;
		}
		//console.log(MainHeaderStyle);
		//https://stackoverflow.com/questions/3304014/how-to-interpolate-variables-in-strings-in-javascript-without-concatenation
		let css = `
		.statusbtn{ background-color: ${StatusBarStyle.menubtn.d} !important; }
		.statusbtn:hover{ background-color: ${StatusBarStyle.menubtn.h} !important; } 
		.statusbtn:active{ background-color: ${StatusBarStyle.menubtn.a} !important; }
		.statusbarfooter{ background-color: ${StatusBarStyle.bg.c} !important;}
		`;
		//console.log(css);
		createstyle(elcomponent,css);
	}

	function createstyle(element,_css){
		//let css = '.menubtn:hover{ background-color: white !important; }';
		//remove element to update style
		let css = _css;
		let elsytle = document.getElementById(idstyle);
		if(elsytle){
			elsytle.remove();
			elsytle =null;
		}
		if(elsytle == null){
			//console.log("create style");
			elsytle = document.createElement('style');
			elsytle.setAttribute("id",idstyle);
			elsytle.appendChild(document.createTextNode(css));
			//console.log(elsytle);
			element.appendChild(elsytle);
		}
    }

    function handleMousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'FOOTER'});
    }

    function handle_MousePostion(event){
        //console.log(m);
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }

    onMount(() => {
        elcomponent = document.getElementById(idassign);
        checktheme();
        window.addEventListener('mousemove', handle_MousePostion);
    });

    onDestroy(()=>{
        window.removeEventListener('mousemove', handle_MousePostion);
        StatusBarConfigUnsub();
        mouseregionunsub();
        contextmenuunsubscribe();
    });
</script>

<style>
    .navbar {
        overflow: hidden;
        background-color: #212121;
        font-family: Arial, Helvetica, sans-serif;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .navbar a {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar label {
        float: left;
        font-size: 12px;
        color: white;
        text-align: center;
        padding: 4px 4px;
        text-decoration: none;
    }

    .navbar a:hover {
        background-color: lightslategrey;
    }
</style>

<div id="{idassign}" on:mousemove={handleMousemove} class="navbar statusbarfooter">
    <a href="/#" class="statusbtn"> {name} </a>
    <label>Status:Normal</label>
    <label> ContextMenu: {contextmenu} </label>
    <label> | x:{mouse.x} y:{mouse.y} |</label>
</div>