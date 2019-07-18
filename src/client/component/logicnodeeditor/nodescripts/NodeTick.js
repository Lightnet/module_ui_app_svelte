/*
 Testing...
 */

import { Node } from "./NodeScript.js";
export class NodeTick extends Node{
    constructor(args){
        super(args);
        this.addpinout();
        this.getpincounts();
    }

    execute(args){
        super.execute(args);

    }
}