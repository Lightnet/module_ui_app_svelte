/*
    Self contain Sandbox?
*/
(function() {
var Gun = (typeof window !== "undefined")? window.Gun : require('../gun');
/*
Gun.chain.token=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;

    return gun;
}
*/
//console.log(SEA)
//console.log(Gun)
//console.dir(Gun)
//console.dir(Gun.User)
/*
Gun.User.prototype.trustalias=async function(user){
    // TODO: BUG!!! SEA `node` read listener needs to be async, 
    //console.log(".trustAlias DO NOT USE!");
    if (Gun.is(user)) {
        user.get('pub').get((ctx, ev) => {
            console.log(ctx, ev)
        })
    }
}
*/
Gun.User.prototype.grantkey=async function(to, cb){
    //console.log("`.grantAlias` API CUSTOM DO NOT USE!");
    console.log("`.grantAlias` PROTOTYPE API DO NOT USE!");
    var gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    console.log(path);
    (async function(){
        var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
        sec = await SEA.decrypt(sec, pair);
        if(!sec){
            //sec = SEA.random(16).toString();
            sec = Gun.text.random(16);
            enc = await SEA.encrypt(sec, pair);
            user.get('trust').get(pair.pub).get(path).put(enc);
        }
        var pub = to.get('pub').then();
        var epub = to.get('epub').then();
        pub = await pub; epub = await epub;
        var dh = await SEA.secret(epub, pair);
        enc = await SEA.encrypt(sec, dh);
        user.get('trust').get(pub).get(path).put(enc, cb);
    }());
    return gun;
}

Gun.User.prototype.encryptput = function(data, cb){
    //console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
    console.log("`.secretPut` PROTOTYPE API DO NOT USE!");
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

Gun.User.prototype.secretgetkey = function(data, cb){
    //console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
    console.log("`.secretPut` PROTOTYPE API DO NOT USE!");
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

Gun.User.prototype.decryptvalue = function(data, cb){
    //console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
    console.log("`.secretPut` PROTOTYPE API DO NOT USE!");
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

Gun.User.prototype.decryptget = function(value, cb){
    var gun = this, user = gun.back(-1).user(), find = gun.user(), pair = user._.sea, path = '';
    //console.log(gun);
    //find.get('profile').on(function(data, key, at, ev){//get map data
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    find.on(function(data, key, at, ev){//get map data
        //console.log(data);
        //console.log(key);
        ev.off(); //pervent loops listen add on?
        Gun.node.is(data, async function(v, k){
            console.log(k);
            if(k == value){
                //console.log("v:",v);
                //console.log("k:",k);
                //console.log("found!")
                //console.log("PATH");
                console.log(path);
                let key = await user.get('trust').get(pair.pub).get(path).then();
                key = "SEA"+ JSON.stringify(key);
                let Mainkey = await user.get('trust').get(pair.pub).get(path).then();
                Mainkey = "SEA"+ JSON.stringify(Mainkey);


                //let keyvalue = await gun.get(path).then();
                //console.log("keyvalue",keyvalue );
                //console.log("key",key);
                //console.log("key",key);
                let mix = await Gun.SEA.secret(await find.get('epub').then(), user._.sea);
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
            }
        });
    });

};



/*
Gun.User.prototype.genAppT=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;
    return gun;
}
Gun.User.prototype.genKey=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;

    return gun;
}
*/
/*
Gun.User.prototype.genKey02=function(cb, opt){
    console.log("custom test");
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;
    return gun;
}
*/

}());


(async function() {
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