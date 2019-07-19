/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 */
//console.log("init ?");
import { writable, get } from 'svelte/store';
import useLocalStorage from './useLocalStorage.js';
//import Gun from 'gun/gun';
//https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
//https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
//https://stackoverflow.com/questions/47383375/how-can-i-export-static-function-in-es6
//===============================================
// setup props
//===============================================
import {StringProperty} from './component/props/StringProperty';
//===============================================
// setup
//===============================================
import {Operator} from './component/types/operator';
import {Menu} from './component/types/menu';

const appid = "mjs";
var themeid = "default";

export const appconfig = new writable({
    name: 'mjs',
    usegunlocal:true,
    usecustomtheme:false,
    username:"Guest"
});

useLocalStorage(appconfig, appid + "config");
/*
appconfig.set({
    name: 'mjs',
    usegunlocal:false,
    usecustomtheme:false,
    username:"Guest"
});
*/
//var config = get(appconfig);
//console.log(config);

export const themeconfig = new writable("default");
themeconfig.subscribe(value=>{
    themeid = value;
});
useLocalStorage(themeconfig, appid + "theme");
//===============================================
// Theme style setting
// Edit remove or add will break style need to reset store data.
//===============================================
export const TopBarConfig = new writable({
    menubtn:{
        d:"#232323",
        h:"#5177b2"
    },
    workspacebtn:{
        d:"#2b2b2b",
        h:"#3a3a3a",
        a:"#424242"
    },
    bg:{
        c:"#232323"
    }
});
useLocalStorage(TopBarConfig, appid + themeid + "TopBarHeader");

export const StatusBarConfig = new writable({
    menubtn:{
        d:"#232323",
        h:"#5177b2"
    },
    bg:{
        c:"#232323"
    }
});
useLocalStorage(StatusBarConfig, appid + themeid + "StatusBarFooter");


export const LogicNodeID = writable('');

export var gun = null;

//===============================================
// access view area
//===============================================
export const currentregion = writable('None');
export const sl_viewregion = writable('None');
export const sl_category = writable('None');
export const sl_context = writable('None');

//static varaible
export const scenes = [];
export const objects = [];
export const materials = [];
export const textures = [];
export const nodes = [];
export const data = {};
export const actions = [];
export const animations = [];
export const ops = {};
export const wins = {};
export const screens = {};
export const types = {};
export const props = {};
export const context = {};

export const view_layer = {};

data.objects = objects;
data.scenes = scenes;
data.materials = materials;
data.textures = textures;
data.nodes = nodes;
data.actions = actions;
data.animations = animations;

export const CollapseFileMenuMainHeader = writable(false);
data.CollapseFileMenuMainHeader = CollapseFileMenuMainHeader;

context.screens = screens;
context.scene = {};
context.view_layer = view_layer;
context.view_layer.objects = objects;


export const screenregion = null;//= writable(null);
context.screenregion = screenregion;

export const splitregion = null;//writable(null);
context.splitregion = splitregion;

export const contextmenu = writable({sm_context:'none',ops:{}});
context.contextmenu = contextmenu;

export const active = writable(null);
context.view_layer.objects.active = active;
context.scene = writable({});

export const updatetoggle = writable(false);

context.updatetoggle = updatetoggle;

props.StringProperty = StringProperty

export const utils = {}
// https://docs.blender.org/api/blender2.8/bpy.types.Operator.html
// https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
// need to check function or class
export function register_class(obj){
    //console.log(typeof(obj))
    //console.log(obj)
    if (typeof(obj) == 'function'){
        var tmp = new obj();
        //console.log(tmp)
        //console.log(tmp.name)
        if(tmp instanceof Operator){
            //ops[tmp.sm_idname] = tmp;
            ops[tmp.sm_idname] = function(args){
                if(args == null){
                    tmp.execute(context);
                }
                //this.obj = tmp;
                return tmp;
                //return this.obj;
            }
            ops[tmp.sm_idname].sm_label = tmp.sm_label;
            ops[tmp.sm_idname].sm_context = tmp.sm_context;
            ops[tmp.sm_idname].sm_options = tmp.sm_options;
            ops[tmp.sm_idname].sm_translation_context = tmp.sm_translation_context;
            //console.log("fun Operator found");
        }

        if(tmp instanceof Menu){
            //ops[tmp.sm_idname] = tmp;
            ops[tmp.sm_idname] = function(args){
                if(args == null){
                    tmp.execute(context);
                }
                //this.obj = tmp;
                return tmp;
                //return this.obj;
            }
            ops[tmp.sm_idname].sm_label = tmp.sm_label;
            ops[tmp.sm_idname].sm_context = tmp.sm_context;
            ops[tmp.sm_idname].sm_options = tmp.sm_options;
            ops[tmp.sm_idname].children = tmp.children;
            ops[tmp.sm_idname].sm_translation_context = tmp.sm_translation_context;
            //console.log("fun Operator found");
        }

    }

    if (typeof(obj) == 'object'){
        if(obj instanceof Operator){
            ops[obj.sm_idname] = obj;
            //console.log("obj Operator class")
        }
    }
    
    //if(obj instanceof Menu){
        //console.log("found Menu class")
    //}
}

utils.register_class = register_class;

function unregister_class(obj){
    console.log(typeof(obj))
}

utils.unregister_class = unregister_class;

export default {
    data,
    types,
    props,
    ops,
    wins,
    context,
    utils,
    gun,
}

//var test = new object_ot_splitarea();
//test.execute({});
/*
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
*/

/*
function handle_remove(event){
    window.removeEventListener('mousedown', handle_pressdown);
}
function handle_pressdown(event){
    if(event.button == 0){//left
        console.log("0");
    }
    if(event.button == 1){//middle
        console.log("1");
    }
    if(event.button == 2){//right
        console.log("2");
        //console.log(this);
        //this.window.removeEventListener('mousedown', this.handle_press,true);
        //this.window.removeEventListener('mousedown', this.handle_press.bind(this),true);
        //this.remove_handle();
        handle_remove(event)
        //window.removeEventListener('mousedown',(e)=>{self.handle_press(self,e)});
    }
}
window.addEventListener('mousedown', handle_pressdown);
*/