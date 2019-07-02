import { Operator } from './operator';

export default class object_ot_fileopen extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_fileopen";
        this.sm_label = "Open";
        this.sm_context = "FILE_MENU";
    }

    execute() {
        console.log("file open")
    }

}
