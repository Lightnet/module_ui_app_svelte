<script>
    //https://dev.to/pulljosh/how-to-load-html-css-and-js-code-into-an-iframe-2blc
    //https://codepen.io/grimen/pen/lBuiG/
    //https://dev.to/pulljosh/how-to-load-html-css-and-js-code-into-an-iframe-2blc
    //https://codepen.io/
    //https://enlight.nyc/projects/code-editor/
    //https://babeljs.io/docs/en/next/babel-standalone.html
    //https://github.com/babel/babel-standalone/tree/master/packages/babili-standalone
    //https://stackoverflow.com/questions/37228247/how-to-use-babel-directly-from-a-script-tag-without-installing-babel-itself
    //https://www.npmjs.com/package/svelte/v/3.0.0-alpha26


    import { onMount,beforeUpdate, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { generateId } from '../helper/generateid.js';
    import mjs from '../../mjs.js';
    import svelte from 'svelte/compiler';
    //const dispatch = createEventDispatcher();
    //console.log(svelte);

    let idcontent = generateId(20);
    let elementcontent;

    let idtextcode ="code" + generateId(20);
    let eltextcode;

    let idtextscript = "script"+ generateId(20);
    let eltextscript;

    let iddebug = "iframe"+ generateId(20);
    let eldebug;

    let inputscript = "";
    let outputscript = "";
    let debugscript = "";

    let bcode = true;
    let bscripot = false;
    let bdebug = false;

    inputscript = `
    console.log("test");
    `;

    inputscript =`//console.log("test");
    function fntext(){
        console.log("test");
    }
    fntext();
    class Text{
        constructor(){
            this.tt="test";
            console.log("class test...");
        }
    }

    let t = new Text();
    console.log(t);
    `;

    outputscript = `
    //console.log("test");
    function fntext(){
        console.log("test");
    }
    fntext();
    class Text{
        constructor(){
            this.tt="test";
            console.log("class test...");
        }
    }

    let t = new Text();
    console.log(t);
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
        
        source +=`</ head>
            <body>
                ${html || ''}
            </ body>
            </ html>
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
        /*
        if(bcode){
            adjustcodesize();
        }
        if(bscripot){
            adjustscriptsize();
        }
        */
        if(bdebug){
            adjustdebugsize();
        }
    }

    function compilescript(){
        
        //babeljs compile
        outputscript = Babel.transform(inputscript, { presets: ['es2015'] }).code;
        //console.log(Babel.version);
        //outputscript = Babel.transform(inputscript).code;

        /*//Svelte 3
        let result = svelte.compile(inputscript, {
            // options
            format:"esm",
            //generate:"dom",
            //immutable:false,
            css:false
        });
        console.log(result);
        outputscript = result.js.code;
        */
    }
    
    onMount(() => {
        //console.log("mount")
        elementcontent = document.getElementById(idcontent);
        eltextcode = document.getElementById(idtextcode);
        eltextscript = document.getElementById(idtextscript);
        eldebug = document.getElementById(iddebug);


        let parent = elementcontent.parentNode;
        //console.log(parent.clientWidth);
        eltextcode = document.getElementById(idtextcode);
        eltextcode.style.width = parent.clientWidth + "px";
        eltextcode.style.height = (parent.clientHeight - 50) + "px";

        handle_texteditor_resize();
        window.addEventListener('resize', handle_texteditor_resize);
        window.addEventListener('compilescript', compilescript);

        /*
        if(bcode){
            adjustcodesize();
        }
        if(bscripot){
            adjustscriptsize();
        }
        */
        if(bdebug){
            adjustdebugsize();
        }
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
        console.log("afterUpdate...");
        /*
        if(bcode){
            adjustcodesize();
        }
        if(bscripot){
            adjustscriptsize();
        }        
        */
        if(bdebug){
            adjustdebugsize();
        }
    })

    function handle_mousemove(event){
        //console.log(m);
        mjs.context.contextmenu.set({sm_context:'TEXTEDITOR'});
    }

    function adjustcodesize(){
        console.log("code??");
        elementcontent = document.getElementById(idcontent);
        let parent = elementcontent.parentNode;
        //console.log(parent.clientWidth);
        eltextcode = document.getElementById(idtextcode);
        eltextcode.style.width = parent.clientWidth + "px";
        eltextcode.style.height = (parent.clientHeight - 50) + "px";
        console.log(parent.clientHeight);
        console.log(eltextcode.style.height);
    }

    function btncode(){
        bcode =true;
        bscripot =false;
        bdebug =false;
    }
    function adjustscriptsize(){
        console.log("code??");
        let parent = elementcontent.parentNode;
        eltextscript = document.getElementById(idtextscript);
        //console.log(eloutscript);
        eltextscript.style.width = parent.clientWidth + "px";
        eltextscript.style.height = (parent.clientHeight - 50) + "px";
        console.log(parent.clientHeight);
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
    }
    function btndebug(){
        bcode =false;
        bscripot =false;
        bdebug =true;
    }

    function btntest3(){
        console.log("compile test");
        let jsblob = new Blob([outputscript], {type: 'text/babel'});
        let jsurl = URL.createObjectURL(jsblob);
        let iframe = document.getElementById(iddebug);
        var code = iframe.contentWindow.document;
        iframe.sandbox = 'allow-forms allow-scripts allow-same-origin';

        let codehtml = "Hello World";
        
        //<script type="text/javascript" src="${jsurl}" />
        let html = codehtml +
            `<style>
                body{
                    color:white;
                }
            </style>`;
        code.open();
        code.writeln(
            html
            //"hello world"
        );
        //code.writeln(
            //`<script type="text/javascript" src="${jsurl}"/>` //does not work for some reason
        //);
        code.close();

        let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = jsurl;
        //iframe.appendChild(script);
        //iframe.contentWindow.document.appendChild(script);//nope
        //iframe.contentWindow.document.append(script);//nope
        let iframedoc = iframe.document;
        if (iframe.contentDocument)
			iframedoc = iframe.contentDocument;
		else if (iframe.contentWindow)
            iframedoc = iframe.contentWindow.document;
        //iframedoc.body.append(script);//works
        iframedoc.head.append(script);//works
        //console.dir(iframe.contentWindow.document)
    }

    function btntest2(){

        //let jsblob = new Blob([outputscript], {type: 'text/javascript'});
        let jsblob = new Blob([outputscript], {type: 'text/javascript'});
        //let jsblob = new Blob([jsscript], {type: 'text/html'});
        let jsurl = URL.createObjectURL(jsblob);
        //<script type="text/javascript" src="${jsurl}">
        let html = '';

        html = `
        <style>
        body { 
        background:gray; 
        color: white;
        }
        </style>
        <h1>This is Blob Content</h1>
        `;
        //console.log(html);


        var blob = new Blob([html], {type: 'text/html'});
        //let simplescript = 'console.log("test");';
        //var blob = new Blob([outputscript], {type: 'text/javascript'});

        let iframe = document.getElementById(iddebug);
        //iframe.src = url;
        //iframe.src="/test.html";
        //console.log(blob);
        iframe.src = URL.createObjectURL(blob);
        //iframe.src = jsurl;
        iframe.sandbox = 'allow-forms allow-scripts allow-same-origin';
        //console.dir(iframe);

        let script;
        //script = document.createElement('script');
        //script.type = "text/javascript";
        //script.innerHTML ="console.log('here test');";
        //script.innerHTML = outputscript;
        //script.src = "/bundle.js";
        //iframe.appendChild(script);

        script = document.createElement('script');
        script.type = "text/javascript";
        //script.innerHTML ="console.log('here test');";
        //script.innerHTML = outputscript;
        script.src = jsurl;
        iframe.appendChild(script);

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
    textarea { 
        width:100%;
        height: 100%; 
    }
    .textauto{
        width:100%;
        height:100%;
    }
</style>

<div id="{idcontent}" on:mousemove={handle_mousemove}>
    <!--Text Editor<button on:click={compilescript}> Compile </button>-->
    <button on:click={btncode}> Code </button>
    <button on:click={btnscript}> Script </button>
    <button on:click={btndebug}> Debug </button>
    <button on:click={btntest3}> Run </button>
    {#if bcode == true}
        <textarea id={idtextcode} bind:value={inputscript}></textarea>
    {/if}
    {#if bscripot == true}
        <div class="textauto">
        <textarea id={idtextscript} bind:value={outputscript}></textarea>
        </div>
    {/if}
    {#if bdebug == true}
        <iframe title="" id={iddebug}
        
        ></iframe>
    {/if}
</div>