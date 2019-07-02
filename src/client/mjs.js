import { writable } from 'svelte/store';
//https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
//https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
//https://stackoverflow.com/questions/47383375/how-can-i-export-static-function-in-es6

export const currentregion = writable('None');
export const sl_viewregion = writable('None');
export const sl_category = writable('None');
export const sl_context = writable('None');

export const Sl_Mouseregion = writable('None');

//static varaible
export const scenes = {};
export const objects = {};
export const materials = {};
export const textures = {};
export const nodes = {};

export const actions = {};
export const animations = {};

export const ops = {};
export const wins = {};

export const types = {};

export const screens = {};



export default {
    types,
    data:{
        objects,
        scenes,
        materials,
        textures,
        nodes,
        actions,
        animations,
    },
    ops,
    wins,
    context:{
        screens
    }
}

//export default ops;
//export default class obj{
    //constructor(){
        //this.text = "test";
    //}
//}