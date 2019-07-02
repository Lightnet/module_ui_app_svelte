import { Operator } from './operator';

export default class object_ot_calltest extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_calltest";
        this.sm_label = "call test";
        this.sm_context = "";
        console.log("call testing...");
    }

    execute(context) {
        super.execute(context);
        console.log("call test")
    }

}
