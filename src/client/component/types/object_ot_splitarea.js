/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_splitarea extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_splitarea";
        this.sm_label = "Split Area";
        this.sm_context = "splitter";
    }

    execute(context) {
        super.execute(context);
        console.log("Split Area")
    }

}
