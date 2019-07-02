/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Work in progres testing.
 */

export class Operator{

    constructor(){
        this.sm_description = "";
        this.sm_idname = this.constructor.name;
        this.sm_label = "";
        this.sm_context = "";//not part of this just testing...
        this.sm_options = [];
        this.sm_translation_context = "Operator";
        //console.log(this.constructor.name)
        return this;
    }

    __init__(){

    }

    __del__(){

    }

    poll(context){
        return context;
    }

    execute(context) {
        //console.log("test")
        return ['FINISHED'];
    }

    draw(context){
        return ['FINISHED'];
    }

    modal(context, event){
        return ['RUNNING_MODAL'];
    }

    invoke(context,event){
        return ['FINISHED']
    }

    cancel(context){
        return ['CANCELED']
    }

}