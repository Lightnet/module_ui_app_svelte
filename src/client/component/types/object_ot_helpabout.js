import { Operator } from './operator';

export default class object_ot_helpabout extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_helpabout";
        this.sm_label = "About";
        this.sm_context = "HELP_MENU";
    }

    execute() {
        console.log("Help About")
    }

}
