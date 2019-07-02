import { Operator } from './operator';

export default class object_ot_accessadmin extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_accessadmin";
        this.sm_label = "Admin";
        this.sm_context = "ACCESS_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("access admin")
    }

}
