import { Operator } from './operator';

export default class object_ot_access extends Operator{
    
    constructor(){
        super();
        this.sm_idname = "object_ot_access";
        this.sm_label = "access";
        this.sm_context = "ACCESS_MENU";
    }

    execute(context) {
        super.execute(context);
        console.log("access ")
    }

}
