<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import { LogicNodeID } from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let idlogicnode;

    const LogicNodeIDunsubscribe = LogicNodeID.subscribe(value => {
		//console.log(value);
		idlogicnode = value;
    });
    
    let timerid;

    //onMount(async () => {	
    //});
    
    onMount(() => {
        //console.log("mount");
    });

    //afterUpdate(() => {
        //console.log("afterUpdate")
    //});

    onDestroy(() => {
        //console.log("onDestroy");
        LogicNodeIDunsubscribe();
    });

    function test(e){
        //idlogicnode
        //https://svelte.dev/docs#Creating_a_component
        //get id for component
        //console.log(idlogicnode);
        let el = document.getElementById(idlogicnode);
        console.log(el);
        console.dir(el);

        //console.log(el);
        //console.dir(el);
        //working...
        //let logicnodeapp = new LogicNodeEditorComponent({target:idlogicnode,hydrate: true});
        //let logicnodeapp = new LogicNodeEditorComponent({idlogicnode,hydrate: true});
        //console.log(logicnodeapp);
        //console.log(logicnodeapp.connectors.length);
        //not working...
        /*
        let logicnodeapp = new LogicNodeEditorComponent({
            //target: document.getElementById(idlogicnode),
            //target: document.body,
            target: document.querySelector(idlogicnode),
            hydrate: true
        });
        */
        //console.log(logicnodeapp);
    }

    function tickevent(){
        //console.log("time tick");
        window.dispatchEvent(new Event("tick"));
    }

    function logicnoderun(){
        //console.log("logicnoderun");
        if(timerid == null){
            timerid = setInterval(tickevent, 1000);
            //console.log(timerid);
        }
    }

    function logicnodepause(){
        console.log("logicnodepause");
    }

    function logicnodestop(){
        //console.log("logicnodestop");
        clearInterval(timerid);
        //console.log(timerid);
        timerid=null;
    }
    
    function logicnodereset(){
        console.log("logicnodereset");
    }
</script>

<style>
    button{
        height:22px;
    }

    input{
        background-color:#595959;
        color:white;
        font-size: 12px;
        height:22px;
    }
</style>
<div>
    <button on:click={test}>Check Editor</button>
    <button on:click={test}>View</button>
    <button on:click={test}>Select</button>
    <button on:click={test}>Add</button>
    <button on:click={test}>Node</button>
    <button on:click={logicnoderun}>Run</button>
    <!--<button on:click={logicnodepause}>Pause</button>-->
    <button on:click={logicnodestop}>Stop</button>
    <button on:click={logicnodereset}>Reset</button>

    <input value={"filename.node"} />
    <button on:click={logicnodereset}>New</button>
    <button on:click={logicnodereset}>Delete</button>

</div>