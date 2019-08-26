/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */	

localStorage.clear();

//'use strict';
//import '@babel/polyfill';
import App from './App.svelte';
//import App from './Test.svelte';
//import App from './component/oimo/OimoMainComponent.svelte';
//console.log(`running svelte version ${svelte.VERSION}`);

import {utils} from './mjs';
/*
import Gun from 'gun/gun';
import 'gun/lib/then';
import '../common/gunjstrustsharekeyv2';
import 'gun/sea';
*/
//require('gun/sea');

//localStorage.clear();
//window.localStorage.clear(); //try this to clear all local storage

// test ops
import object_ot_test from './component/types/object_ot_test'
import object_ot_calltest from './component/types/object_ot_calltest'
//import object_mt_test from './component/types/object_mt_test'
//file menu header
import object_ot_filenew from './component/types/object_ot_filenew'
import object_ot_filesave from './component/types/object_ot_filesave'
import object_ot_filesaveas from './component/types/object_ot_filesaveas'
import object_ot_fileopen from './component/types/object_ot_fileopen'
import object_mt_fileexport from './component/types/object_mt_fileexport'
import object_mt_fileimport from './component/types/object_mt_fileimport'

import object_ot_exportobj from './component/types/object_ot_exportobj';

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

//area right click menu
import object_ot_joinarea from './component/types/object_ot_joinarea'
//import object_ot_splitarea from './component/types/object_ot_splitarea'
import object_ot_headershowmenus from './component/types/object_ot_headershowmenus'

//ops.object_ot_test = new object_ot_test();
//var menutest = new object_mt_test();

//register_class(ops.object_ot_test);
//register_class(menutest);

let register_class = utils.register_class;
/*
register_class(object_ot_exportobj);

register_class(object_ot_filenew);
register_class(object_ot_filesave);
register_class(object_ot_filesaveas);
register_class(object_ot_fileopen);
register_class(object_mt_fileimport);
register_class(object_mt_fileexport);
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

register_class(object_ot_joinarea);
//register_class(object_ot_splitarea);

register_class(object_ot_headershowmenus);
*/

const app = new App({
	target: document.body,
	props: {
		name: 'MJS'
	}
});

app.$on("workspace",(event)=>{
	//console.log('workspace');
	//console.log(event);
	//console.log("workspace: " + event.detail);
})

export default app;