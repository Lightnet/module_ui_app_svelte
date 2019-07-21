```javascript
window.dispatchEvent(new Event('updatepin'));

window.dispatchEvent(new CustomEvent('updatepin',{detail:data}));
```


```javascript
function createstyle(element){
        var css = '.menubtn:hover{ background-color: white !important; }';
        var style = document.createElement('style');

        if (element.style.styleSheet) {
            //console.log("found! sheet");
            style.styleSheet.cssText = css;
        } else {
            //console.log("create style");
            style.appendChild(document.createTextNode(css));
        }
        element.appendChild(style);
    }
```

```javascript
console.dir(); //create list var and function for element

```
# iframe
```javascript
let outputscript = `console.log("test");`;
let jsblob = new Blob([outputscript], {type: 'text/babel'});
let jsurl = URL.createObjectURL(jsblob);

let iframe = document.getElementById(id);
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

let script = document.createElement('script');
script.type = "text/javascript";
script.src = jsurl;
//iframe.appendChild(script);
let iframedoc = iframe.document;
if (iframe.contentDocument)
    iframedoc = iframe.contentDocument;
else if (iframe.contentWindow)
    iframedoc = iframe.contentWindow.document;
//iframedoc.body.append(script);//works
iframedoc.head.append(script);//works

```