import { Operator } from './operator';

export default class object_ot_editundo extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_editundo";
        this.sm_label = "Undo";
        this.sm_context = "EDIT_MENU";
    }

    execute() {
        console.log("edit Undo")
    }

}
