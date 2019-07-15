/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

//import { Operator } from './operator';
import { Menu } from './menu';

export default class object_ot_fileimport extends Menu{
    constructor(){
        super();
        this.sm_idname = "object_ot_fileimport";
        this.sm_label = "Import";
        this.sm_context = "FILE_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("file import")
    }

}
