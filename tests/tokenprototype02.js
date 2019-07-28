/*
    Self contain Sandbox?

    User function encrypt / decrypt key node value prototype.
*/
(function() {
var Gun = (typeof window !== "undefined")? window.Gun : require('../gun');

/*
    let user = gun.user();
    let to = gun.user(publickey);
    user.get('profile').get('alias').grantkey(to);
*/
Gun.User.prototype.grantkey=async function(to, cb){
    //
    console.log("`.grantkey` CUSTOM PROTOTYPE API DO NOT USE!");
    var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    (async function(){
        console.log(gun)
        var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
        sec = await SEA.decrypt(sec, pair);
        if(!sec){
            //sec = SEA.random(16).toString();
            sec = Gun.text.random(16);
            enc = await SEA.encrypt(sec, pair);
            user.get('trust').get(pair.pub).get(path).put(enc);
        }
        var pub = await to.get('pub').then();
        var epub = await to.get('epub').then();
        pub = await pub; epub = await epub;
        var dh = await SEA.secret(epub, pair);
        enc = await SEA.encrypt(sec, dh);
        user.get('trust').get(pub).get(path).put(enc, cb);
    }());
    return gun;
}
/*
    let user = gun.user();
    user.get('profile').get('alias').encryptput("name");
*/
Gun.User.prototype.encryptput = function(data, cb){
    //key > put
    console.log("`.encryptput` CUSTOM PROTOTYPE API DO NOT USE!");
    var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    //console.log(gun);
    
    (async function(){
        console.log("path==============",path);
        var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
        console.log("sec1",sec);
        sec = "SEA"+ JSON.stringify(sec);
        console.log("sec2",sec);
        //console.log("pair",pair);
        sec = await SEA.decrypt(sec, pair);
        console.log("MESSAGE:",sec);

        if(!sec){
            console.log("IF HASH NOT GEN, CREATE IT!")
            //sec = SEA.random(16).toString();
            sec = Gun.text.random(16);
            console.log("sec RANDOM",sec);
            enc = await SEA.encrypt(sec, pair);
            console.log("enc",enc);
            user.get('trust').get(pair.pub).get(path).put(enc);
        }
        console.log("sec=====================",sec);
        console.log("data",data)
        enc = await SEA.encrypt(data, sec);
        console.log("enc=============",enc);
        gun.put(enc, cb);
    }());
    return gun;
}
/*
    let user = gun.user();
    user.get('profile').get('alias').decryptvalue(ack=>{
        //console.log(ack);
    });
*/
Gun.User.prototype.decryptvalue = function(cb){
    //get key to return value
    console.log("`.decryptvalue` CUSTOM PROTOTYPE API DO NOT USE!");
    cb = cb || function(ctx) { return ctx };
    var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    (async function(){
        var sec = await user.get('trust').get(pair.pub).get(path).then();
        sec = "SEA"+ JSON.stringify(sec);
        sec = await SEA.decrypt(sec, pair);
        //console.log("sec===========",sec);
        let key = await gun.then();
        let mvalue = await SEA.decrypt(key, sec);
        //console.log(mvalue);
        cb(mvalue);
    }());
    return gun;
}

//testing...
/*
    let user = gun.user();
    //console.log(user);
    let to = gun.user(publickey);
    //console.log(to);
    to.get("profile").get("alias").decryptdata(to);
*/
var decryptdata = Gun.User.prototype.decryptdata = function(to, cb){
    console.log("`.decryptvalue` CUSTOM PROTOTYPE API DO NOT USE!");
    cb = cb || function(ctx) { return ctx };
    var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';

    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    (async function(){
        console.log(path);
        //KEY SALT
        let enc1 = await to.get('trust').get(pair.pub).get(path).then();
        //var enc1 = await user.get('trust').get(publickey).get(path).then(); // nope
        //console.log(enc1);
        enc1 = "SEA"+ JSON.stringify(enc1);
        let epub = await to.get('epub').then();
        //console.log(epub);
        //PAIR SHARE
        let mix = await SEA.secret(epub, pair);
        //console.log(dh);
        //KEY SHARE
        let key = await SEA.decrypt(enc1, mix);
        //console.log(key);

        //VALUE
        let enc2 = await gun.then();
        //console.log(enc);
        enc2 = "SEA"+ JSON.stringify(enc2);
        //console.log(enc);
        //console.log(gun);
        let dvalue = await SEA.decrypt(enc2, key);
        //console.log(dvalue);

        cb(dvalue)

    }());
    return gun;
}
//this deal with gun root function call
Gun.chain.decryptdata = decryptdata;

/*
 * Work in progress trying to get user key > value 
*/
Gun.User.prototype.decryptget = function(value, cb){
    // user profile > key > value 
    console.log("`.decryptget` CUSTOM PROTOTYPE API DO NOT USE!");
    //var gun = this, user = gun.back(-1).user(), find = gun.user(), pair = user._.sea, path = '';
    var gun = this, user = gun.user(), find = gun.user(), pair = user._.sea, path = '';
    //console.log(gun);
    //find.get('profile').on(function(data, key, at, ev){//get map data
    //gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    //find.on(function(data, key, at, ev){//get map data
    find.get('profile').on(function(data, key, at, ev){//get map data
        //console.log(data);
        //console.log(key);
        ev.off(); //pervent loops listen add on?
        Gun.node.is(data, async function(v, k){
            console.log(k);
            if(k == value){
                console.log("v:",v);
                console.log("k:",k);


                /*
                //console.log("found!")
                //console.log("PATH");
                console.log(path);
                let key = await user.get('trust').get(pair.pub).get(path).then();
                key = "SEA"+ JSON.stringify(key);
                //let Mainkey = await user.get('trust').get(pair.pub).get(path).then();
                //Mainkey = "SEA"+ JSON.stringify(Mainkey);
                //console.log("Mainkey",Mainkey);
                //aliasprofile~uPrVZC0gZ_ZFO6sVtHlXQLpRv4dIr5XXQdqmB16lvH8.yMHCDgghJ6TyejUic-u-mIBUo36cQaPWW059HFfrIW4

                //let keyvalue = await gun.get(path).then();
                //console.log("keyvalue",keyvalue );
                //console.log("key",key);
                let mix;
                mix = await Gun.SEA.secret(await find.get('epub').then(), user._.sea);
                //console.log("mix",mix);
                //key = `SEA{"ct":"5MSFdp1uPXH2Ei9VNstlnhQ=","iv":"B/FeCDtBxvTafOXIywGL","s":"GblhS4yR7dJW"}`;
                console.log("key",key);
                //mix = "pUlgutjtm1ErkGEe";
                key = await Gun.SEA.decrypt(key, mix);
                console.log(key)
                let val;
                //val = await Gun.SEA.decrypt(v, key);
                //console.log("key",key)
                let finalv = val || v
                console.log("done???",finalv);
                //cb(val || v);
                */
            }
        });
    });

};

// Just a testing  key and data
Gun.User.prototype.secretgetkey = function(data, cb){
    //to getkey and value check without update data
    console.log("`.secretgetkey` CUSTOM PROTOTYPE API DO NOT USE!");
    var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    console.log(path);
    (async function(){
        //console.log("path",path);
        var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
        //console.log("sec1",sec);
        sec = "SEA"+ JSON.stringify(sec);
        //console.log("sec2",sec);
        //console.log("pair",pair);
        sec = await SEA.decrypt(sec, pair);
        //console.log("KEY :",sec);
        //if(!sec){
            //console.log("IF HASH NOT GEN, CREATE IT!")
            //sec = SEA.random(16).toString();
            //sec = Gun.text.random(16);
            //console.log("sec RANDOM",sec);
            //enc = await SEA.encrypt(sec, pair);
            //console.log("enc",enc);
            //user.get('trust').get(pair.pub).get(path).put(enc);
        //}
        console.log("sec===========",sec);
        //console.log("data",data)
        //enc = await SEA.encrypt(data, sec);
        //console.log("enc",enc);
        //gun.put(enc, cb);
        let value = await gun.then();
        console.log(value);
        
        gun.once(async (ack)=>{
            console.log(ack);

            let mvalue = await SEA.decrypt(ack, sec);
            console.log(mvalue);
        });
    }());
    return gun;
}

}());


