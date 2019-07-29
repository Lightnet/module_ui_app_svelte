/*
    Self contain Sandbox Gun Module:

    Created by: Lightnet

    Credit: amark ( https://github.com/amark/gun)

    License: MIT
    
    Information: It base on user path with get('trust') map or table.
    Not sure which term name has the right meaning.
    
    To develop salt share key that where to put your/ours keys? Salt keys
    are store in user to trust key with path of the graph to identify the 
    graph key root. Reason that each graph is different with hash id (UUID)
    by it.
    
    user.get(trust).get(publickey).get(pathnode).put('saltkey') 
    
    Reason not to used your own pair that it can be broken but to create 
    salt key with pairs will make it difficult.

    Random key used from:
     - SEA.random(16).toString();
     - Gun.text.random(16);
    
    User:
     - function grantkey (to allow user access to key graph value for other users. Check and create salt keys)
     - function revokekey (to revoke user access to key graph for user. Note it will break salt key if share with other users.)
      - Recreate new slat key and reencrypt value.(This break other salt keys are shared.)
     - function encryptput put value (allow user to encrypt key value when creating and check salt key)
     - function decryptvalue return value (allow user to decrypt key value)
     - function decryptdata (to allow user to decrypt key value/data from gun or sea)
     
    User function encrypt / decrypt key node value prototype.

    Gun:
     - function decryptdata
    
    Gun function decrypt node value prototype.

    Notes:
     - Please note this simple build test. 
     - Not tested large scale.
     - Not yet tested full if there key are not random hash that just keyword.
     - Not work debug fails and checks.
     - Not tested outside of node key graph beside user root node.
     - Grant self share public key break salt key.
     - path work with user root level
     - graph need to figure out how to variable.

*/
(function() {
var Gun = (typeof window !== "undefined")? window.Gun : require('gun/gun');

/*
    work in progress...
*/
Gun.on('opt', function(context) {
    //context.opt.sharekeytype="path";//path working
    context.opt.sharekeytype="graph";//path prototype not working...
    this.to.next(context);
    console.log(context);
});

/*
    //user...grantkey(to);
    let user = gun.user();
    let to = gun.user(publickey);
    user.get('profile').get('alias').grantkey(to);
*/
Gun.User.prototype.grantkey=async function(to, cb, opt){
    // added new user to key to share current graph key
    console.log("`.grantkey` PROTOTYPE API MAY BE CHANGED OR RENAMED USE!");
    cb = cb || function(ctx) { return ctx };
    opt = opt || {};
    let gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });

    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;

    //console.log(path);
    (async function(){
        //console.log(gun);
        let enc, sec;
        if(opt.sharekeytype == "path"){
            sec = await user.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            sec = await gun.get('trust').get(pair.pub).get(gun._.get).then();
        }

        sec = await SEA.decrypt(sec, pair);
        if(!sec){
            sec = SEA.random(16).toString();
            //sec = Gun.text.random(16);
            enc = await SEA.encrypt(sec, pair);
            if(opt.sharekeytype == "path"){
                user.get('trust').get(pair.pub).get(path).put(enc);
            }
            if(opt.sharekeytype == "graph"){
                gun.get('trust').get(pair.pub).get(gun._.get).put(enc);
            }

        }
        let pub = await to.get('pub').then();
        let epub = await to.get('epub').then();
        pub = await pub; epub = await epub;
        let dh = await SEA.secret(epub, pair);
        enc = await SEA.encrypt(sec, dh);
        if(opt.sharekeytype == "path"){
            user.get('trust').get(pub).get(path).put(enc, cb);
        }
        if(opt.sharekeytype == "graph"){
            gun.get('trust').get(pub).get(gun._.get).put(enc, cb);
        }
    }());
    return gun;
}

