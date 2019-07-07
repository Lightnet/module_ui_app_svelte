/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_headershowmenus extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_headershowmenus";
        this.sm_label = "Show Menus";
        this.sm_context = "HEADER";
    }

    execute(context) {
        super.execute(context);
        console.log("show menus")
    }

}
