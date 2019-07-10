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

```javascript
class object_ot_listener{
    
    constructor(){
        this.handleclick = (e)=> this.handle_press(e);//this deal with id handler removeEventListener

        this.init();
    }

    init(){
        window.addEventListener('mousedown', this.handleclick);
    }

    handle_press(event){
        //console.log(event.button);
        if(event.button == 0){//left
            console.log("0");
        }
        if(event.button == 1){//middle
            console.log("1");
        }
        if(event.button == 2){//right
            console.log("2");
            this.remove_handle();
        }
    }
    remove_handle(){
        window.removeEventListener('mousedown', this.handleclick);
    }
}

var test = new object_ot_listener();
```


