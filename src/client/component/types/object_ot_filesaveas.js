/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_filesaveas extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_filesaveas";
        this.sm_label = "Save As";
        this.sm_context = "FILE_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("file save as")
    }

}
