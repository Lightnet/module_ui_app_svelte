<script>
    import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import LogicNodeEditorComponent from './logicnodeeditorcomponent.svelte';
    import { LogicNodeID } from '../../mjs.js';

    const dispatch = createEventDispatcher();

    let idlogicnode;

    const LogicNodeIDunsubscribe = LogicNodeID.subscribe(value => {
		//console.log(value);
		idlogicnode = value;
	});

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

</script>

<style>
    button{
        height:22px;
    }
</style>
<div>
    <button on:click={test}>Check Editor</button>
</div>