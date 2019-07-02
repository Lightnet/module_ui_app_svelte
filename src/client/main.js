//===============================================
//
//===============================================
import App from './App.svelte';
import svelte from 'svelte/compiler';
console.log(`running svelte version ${svelte.VERSION}`);

//import {StringProperty} from './component/props/StringProperty'
import mjs from './mjs'

localStorage.clear();

const app = new App({
	target: document.body,
	props: {
		name: 'MSJ App.'
	}
});

let strtest = new mjs.props.StringProperty({name:"test",default:"beta"});

export default app;

/*
// Will resolve after 200ms
let promiseA = new Promise((resolve, reject) => {
	let wait = setTimeout(() => {
		clearTimeout(wait);
	  	resolve('Promise A win!');
	}, 200)
  })
  
  // Will resolve after 400ms
  let promiseB = new Promise((resolve, reject) => {
	let wait = setTimeout(() => {
		clearTimeout(wait);
	  	resolve('Promise B win!');
	}, 400)
  })
  
  // Let's race our promises
  let race = Promise.race([
	promiseA,
	promiseB
  ])
  
  race.then((res) => console.log(res)) // -> Promise A win!
  */