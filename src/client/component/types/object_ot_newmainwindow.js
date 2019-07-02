import { Operator } from './operator';

export default class object_ot_newmainwindow extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_newmainwindow";
        this.sm_label = "New Main Window";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("new window")
    }

}
