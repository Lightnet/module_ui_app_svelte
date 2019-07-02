<script>
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { count, UserName, SessionHash, Sl_blogin, Sl_Mouseregion } from '../../stores.js';

    let div1;
    let div2;
    let m = {x:0,y:0};
    let bresize = false;
    let bhorizontal = true;
    let sheight = '100%';
    let swidth = '4px';
    let resizetag = 'n-resize';
    function dec2hex (dec) {
		return ('0' + dec.toString(16)).substr(-2)
	}

	// generateId :: Integer -> String
	function generateId (len) {
		var arr = new Uint8Array((len || 40) / 2)
		window.crypto.getRandomValues(arr)
		return Array.from(arr, dec2hex).join('')
    }
    let idsplitter = generateId(20);
    function handleMousemove(event){
        m.x = event.clientX;
        m.y = event.clientY;
        //console.log(m);
        Sl_Mouseregion.set("splitter");
    }
    function handleMouseclick(event){
        //console.log(event);
        //console.log(event.buttons)
    }
    onMount(async () => {
        //console.log("onMount");
        if(bhorizontal){
            sheight = '4px';
            swidth = '100%';
            resizetag = 'n-resize';
        }else{
            sheight = '100%';
            swidth = '4px';
            resizetag = 'w-resize';
        }
        let splitter = document.getElementById(idsplitter);
        splitter.style.height = sheight;
        splitter.style.width = swidth;
        splitter.style.cursor = resizetag;
    });
</script>
<style>
.splitter{
    width:100%;
    background-color:#002200;
    float:left;
    height:4px;
    position:absolute;
    cursor:n-resize;
}
</style>

<div id="{idsplitter}" class="splitter" on:mousemove={handleMousemove} on:mousedown={handleMouseclick}></div>