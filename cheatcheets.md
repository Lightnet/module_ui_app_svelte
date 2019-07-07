# cheatsheet:

# test
```
//<script>let o ="test";</script>
```

# contextmenu

```javascript
    if (document.addEventListener) { // IE >= 9; other browsers
        document.addEventListener('contextmenu', function(e) {
            //alert("You've tried to open context menu"); //here you draw your own menu
            e.preventDefault();
        }, false);
    } else { // IE < 9
        document.attachEvent('oncontextmenu', function() {
            //alert("You've tried to open context menu");
            window.event.returnValue = false;
        });
	}
```


