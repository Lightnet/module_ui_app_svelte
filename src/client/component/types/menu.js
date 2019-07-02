/*
* Work in progres testing.
*/


export class Menu{

    constructor(){
        this.sm_description = "";
        this.sm_idname = "object_mt";
        this.sm_label = "";
        this.sm_context = "";//not part of this just testing...
        this.sm_options = [];
        this.sm_translation_context = "Operator";
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

    }

    modal(context, event){

    }

    invoke(context,event){
        return ['RUNNING_MODAL']
    }

    cancel(context){

    }

}