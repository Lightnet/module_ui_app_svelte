/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import App from './App.svelte';
import svelte from 'svelte/compiler';
console.log(`running svelte version ${svelte.VERSION}`);

//import {StringProperty} from './component/props/StringProperty'
import mjs from './mjs'

localStorage.clear();

AFRAME.registerComponent('natural-size', {
	init(){
		//console.log(this.el);
	},
	update(){

	},
	remove() {
		//console.log(this.el);
	}
});

const app = new App({
	target: document.body,
	props: {
		name: 'MJS App.'
	}
});

app.$on("workspace",(event)=>{
	//console.log('workspace');
	//console.log(event);
	//console.log("workspace: " + event.detail);
})


//let strtest = new mjs.props.StringProperty({name:"test",default:"beta"});
//console.log(mjs);

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