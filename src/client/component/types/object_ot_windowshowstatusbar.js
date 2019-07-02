import { Operator } from './operator';

export default class object_ot_windowshowstatusbar extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_windowshowstatusbar";
        this.sm_label = "Show Status Bar";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("Show Status Bar")
    }

}
