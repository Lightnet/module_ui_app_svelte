import { Operator } from './operator';

export default class object_ot_helpmanual extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_helpmanual";
        this.sm_label = "Manual";
        this.sm_context = "HELP_MENU";
    }

    execute() {
        console.log("Help Manual")
    }

}
