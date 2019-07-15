/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';
import { get } from 'svelte/store';
import mjs from '../../mjs.js';

export default class object_ot_headershowmenus extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_headershowmenus";
        this.sm_label = "Show Menus";
        this.sm_context = "HEADER";
    }

    execute(context) {
        super.execute(context);
        console.log("show menus");
        let btoogle = !get(mjs.data.CollapseFileMenuMainHeader);
        //console.log(btoogle);
        mjs.data.CollapseFileMenuMainHeader.set(btoogle);
    }

}