/*
    //- Recreated new salt key to share.
    //- reencrypt key value on new salt
    //user...revokekey(to);
    let user = gun.user();
    let to = gun.user(publickey);
    user.get('profile').get('alias').revokekey(to);
*/
Gun.User.prototype.revokekey=async function(to, cb, opt){
    // recreated new salt key share current graph key
    console.log("`.revokekey` PROTOTYPE API MAY BE CHANGED OR RENAMED USE!");
    cb = cb || function(ctx) { return ctx };
    opt = opt || {};
    let gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    if(!to){console.log("to User not set!");}

    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;

    (async function(){
        let alias = await to.get("alias").then();
        //console.log(alias);
        if(!alias){
            cb({err:'Error alias not found!'});
            return gun;
        }
        //GET Salt Key
        let enc, sec;
        if(opt.sharekeytype == "path"){
            sec = await user.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            sec = await gun.get('trust').get(pair.pub).get(gun._.get).then();
        }

        //console.log(sec);
        //sec = "SEA"+ JSON.stringify(sec);
        sec = await SEA.decrypt(sec, pair);
        //console.log(sec);
        let key = await gun.once().then();
        //console.log(key);
        //sec = "SEA"+ JSON.stringify(sec);
        let value = await SEA.decrypt(key, sec);
        //console.log(value);
        // Create New Salt Key
        sec = SEA.random(16).toString();
        //sec = Gun.text.random(16);
        enc = await SEA.encrypt(sec, pair);
        if(opt.sharekeytype == "path"){
            user.get('trust').get(pair.pub).get(path).put(enc);
        }
        if(opt.sharekeytype == "graph"){
            gun.get('trust').get(pair.pub).get(gun._.get).put(enc);
        }

        //encrypt Value
        let v = await SEA.encrypt(value, sec);
        gun.put(v, cb);
        // Remove Salt Key
        let pub = await to.get('pub').then();
        if(opt.sharekeytype == "path"){
            user.get('trust').get(pub).get(path).put("null", cb);//remove key
        }
        if(opt.sharekeytype == "graph"){
            gun.get('trust').get(pub).get(gun._.get).put("null", cb);//remove key
        }

    }());
    return gun;
}

/*
    //user...encryptput(value);
    let user = gun.user();
    user.get('profile').get('alias').encryptput("name");
*/
var encryptput = Gun.User.prototype.encryptput = function(data, cb, opt){
    // encrypt key > put value
    console.log("`.encryptput` PROTOTYPE API MAY BE CHANGED OR RENAMED USE!");
    cb = cb || function(ctx) { return ctx };
    opt = opt || {};
    let gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;
    console.log(gun);
    let root = gun.back(-1);

    //let rootgun = gun.back(-1);
    //console.log(path);
    (async function(){
        //console.log("path==============",path);
        console.log(path);
        let enc, sec;
        let KEYID = gun._.get;
        console.log(opt.sharekeytype);


        if(opt.sharekeytype == "path"){
            sec = await user.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            //console.log("checking...");
            //console.log("pair.pub",pair.pub)
            //console.log("gun._.get",gun._.get)
            //sec = await root.get(gun._.soul).get('trust').get(pair.pub).get(gun._.get).then();
            //sec = await gun.get('trust').get(pair.pub).get(KEYID).then();
            sec = await gun.get('trust').get(pair.pub).get(KEYID).then();
            //sec = await gun.get('trust').get(pair.pub).then();
            //console.log(sec);
            //sec = await sec;
            console.log(sec);
        }
        console.log("sec1",sec);
        //sec = "SEA"+ JSON.stringify(sec);
        //console.log("sec2",sec);
        sec = await SEA.decrypt(sec, pair);
        console.log("MESSAGE:",sec);
        if(!sec){
            //console.log("IF HASH NOT GEN, CREATE IT!");
            sec = SEA.random(16).toString();
            //sec = Gun.text.random(16);
            //console.log("sec RANDOM",sec);
            enc = await SEA.encrypt(sec, pair);
            //console.log("enc",enc);
            if(opt.sharekeytype == "path"){
                user.get('trust').get(pair.pub).get(path).put(enc);
            }
            if(opt.sharekeytype == "graph"){
                console.log("graph create???");
                console.log(enc);
                console.log(KEYID);
                console.log(gun);
                //root.get(gun._.soul).get('trust').get(pair.pub).get(gun._.get).put(enc);
                gun.get('trust').get(pair.pub).get(KEYID).put(enc);
                console.log(enc);
                //gun.get('trust').get(pair.pub).get(gun._.get).put("test");
            }
        }
        //console.log("sec=====================",sec);
        //console.log("data",data)
        enc = await SEA.encrypt(data, sec);
        //console.log("enc=============",enc);
        if(opt.sharekeytype == "path"){
            gun.put(enc, cb);
        }
        if(opt.sharekeytype == "graph"){
            console.log("set value graph")
            console.log(enc);
            //root.get(gun._.soul).get('value').put(enc, cb);
            gun.get('value').put(enc, cb);
        }
    }());
    return gun;
}

