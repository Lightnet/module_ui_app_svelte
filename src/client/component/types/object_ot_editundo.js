/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_editundo extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_editundo";
        this.sm_label = "Undo";
        this.sm_context = "EDIT_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("edit Undo")
    }

}
