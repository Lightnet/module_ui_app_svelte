/*
 Testing...
 */

export class Node{
    constructor(args){
        if(args==null){
            args={};
        }
        this.id = "";
        this.pinins = [];
        this.pinouts = [];
        this.name = args.name || "Node";
    }

    addpinin(args){
        if(args==null){
            args={};
        }
        let pin = {
            id:"",
            type: args.type || "flow",
            name: args.name || "flow",
            default: null,
            connectors:[],
        }
        this.pinins.push(pin);
    }

    addpinout(args){
        if(args==null){
            args={};
        }
        let pin = {
            id:"",
            type: args.type || "flow",
            name: args.name || "flow",
            default: null,
            connectors:[],
        }
        this.pinouts.push(pin);
    }

    getpincounts(){
        //console.log("pinins:"+this.pinins.length);
        //console.log("pinouts:"+this.pinouts.length);
        console.log("pinins:"+this.pinins.length + " pinouts:"+this.pinouts.length);
    }

    execute(args){
        if(args==null){
            args={};
        }
    }
}
