<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    const dispatch = createEventDispatcher();

    //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	// dec2hex :: Integer -> String
	// i.e. 0-255 -> '00'-'ff'
	function dec2hex (dec) {
		return ('0' + dec.toString(16)).substr(-2)
	}

	// generateId :: Integer -> String
	function generateId (len) {
		var arr = new Uint8Array((len || 40) / 2)
		window.crypto.getRandomValues(arr)
		return Array.from(arr, dec2hex).join('')
    }
    
    let id = generateId(20);

    //const element = document.querySelector(div);
    let element = document.getElementById(id);
    let minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    onMount(async () => {
        element = document.getElementById(id);
    });
    
    function mousedown(e){
        //console.log("mouse down");
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        //console.log(original_width,original_height)
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
    }

    function resize(e) {
        console.log(e.toElement.classList.contains('bottom-right'));
        if(e.toElement.classList.contains('bottom-right')){
            let width = original_width + (e.pageX - original_mouse_x);
            let height = original_height + (e.pageY - original_mouse_y)
            if (width > minimum_size) {
                element.style.width = width + 'px'
            }
            if (height > minimum_size) {
                element.style.height = height + 'px'
            }
        }else if(e.toElement.classList.contains('bottom-left')){
            let height = original_height + (e.pageY - original_mouse_y)
            let width = original_width - (e.pageX - original_mouse_x)
            if (height > minimum_size) {
                element.style.height = height + 'px'
            }
            if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
        }else if (e.toElement.classList.contains('top-right')) {
            let width = original_width + (e.pageX - original_mouse_x)
            let height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
                element.style.width = width + 'px'
            }
            if (height > minimum_size) {
                element.style.height = height + 'px'
                element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
        }
        else {
            let width = original_width - (e.pageX - original_mouse_x)
            let height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
                element.style.width = width + 'px'
                element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
            if (height > minimum_size) {
                element.style.height = height + 'px'
                element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }   
        }
    }
    function stopResize() {
        window.removeEventListener('mousemove', resize)
    }
</script>

<style>
    .resizable {
    background: white;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 100px;
    left: 100px;
    }

    .resizable .resizers{
    width: 100%;
    height: 100%;
    border: 3px solid #4286f4;
    box-sizing: border-box;
    }

    .resizable .resizers .resizer{
    width: 10px;
    height: 10px;
    border-radius: 50%; /*magic to turn square into circle*/
    background: white;
    border: 3px solid #4286f4;
    position: absolute;
    }

    .resizable .resizers .resizer.top-left {
    left: -5px;
    top: -5px;
    cursor: nwse-resize; /*resizer cursor*/
    }
    .resizable .resizers .resizer.top-right {
    right: -5px;
    top: -5px;
    cursor: nesw-resize;
    }
    .resizable .resizers .resizer.bottom-left {
    left: -5px;
    bottom: -5px;
    cursor: nesw-resize;
    }
    .resizable .resizers .resizer.bottom-right {
    right: -5px;
    bottom: -5px;
    cursor: nwse-resize;
    }
</style>
<div id="{id}" class='resizable'>
    <div class='resizers'>
        Test
        <div class='resizer top-left' on:mousedown={mousedown}></div>
        <div class='resizer top-right' on:mousedown={mousedown}></div>
        <div class='resizer bottom-left' on:mousedown={mousedown}></div>
        <div class='resizer bottom-right' on:mousedown={mousedown}></div>
    </div>
</div>