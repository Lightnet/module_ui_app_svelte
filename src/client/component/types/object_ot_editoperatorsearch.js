/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_editoperatorsearch extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_editoperatorsearch";
        this.sm_label = "Operator Search";
        this.sm_context = "EDIT_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("edit Operator Search")
    }

}
