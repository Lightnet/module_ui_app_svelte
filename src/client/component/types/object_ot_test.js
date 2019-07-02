/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_test extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_test";
        this.sm_label = "test";
        this.sm_context = "FILE_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("test")
    }

}
