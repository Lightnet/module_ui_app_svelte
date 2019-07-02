import { Operator } from './operator';

export default class object_ot_editredo extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_editredo";
        this.sm_label = "Redo";
        this.sm_context = "EDIT_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("edit redo")
    }

}
