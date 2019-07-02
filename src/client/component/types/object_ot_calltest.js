/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

export default class object_ot_calltest extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_calltest";
        this.sm_label = "Call Test";
        this.sm_context = "";
        //console.log("call testing...");
    }

    execute(context) {
        super.execute(context);
        console.log(context);


        console.log("call test...")

        return ['FINISHED'];
    }
}
