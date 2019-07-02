import { Operator } from './operator';

export default class object_ot_filesave extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_filesave";
        this.sm_label = "Save";
        this.sm_context = "FILE_MENU";
    }

    execute() {
        console.log("file save")
    }

}
