# Svelte 3
 * Notes
 * simple examples 

## Storage Data

# useLocalStorage.js
```javascript
//useLocalStorage.js
//https://www.encona.com/nativescript-persist-state/
export default function useLocalStorage(store, key) {
	const json = localStorage.getItem(key);
	if (json) {
		store.set(JSON.parse(json));
	}

    store.subscribe( value => {
		localStorage.setItem(key, JSON.stringify(value));
	});
}
```
Simple Save and Load local store helper.

# mjs.js
```javascript
//mjs.js
import useLocalStorage from './useLocalStorage.js';

export const store = new writable({
	name: 'world'
});

useLocalStorage(store, 'app1'); //assign id else it might override browser local storage save.
```
# app.svelete
```javascript
//app.svelete test

import { store } from './mjs.js';

const unsubscribe = store.subscribe(value => {
	console.log(value);
});

//store.set({name:"world2"});

```

# Stylesheet:
 To override the theme setting is to used append and rather used svelte <style> that will not work.

## theme.svelte
```html javascript svelte
<script>
	let text="test";
</script>

<style>
 .menubtn{
	 {text} /* will not work */
 }
</style>
```

```html javascript svelte
<script>
//...
function createstyle(element){
	var css = '.menubtn:hover{ background-color: white !important; }';//note used !important to init change style theme.
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
</script>
```

# get component id(not working...)
```html javascript svelte
<script>
	//let component = new Component(id);
	//let app = new App(id);
</script>
```