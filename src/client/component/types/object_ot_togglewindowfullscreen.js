import { Operator } from './operator';

export default class object_ot_togglewindowfullscreen extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_togglewindowfullscreen";
        this.sm_label = "Toggle Window Fullscreen";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("Toggle Window Fullscreen")
    }

}
