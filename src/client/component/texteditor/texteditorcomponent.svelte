<script>
    //https://dev.to/pulljosh/how-to-load-html-css-and-js-code-into-an-iframe-2blc
    //https://codepen.io/grimen/pen/lBuiG/
    //https://dev.to/pulljosh/how-to-load-html-css-and-js-code-into-an-iframe-2blc
    //https://codepen.io/




    import { onMount,beforeUpdate, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import svelte from 'svelte/compiler';
    //const dispatch = createEventDispatcher();
    //console.log(svelte);

    let idcontent = generateId(20);
    let elementcontent;

    let idtextscript = generateId(20);
    let eltextscript;

    let idoutscript = generateId(20);
    let eloutscript;

    let iddebug = generateId(20);
    let eldebug;

    let inputscript = "";
    let outputscript = "";
    let debugscript = "";

    let bcode = true;
    let bscripot = false;
    let bdebug = false;

    inputscript = `
    let text = "test";
    console.log("test");
    `;

    outputscript = `
    console.log("test");
    `;

    function getBlobURL(code, type){
        let blob = new Blob([code], { type })
        return URL.createObjectURL(blob)
    }

    function getGeneratedPageURL({ html, css, js }){
        function getBlobURL(code, type){
            let blob = new Blob([code], { type })
            return URL.createObjectURL(blob)
        }

        let cssURL = getBlobURL(css, 'text/css');
        let jsURL = getBlobURL(js, 'text/javascript');
        let source = ``;
        
        source += `
            <html>
            <head>`;
        
        if(css){
            source += `<link rel="stylesheet" type="text/css" href="${cssURL}" />`;
        }
        if(jsURL){
            source += `<script  src="${jsURL}" />`;
        }
        
        source +=`</head>
            <body>
                ${html || ''}
            </body>
            </html>
        `;
        

        return getBlobURL(source, 'text/html')
    }

    function handle_texteditor_resize(event){
        //console.log("resize");
        if(elementcontent == null){
            return;
        }
        let parent = elementcontent.parentNode;
        elementcontent.style.height = parent.clientHeight + 'px';
        elementcontent.style.width = parent.clientWidth + 'px';
    }

    function compilescript(){
        let result = svelte.compile(inputscript, {
            // options
            format:"cjs",
            css:false,
            immutable:true,
        });
        console.log(result)
        outputscript = result.js.code;
    }
    
    onMount(() => {
        //console.log("mount")
        elementcontent = document.getElementById(idcontent);
        eltextscript = document.getElementById(idtextscript);
        eloutscript = document.getElementById(idoutscript);
        eldebug = document.getElementById(iddebug);

        
        //console.log(eltextscript);
        //eloutscript.style.width = parent.clientWidth + "px";
        //eloutscript.style.height = (parent.clientHeight - 50) + "px";
        //eldebug.style.width = parent.clientWidth + "px";
        //eldebug.style.height = (parent.clientHeight - 50) + "px";


        handle_texteditor_resize();
        window.addEventListener('resize', handle_texteditor_resize);
        window.addEventListener('compilescript', compilescript);
    });

    onDestroy(() => {
        //console.log("onDestroy");
        window.removeEventListener('resize', handle_texteditor_resize);
        window.removeEventListener('compilescript', compilescript);
    });

    beforeUpdate(()=>{
        //console.log("beforeUpdate...");
    });

    afterUpdate(()=>{
        //console.log("afterUpdate...");
        if(bcode){
            adjustcodesize();
        }
        if(bscripot){
            adjustscriptsize();
        }
        if(bdebug){
            adjustdebugsize();
        }
    })

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'TEXTEDITOR'});
    }

    function adjustcodesize(){
        elementcontent = document.getElementById(idcontent);
        let parent = elementcontent.parentNode;
        //console.log(parent.clientWidth);
        eltextscript = document.getElementById(idtextscript);
        eltextscript.style.width = parent.clientWidth + "px";
        eltextscript.style.height = (parent.clientHeight - 50) + "px";
    }

    function btncode(){
        bcode =true;
        bscripot =false;
        bdebug =false;
    }
    function adjustscriptsize(){
        let parent = elementcontent.parentNode;
        eloutscript = document.getElementById(idoutscript);
        //console.log(eloutscript);
        eloutscript.style.width = parent.clientWidth + "px";
        eloutscript.style.height = (parent.clientHeight - 50) + "px";
    }
    function btnscript(){
        bcode =false;
        bscripot =true;
        bdebug =false;
    }
    function adjustdebugsize(){
        let parent = elementcontent.parentNode;
        eldebug = document.getElementById(iddebug);
        eldebug.style.width = parent.clientWidth + "px";
        eldebug.style.height = (parent.clientHeight - 50) + "px";
        //console.log(eldebug);
        //console.dir(eldebug);
        //let url = getGeneratedPageURL({
            //html: '<p>Hello, world!</p>',
            //css: 'p { color: blue; }',
            //js: outputscript
        //});
        //let iframe = document.querySelector('#iframe');
        //let iframe = document.getElementById(iddebug);
        //iframe.src = url;
        //iframe.src = "test";
        //let jsxml = `<script > ${outputscript} `;
        //let jsxml = outputscript;
        //let jsxml = outputscript;

        //let doc = document.getElementById(iddebug).contentWindow.document;
        //doc.open();
        //doc.write(jsxml);
        //doc.close();
    }
    function btndebug(){
        bcode =false;
        bscripot =false;
        bdebug =true;
    }

    function btntest(){

        var html = `
<style>
body { 
  background: blue; 
  color: white;
}
</style>
<h1>This is Blob Content</h1>
`;

        var blob = new Blob([html], {type: 'text/html'});
        let simplescript = 'console.log("test");';
        //var blob = new Blob([outputscript], {type: 'text/javascript'});

        let iframe = document.getElementById(iddebug);
        //iframe.src = url;
        //iframe.src="/test.html";
        iframe.src = URL.createObjectURL(blob);
        iframe.sandbox = 'allow-forms allow-scripts allow-same-origin';
        //console.dir(iframe);

        let script = document.createElement('script');
        script.type = "text/javascript";
        //script.innerHTML ="console.log('here test');";
        script.innerHTML = outputscript;

        //script.src = "my.js";

        //iframe.contentDocument.head.append(script);
        iframe.appendChild(script);














        //document.getElementById(iddebug).contentWindow.console = console;

        /*var html = `
<style>
body { 
  background: blue; 
  color: white;
}
</style>
<h1>This is Blob Content</h1>
<script  type="text/javascript"> console.log("test");
`;
*/
        /*
        var blob = new Blob([html], {type: 'text/html'});
        //var blob = new Blob([outputscript], {type: 'text/javascript'});
        let iframe = document.getElementById(iddebug);
        iframe.src = URL.createObjectURL(blob);
        */
        /*
        let url = getGeneratedPageURL({
            html: '<p>Hello, world!</p>',
            css: 'p { color: blue; }',
            //js: outputscript
            js: 'console.log("test");alert("test");'
        });

        */
        //let iframe = document.getElementById(iddebug);
        //iframe.src = url;
        
        //iframe.src='https://www.google.com/';
        //iframe.src=url;
        //iframe.src="/test.html";
        //iframe.sandbox = 'allow-forms allow-scripts allow-same-origin';

        /*
        let oldDoc = iframe.contentDocument;
        
        // every 100 ms check if the document is the new one
        let timer = setInterval(() => {
            let newDoc = iframe.contentDocument;
            if (newDoc == oldDoc) return;

            alert("New document is here!");

            clearInterval(timer); // cancel setInterval, don't need it any more
        }, 100);
        */
        
        


        //let doc = document.getElementById(iddebug).contentWindow.document;
        //let jsURL = getBlobURL(outputscript, 'text/javascript');
        //let jsURL = getBlobURL(outputscript, 'text/javascript');
        

        //text/javascript
        //let jsxml = `<script type="application/javascript" src=${jsURL}>`;
        //jsxml += 
        //doc.open();
        //doc.write(jsxml);
        //doc.write("hello world");
        //doc.close();
    }
    //<!-- sandbox="allow-forms allow-scripts allow-same-origin"-->
</script>

<style>

</style>
<div id="{idcontent}" on:mousemove={handle_mousemove}>
    <!--Text Editor<button on:click={compilescript}> Compile </button>-->
    <button on:click={btncode}> Code </button>
    <button on:click={btnscript}> Script </button>
    <button on:click={btndebug}> Debug </button>
    <button on:click={btntest}> Test </button>
    {#if bcode == true}
        <textarea id={idtextscript} bind:value={inputscript}></textarea>
    {/if}
    {#if bscripot == true}
        <textarea id={idoutscript} bind:value={outputscript}></textarea>
    {/if}
    {#if bdebug == true}
        <iframe title="" id={iddebug}
        
        ></iframe>
    {/if}
</div>