(async function() {
    //let salt = SEA.random(16).toString();
    //console.log("SEA.random:", salt);
    //salt = Gun.text.random(16);
    //console.log("Gun.text.random:", salt);
    
    //main key
    /*
    var alice = await SEA.pair();
    var sec = Gun.text.random(16);
    console.log(sec);
    var enc1 = await SEA.encrypt(sec, alice);
    
    //share key
    var bob = await SEA.pair();
    var dh = await SEA.secret(bob.epub, alice);
    var enc3 = await SEA.encrypt(sec, dh);//////////////
    
    console.log("enc1",enc1);
    var emsg = await SEA.encrypt("data test", sec);
    /// Main Alice KEY
    var secret = await SEA.decrypt(enc1, alice);
    //messsage main
    var dmsg = await SEA.decrypt(emsg, secret);
    console.log(dmsg);
    
    //BOB KEY SHARE WITH ALICE
    //message share
    var mix = await SEA.secret(alice.epub, bob);
    //console.log(mix);
    var key = await SEA.decrypt(enc3, mix);
    //console.log(key);
    
    var dmsg1 = await SEA.decrypt(emsg, key);
    console.log(dmsg1);
    */
    //console.log("enc1",enc1);

    //var dmsg1 = await SEA.decrypt(emsg, dh);
    //console.log(dmsg1);

    /*
    var alice = await SEA.pair();
    var bob = await SEA.pair();
    var enc = await SEA.encrypt('shared data', await SEA.secret(bob.epub, alice));
    var msg = await SEA.decrypt(enc, await SEA.secret(alice.epub, bob));
    console.log(msg);
    */

    //test
    /*
    var pair = await SEA.pair();
    console.log(pair);
    var enc = await SEA.encrypt('hello self', pair);
    console.log(enc);
    var data = await SEA.sign(enc, pair);
    console.log(data);

    var msg = await SEA.verify(data, pair.pub);
    console.log("msg",msg);
    var dec = await SEA.decrypt(msg, pair);
    console.log("dec",dec);
    var proof = await SEA.work(dec, pair);
    console.log("proof",dec);
    var check = await SEA.work('hello self', pair);
    console.log("check",dec);
    */
}());