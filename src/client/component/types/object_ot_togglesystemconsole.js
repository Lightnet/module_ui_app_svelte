import { Operator } from './operator';

export default class object_ot_togglesystemconsole extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_togglesystemconsole";
        this.sm_label = "Toggle System Console";
        this.sm_context = "WINDOW_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("window ")
    }

}
