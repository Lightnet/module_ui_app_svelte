/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_exportobj extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_exportobj";
        this.sm_label = "Export obj.";
        this.sm_context = "EXPORT_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("export")
    }

}
