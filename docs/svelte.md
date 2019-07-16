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