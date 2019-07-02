import { writable } from 'svelte/store';
//https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
//https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
//https://stackoverflow.com/questions/47383375/how-can-i-export-static-function-in-es6

//===============================================
// setup props
//===============================================

import {StringProperty} from './component/props/StringProperty'

//===============================================
// setup
//===============================================
import {Operator} from './component/types/operator'
import {Menu} from './component/types/menu'

// test ops
import object_ot_test from './component/types/object_ot_test'
import object_ot_calltest from './component/types/object_ot_calltest'
import object_mt_test from './component/types/object_mt_test'
//file menu header
import object_ot_filenew from './component/types/object_ot_filenew'
import object_ot_filesave from './component/types/object_ot_filesave'
import object_ot_filesaveas from './component/types/object_ot_filesaveas'
import object_ot_fileopen from './component/types/object_ot_fileopen'
//edit menu header
import object_ot_editundo from './component/types/object_ot_editundo'
import object_ot_editredo from './component/types/object_ot_editredo'
import object_ot_editoperatorsearch from './component/types/object_ot_editoperatorsearch'
import object_ot_editpreferences from './component/types/object_ot_editpreferences'
//window menu header
import object_ot_newwindow from './component/types/object_ot_newwindow'
import object_ot_newmainwindow from './component/types/object_ot_newmainwindow'
import object_ot_togglewindowfullscreen from './component/types/object_ot_togglewindowfullscreen'
import object_ot_windownextworkspace from './component/types/object_ot_windownextworkspace'
import object_ot_windowpreviousworkspace from './component/types/object_ot_windowpreviousworkspace'
import object_ot_windowshowstatusbar from './component/types/object_ot_windowshowstatusbar'
import object_ot_togglesystemconsole from './component/types/object_ot_togglesystemconsole'
//access menu header
import object_ot_accesslogin from './component/types/object_ot_accesslogin'
import object_ot_accessadmin from './component/types/object_ot_accessadmin'
//help menu header
import object_ot_helpabout from './component/types/object_ot_helpabout'
import object_ot_helpmanual from './component/types/object_ot_helpmanual'
import object_ot_helpreportabug from './component/types/object_ot_helpreportabug'

//===============================================
// access view area
//===============================================
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
export const data = {};
export const actions = {};
export const animations = {};
export const ops = {};
export const wins = {};
export const screens = {};
export const types = {};
export const props = {};

props.StringProperty = StringProperty

//ops.object_ot_test = new object_ot_test();
//var menutest = new object_mt_test();

//register_class(ops.object_ot_test);
//register_class(menutest);

register_class(object_ot_filenew);
register_class(object_ot_filesave);
register_class(object_ot_filesaveas);
register_class(object_ot_fileopen);
register_class(object_ot_test);
//register_class(Operator);
register_class(object_ot_calltest);

register_class(object_ot_editundo);
register_class(object_ot_editredo);
register_class(object_ot_editoperatorsearch);
register_class(object_ot_editpreferences);

register_class(object_ot_newwindow);
register_class(object_ot_newmainwindow);
register_class(object_ot_togglewindowfullscreen);
register_class(object_ot_windownextworkspace);
register_class(object_ot_windowpreviousworkspace);
register_class(object_ot_windowshowstatusbar);
register_class(object_ot_editpreferences);
register_class(object_ot_togglesystemconsole);

register_class(object_ot_accesslogin);
register_class(object_ot_accessadmin);

register_class(object_ot_helpabout);
register_class(object_ot_helpmanual);
register_class(object_ot_helpreportabug);


//register_class(new object_ot_test());

export const utils = {}
// https://docs.blender.org/api/blender2.8/bpy.types.Operator.html
// https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
// need to check function or class
function register_class(obj){
    //console.log(typeof(obj))
    //console.log(obj)
    if (typeof(obj) == 'function'){
        var tmp = new obj();
        //console.log(tmp)
        //console.log(tmp.name)
        if(tmp instanceof Operator){
            ops[tmp.sm_idname] = tmp;
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
    },
    utils,
}