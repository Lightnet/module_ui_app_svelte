import { Operator } from './operator';

export default class object_ot_test extends Operator{
    constructor(){
        super();
        this.SLabel = "test";
        this.SContext = "FILE_MENU";
    }

    execute() {
        console.log("test")
    }

}
