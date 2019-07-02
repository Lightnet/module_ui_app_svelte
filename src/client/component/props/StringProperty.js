/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

export class StringProperty{
    constructor(args={name:"",default:""}){
        this.name = args.name === 'string' ? "" : args.name ;
        this.default = args.default === 'string' ? "" : args.default ;
        //console.log(this.name);
        //console.log(this.value);
    }
}