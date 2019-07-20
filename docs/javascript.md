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