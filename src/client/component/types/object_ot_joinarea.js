/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_joinarea extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_joinarea";
        this.sm_label = "Join Area";
        this.sm_context = "splitter";
    }

    execute(context) {
        super.execute(context);
        console.log("Join Area")
    }

}
