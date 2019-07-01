<script>
    //https://dev.to/iamafro/how-to-create-a-custom-context-menu--5d7p
    //https://jsfiddle.net/softvar/6ny94/
    import { onMount, setContext, createEventDispatcher } from 'svelte'
    import { count, UserName, SessionHash, Sl_blogin } from '../../stores.js';

    let div1;
    let div2;
    let m = {x:0,y:0};
    let bresize = false;

    //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	// dec2hex :: Integer -> String
    // i.e. 0-255 -> '00'-'ff'
    /*
	function dec2hex (dec) {
		return ('0' + dec.toString(16)).substr(-2)
	}

	// generateId :: Integer -> String
	function generateId (len) {
		var arr = new Uint8Array((len || 40) / 2)
		window.crypto.getRandomValues(arr)
		return Array.from(arr, dec2hex).join('')
	}
    */
    //let idmenu = generateId(20);
    let idmenu = "scontextmenu"
    let menu;

    onMount(async () => {
        //console.log("onMount");
        menu = document.getElementById(idmenu);
    });

    //console.log(menu);
    let menuVisible = false;

    const toggleMenu = command => {
        menu.style.display = command === "show" ? "block" : "none";
        menuVisible = !menuVisible;
    };

    const setPosition = ({ top, left }) => {
        menu.style.left = `${left}px`;
        menu.style.top = `${top}px`;
        toggleMenu("show");
    };

    window.addEventListener("click", e => {
        if(menuVisible)toggleMenu("hide");
    });

    window.addEventListener("contextmenu", e => {
        //console.log("contextmenu");
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition(origin);
        return false;
    });
</script>

<style>
.menuitem {
    list-style:none;
    margin:0px;
    margin-top:4px;
    padding-left:10px;
    padding-right:10px;
    padding-bottom:3px;
    font-size:17px;
    color: #333333;
}

.menuitem :hover{
   color: white;
  background:#284570;
  border-radius:2px;
}

hr { width: 85%; 
    background-color:#E4E4E4;
    border-color:#E4E4E4;
    color:#E4E4E4;
}

.cntnr{
    display:none;
    position:fixed;
    left:0;
    top:0;
    border:1px solid #B2B2B2;
    width:150px;      background:#F9F9F9;
    box-shadow: 3px 3px 2px #E9E9E9;
    border-radius:4px;
}

li{
    padding: 3px;
    padding-left:10px;
}
</style>

<div id="{idmenu}" class="cntnr">
  <ul id="contextmenulist" class="menuitem">
    <li>Back</li>
    <li>Reload</li>
    <li>Save</li>
    <li>Save As</li>
    <li>Inspect</li>
  </ul>
</div>