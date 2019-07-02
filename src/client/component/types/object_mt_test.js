/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Menu } from './menu';

export default class object_mt_test extends Menu{
    constructor(){
        super();
        this.sm_idname = "object_mt_test";
        this.sm_label = "test";
        this.sm_context = "FILE_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("test")
    }

}
