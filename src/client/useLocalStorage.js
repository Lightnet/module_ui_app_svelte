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