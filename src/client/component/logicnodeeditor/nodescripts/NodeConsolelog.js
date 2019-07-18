/*
 Testing...
 */

import { Node } from "./NodeScript.js";
export class NodeConsolelog extends Node{
    constructor(args){
        super(args);
        addpinin();
        addpinout();
    }

    execute(args){
        super.execute(args);
        console.log("execute log!");
    }
}