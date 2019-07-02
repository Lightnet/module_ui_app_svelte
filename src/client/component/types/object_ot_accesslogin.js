import { Operator } from './operator';

export default class object_ot_accesslogin extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_accesslogin";
        this.sm_label = "Login";
        this.sm_context = "ACCESS_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("access login")
    }

}
