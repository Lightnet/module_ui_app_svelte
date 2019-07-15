/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

export class Menu{

    constructor(){
        this.sm_description = "";
        //this.sm_idname = "object_mt";
        this.sm_idname = this.constructor.name;
        this.sm_label = "";
        this.sm_context = "";//not part of this just testing...
        this.sm_options = [];
        this.sm_translation_context = "Menu";
        this.children = [];
    }

    __init__(){

    }

    __del__(){

    }

    poll(context){
        return null;
    }

    execute(context) {
        console.log("test")
        return ['FINISHED'];
    }

    draw(context){
        return ['FINISHED'];
    }

    modal(context, event){
        return ['FINISHED'];
    }

    invoke(context,event){
        return ['RUNNING_MODAL']
    }

    cancel(context){
        return ['FINISHED'];
    }

}