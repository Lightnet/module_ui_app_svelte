/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

//import { Operator } from './operator';
import { Menu } from './menu';
import mjs from '../../mjs.js';

export default class object_mt_fileexport extends Menu{
    constructor(){
        super();
        this.sm_idname = "object_mt_fileexport";
        this.sm_label = "Export";
        this.sm_context = "FILE_MENU";
        this.children = [];

        //this.children.push();
        for(var obj in mjs.ops){
            if(mjs.ops[obj].sm_context == "EXPORT_MENU"){
                this.children.push(mjs.ops[obj]);
                console.log("found export!");
            }
        }
    }

    execute(context) {
        super.execute(context);
        console.log("file import")
    }

}
