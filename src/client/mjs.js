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
//===============================================
// Theme Top Bar
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
//===============================================
// Theme Status Bar
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
//===============================================
// Theme Properties Editor
export const PropertiesConfig = new writable({
    menubtn:{
        d:"#232323",
        h:"#5177b2"
    },
    tabbtn:{
        d:"#232323",
        h:"#5177b2",
        a:"#5177b2"
    },
    tabbg:{
        c:"#232323"
    },
    panel:{
        d:"#232323",
        h:"#5177b2",
        a:"#5177b2",
        c:"#232323"
    },
    bg:{
        c:"#232323"
    }
});
useLocalStorage(PropertiesConfig, appid + themeid + "Properties");

//===============================================
// Theme Properties Editor
export const LogicNodeThemeConfig = new writable({
    menubtn:{
        d:"#232323",
        h:"#5177b2"
    },
    tabbtn:{
        d:"#232323",
        h:"#5177b2",
        a:"#5177b2"
    },
    tabbg:{
        c:"#232323"
    },
    panel:{
        d:"#232323",
        h:"#5177b2",
        a:"#5177b2",
        c:"#232323"
    },
    bg:{
        c:"#232323"
    },
    node:{
        headercolor:"#000000",
        panelcolor:"#383838",
        fontcolor:"#ffffff",
        fontsize:12,
        fontfamily:"Courier New",

        strokecolor:"#008000",
        strokecolorh:"#008000",
        strokecolora:"#008000",
        strokewidth:2,
        strokecolors:"#008000",
        strokecolorhs:"#008000",
        strokecoloras:"#008000",
        strokewidths:2,
        pin:{
            d:"#ff8000",
            h:"#ffb693",
            a:"#ffb693",
        },
        pinsize:20
    }
});
useLocalStorage(LogicNodeThemeConfig, appid + themeid + "LogicNode");

//===============================================
// Preferences Themes tab
export const PrefsThemesConfig = new writable({
    isuserinferface:true,
    istextstyle:true,
    isbonecolorsets:true,
    is3dview:true,
    isgraphiceditor:true,
    isdopesheet:true,
    isnonlinearanimation:true,
    isuvimageeditor:true,
    isvideosquenceseditor:true,
    istexteditor:true,
    islogicnodeeditor:false,
    isnodeeditor:true,
    isproperties:false,
    isontliner:true,
    ispreferences:true,
    isinfo:true,
    isfilebrowser:true,
    isjavascriptconsole:true,
    ismovieclipeditor:true,
    istopbar:true,
    isstatusbar:true,
});

useLocalStorage(PrefsThemesConfig, appid + themeid + "PrefsThemes");


export const LogicNodeID = writable('');

//===============================================
// Gun /SEA
export var gun = {};
export function setGun(value){
    //console.log("set?");
    gun = value;
}
export function getGun(){
    return gun;
}

export const onUserName = writable("Guest");
export const onPub = writable("");
var userData = {};

export var sea = {
    epriv:"",
    eqpub:"",
    priv:"",
    pub:"",
}
export const onLogin = writable(false);

export function setSea(data){
    sea = data;
    onPub.set(data.pub);
}

export function pair(){
    return sea;
}

export function getPub(){
    return sea.pub;
}

export function setUser(data){
    //username = user.alias;
    //console.log(data);
    //console.log(onUserName);
    onUserName.set(data.alias);
    userData = user;
}

export function onLogout(){
    onUserName.set("Guest");
    userData = {};
    sea={
        epriv:"",
        eqpub:"",
        priv:"",
        pub:"",
    }
    onPub.set("");
    onLogin.set(false);
}

//===============================================
// access view area
//===============================================
//export const Main = writable({});
export var Main;

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
    Main,
    data,
    types,
    props,
    ops,
    wins,
    context,
    utils,
    gun,
    setGun,
    getGun,
    setSea,
    pair,
    onUserName,
    onPub,
    setUser,
    onLogout,
}

//module.exports.gun = gun;

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