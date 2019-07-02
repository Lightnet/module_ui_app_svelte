/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_newwindow extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_newwindow";
        this.sm_label = "New Window";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("new window")
    }

}
