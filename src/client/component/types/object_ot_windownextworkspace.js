/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_windownextworkspace extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_windownextworkspace";
        this.sm_label = "Next Workspace";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("Next Workspace")
    }

}
