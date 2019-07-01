<script>
//https://svelte.dev/docs#setContext
    import { createEventDispatcher } from 'svelte';
    import { UserName, SessionHash, Sl_blogin } from '../../stores.js';

    const dispatch = createEventDispatcher();

    let input_username = "ts";
    let input_password = "ts";

    async function getLoginAsync(data) {
        //let response = await fetch(`http://localhost:8080/ue4/login?username=${input_username}`);
        //let data = await response.json()
        //return data;

        let rawResponse = await fetch('http://localhost:8080/ue4/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        let content = await rawResponse.json();
        //console.log(content);
        //console.log(data);
        if(content.message == 'passwordpass'){
            UserName.set(data.username);
            SessionHash.set(content.sessionhash);

            Sl_blogin.set(true);
            //input_password = ""; //clear password
        }
        dispatch('message', content);
    }

    async function getRegisterAsync(data) {
        
        let rawResponse = await fetch('http://localhost:8080/ue4/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        let content = await rawResponse.json();
        //console.log(content);
        if(content !=null){
            if(content.message == "exist"){
                dispatch('message', {msg:"userexist"});
            }
            if(content.message == "created"){
                dispatch('message', {msg:"usercreated"});
            }
        }
        //dispatch('message', {text: 'login'});
    }

    function action_login(){
        //dispatch('message', {text: 'login'});
        if (input_username === "" || input_password === ""){
            //console.log("none string");
            return;
        }

        getLoginAsync({
            username:input_username,
            password:input_password
        });
    }

    function action_cancel(){
        //console.log("cancel");
    }

    function action_register(){
        //dispatch('message', {text: 'login'});
        if (input_username === "" || input_password === ""){
            //console.log("none string");
            return;
        }

        getRegisterAsync({
            username:input_username,
            password:input_password
        });
        //console.log("register");
    }

</script>
<style>
</style>

<section>
    <div>
        <label>Login Access</label>
    </div>

    <div>
        <label> User Name :</label>
        <input bind:value={input_username} />
    </div>

    <div>
        <label> Password :</label>
        <input bind:value={input_password} />
    </div>

    <div>
        <button on:click={action_login}>Login</button>
        <button on:click={action_cancel}>Cancel</button>
        <button on:click={action_register}>Register</button>
    </div>
</section>