Gun.chain.encryptput = encryptput;
/*
    user...decryptvalue(cb);
    let user = gun.user();
    user.get('profile').get('alias').decryptvalue(ack=>{
        //console.log(ack);
    });
*/
var decryptvalue = Gun.User.prototype.decryptvalue = function(cb,opt){
    //get decrypt key to return value
    //console.log("`.decryptvalue` PROTOTYPE API MAY BE CHANGED OR RENAMED USE!");
    cb = cb || function(ctx) { return ctx };
    opt = opt || {};
    let gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    let rootgun = gun;

    //console.log(gun._.root.opt);
    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;
    //console.log(opt.sharekeytype);

    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    (async function(){
        //console.log(gun);
        //console.log(gun._.root.opt);
        let sec
        if(opt.sharekeytype == "path"){
            sec = user.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            console.log("graph???");
            //console.log(gun._.get);
            //console.log(rootgun);
            sec = await gun.get('trust').get(pair.pub).get(gun._.get).then();
            console.log(sec);
        }

        sec = await sec;

        //sec = "SEA"+ JSON.stringify(sec);
        //console.log(sec);
        sec = await SEA.decrypt(sec, pair);
        //console.log("sec===========",sec);
        let key;
        if(opt.sharekeytype == "path"){
            key = await gun.then();
        }
        if(opt.sharekeytype == "graph"){
            console.log("graph");
            key = await gun.get('value').then();
            console.log("key",key);
        }
        //console.log(key);
        let mvalue = await SEA.decrypt(key, sec);
        //console.log(mvalue);
        cb(mvalue);
    }());
    return gun;
}
Gun.chain.decryptvalue = decryptvalue;
//working to decrypt data??
/*
    //user...decryptdata(to,db);
    //gun...decryptdata(to,db);
    let user = gun.user();
    let to = gun.user(publickey);
    to.get("profile").get("alias").decryptdata(to,ack=>{
        console.log(ack);
    });
*/
//Zf3MC4zSKx9brn3LSRN0bobf3dCUvWyDZG40ioiRj2c.PL7ChkXlFyCK5CFbJibhd2bpw2fpfSxxSLmGnh1LkOg
var decryptdata = Gun.User.prototype.decryptdata = function(to, cb, opt){
    // gun graph to decrypt key to return value
    console.log("`.decryptdata` PROTOTYPE API MAY BE DELETED OR CHANGED OR RENAMED USE!");
    cb = cb || function(ctx) { return ctx };
    opt = opt || {};
    let gun = this, user = gun.back(-1).user(), pair = user._.sea, path = '';
    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;
    if(!to){
        //cb({err:"User not set!"});
        console.log("User graph net set!");
        return gun;
    }
    //if(cb){
        //(opt = opt || {}).ok = cb;
        //console.log("found call back...");
        //console.log(opt);
    //}
    //console.log(gun);

    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    (async function(){
        //console.log(path);
        //console.log(gun._);
        //console.log(gun);
        //console.log(user);
        //KEY SALT
        let enc1
        if(opt.sharekeytype == "path"){
            enc1 = await to.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            enc1 = await gun.get('trust').get(pair.pub).get(gun._.get).then();
        }
        //console.log(enc1);
        if(!enc1){
            console.log("Error Null || Denied!");
            cb(null);
            return gun;
        }
        //var enc1 = await user.get('trust').get(publickey).get(path).then(); // nope
        //console.log(enc1);
        //enc1 = "SEA"+ JSON.stringify(enc1);
        //console.log(enc1);
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
        //enc2 = "SEA"+ JSON.stringify(enc2);
        //console.log(enc);
        //console.log(gun);
        let dvalue = await SEA.decrypt(enc2, key);
        //console.log(dvalue);

        cb(dvalue);
    }());
    return gun;
}
//this deal with gun root function call
Gun.chain.decryptdata = decryptdata;

}());