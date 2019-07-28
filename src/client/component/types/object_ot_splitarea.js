/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */

import { Operator } from './operator';

import Pointer from '../base/drawsplit.svelte';
import Splitter from '../base/SplitterComponent.svelte';
import ScreenRegionComponent from '../base/ScreenRegionComponent.svelte';
import { context } from '../../mjs.js';


export default class object_ot_splitarea extends Operator{
    constructor(){
        super();
        this.sm_idname = "object_ot_splitarea";
        this.sm_label = "Split Area";
        this.sm_context = "SPLITTER";
        this.splitalign = 'h';

        this.pointer = new Pointer({
            target: document.body
        })
        
        this.pressdown = (e)=>this.handle_press(e);
        this.handlemove = (e)=>this.handle_movesplit(e);
    }

    handle_movesplit(event){
        //console.log(event);
        //this.pointer.setposition(event.clientX,event.clientY);
        this.pointer.update(this.splitalign, event);
    }

    handle_press(event){
        //console.log(event.button);
        if(event.button == 0){//left
            console.log("0");

            if(this.splitalign == 'v'){
                //console.log(this.pointer);
                let screenregion = context.screenregion;
                let px = event.pageX - screenregion.offsetWidth;
                if(px < 0){
                    //px = screenregion.offsetTop + screenregion.offsetParent.offsetTop;
                    //px = event.pageX - screenregion.offsetWidth;
                    px = event.pageX;
                }
                //console.log(px);
                //let screenregion = context.screenregion;
                //console.log(screenregion);
                //console.dir(screenregion);
                //let idran = generateId(20);
                //console.log(idran);
                //console.log(screenregion.parentNode);
                let newscreenregion = new ScreenRegionComponent({
                    target:screenregion.parentNode,
                    props: {
                        //assignid: idran
                        //bhorizontal:true,
                        //bresize:false
                    }
                })
                //console.log(newscreenregion);
                //console.dir(newscreenregion);
                let idran = newscreenregion.getID();
                console.log(idran);
                let split = new Splitter({
                    target:screenregion.parentNode,
                    props: {
                        bhorizontal:true,
                        bresize:true,
                        px:px,
                        iddiv1:screenregion.id,
                        iddiv2:idran
                    }
                });
            }

            if(this.splitalign == 'h'){


                /*
                let splith = new Splitter({
                    target:screenregion.parentNode,
                    props: {
                        bhorizontal:false,
                        bresize:true,
                        px:px,
                        iddiv1:screenregion.id,
                        iddiv2:idran
                    }
                });
                */




            }
            
            this.remove_handle();
        }
        if(event.button == 1){//middle
            console.log("1");
        }
        if(event.button == 2){//right
            console.log("2");
            //console.log(this);
            //this.window.removeEventListener('mousedown', this.handle_press,true);
            //this.window.removeEventListener('mousedown', this.handle_press.bind(this),true);
            this.remove_handle();
            //window.removeEventListener('mousedown',(e)=>{self.handle_press(self,e)});
        }
    }

    remove_handle(){
        //console.log(this);
        window.removeEventListener('mousemove',this.handlemove);
        window.removeEventListener('mousedown', this.pressdown);
        //https://svelte.dev/docs#$destroy
        this.pointer.display(false);
        //component.$destroy()
    }

    execute(context) {
        super.execute(context);
        console.log("Split Area");
        let splitregion = context.splitregion;
        //console.log(splitregion);
        console.log(splitregion.clientHeight);
        console.log(splitregion.clientWidth);
        
        if( splitregion.clientHeight < 20){
            console.log("v");
            this.splitalign = 'v';
        }
        if ( splitregion.clientWidth < 20){
            this.splitalign = 'h';
            console.log("h");
        }

        this.pointer.display(true);
        
        window.addEventListener('mousemove',this.handlemove);
        window.addEventListener('mousedown', this.pressdown);
    }

}
