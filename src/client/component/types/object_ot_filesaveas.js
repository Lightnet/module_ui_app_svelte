import { Operator } from './operator';

export default class object_ot_filesaveas extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_filesaveas";
        this.sm_label = "Save As";
        this.sm_context = "FILE_MENU";
    }

    execute() {
        console.log("file save as")
    }

}
