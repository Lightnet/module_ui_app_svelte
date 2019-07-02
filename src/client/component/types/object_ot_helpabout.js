/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_helpabout extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_helpabout";
        this.sm_label = "About";
        this.sm_context = "HELP_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("Help About")
    }

}
