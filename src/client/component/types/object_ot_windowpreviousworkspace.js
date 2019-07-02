import { Operator } from './operator';

export default class object_ot_windowpreviousworkspace extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_windowpreviousworkspace";
        this.sm_label = "Previous Workspace";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("Previous Workspace")
    }

}
