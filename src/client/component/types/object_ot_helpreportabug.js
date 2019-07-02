import { Operator } from './operator';

export default class object_ot_helpreportabug extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_helpreportabug";
        this.sm_label = "Report a Bug";
        this.sm_context = "HELP_MENU";
    }

    execute() {
        console.log("Report a Bug")
    }

}
