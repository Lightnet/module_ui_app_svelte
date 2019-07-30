/*
    Self contain Sandbox Gun Module:

    Created by: Lightnet

    Credit: amark ( https://github.com/amark/gun)

    License: MIT
    
    Information: It base on user path with get('trust') list / table / map.
    Not sure which term name has the right meaning.
    
    To develop salt share key that where to put your keys in user root or graph? Salt 
    share keys are store in trust list.

    User trust list store in user root graph key with path of the graph to identify the 
    graph key root.

    user.get(trust).get(publickey).get(pathnode).put('saltkey')

    Gun graph can be store in in sub root that can be config to `sharekeytype="graph"`
    But can't be root graph. There is bug on encrypt bug. It will store as string but not json.
    
    //gun.get('foo').get('trust') //not here
    gun.get('foo').get('something').encryptput('bar'); //right way
    gun.get('foo').get('something').get('trust') //it store base on where encryptput.
    - Note have not yet test fully to if worth code it.
    gun.get('foo').encryptput('bar'); // wrong way root require object not variable.
    
    It the best to salt share key genarete by default to let know anyone to your keys.

    Random key used from:
     - SEA.random(16).toString();
     - Gun.text.random(16);

    By Default sharekeytype="path" is for user path. For gun sharekeytype="graph" independent graph.
    Need to check what ever need to do checks.
    
    User / Gun:
     - function grantkey (to allow owner user access to key graph value for other users. Check and create salt keys)
     - function revokekey (to owner revoke user access to key graph for user. Note it will break salt key if share with other users.)
      - Recreate new slat key and reencrypt value.(This break other salt keys are shared.)
     - function encryptput put value (allow owner user to encrypt key value when creating and check salt key)
     - function decryptvalue return value (allow owner user to decrypt key value)
     - function decryptdata (to allow other user to decrypt key value/data from gun or sea but not self)
      - `let to = gun.user(public key)`
     
    User and Gun function for encrypt and decrypt key graph value.

    Notes:
     - Please note this simple build test. 
     - Not tested large scale.
     - Not yet tested full if there key are not random hash that just keyword.
     - Not work debug fails and checks.
     - Not tested outside of node key graph beside user root node.
     - Grant self share public key break salt key.
     - path work with user root level.
     - Function conflict that no checks that override trust list.
     - User encrypt json format will do fine. Gun encrypt root need to string.

*/
(function() {
var Gun = (typeof window !== "undefined")? window.Gun : require('gun/gun');

/*
    work in progress...
*/
Gun.on('opt', function(context) {
    context.opt.sharekeytype="path";//path working
    //context.opt.sharekeytype="graph";//path prototype not working...
    this.to.next(context);
    //console.log(context);
});

/*
    //user...grantkey(to);
    let user = gun.user();
    let to = gun.user(publickey);
    user.get('profile').get('alias').grantkey(to);
*/
var grantkey = Gun.User.prototype.grantkey=async function(to, cb, opt){
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
            if(sec !=null){
                sec = JSON.parse(sec);
            }
        }

        sec = await SEA.decrypt(sec, pair);
        if(!sec){
            //console.log("CREATE SALT KEY")
            sec = SEA.random(16).toString();
            //sec = Gun.text.random(16);
            enc = await SEA.encrypt(sec, pair);
            if(opt.sharekeytype == "path"){
                user.get('trust').get(pair.pub).get(path).put(enc);
            }
            if(opt.sharekeytype == "graph"){
                enc = JSON.stringify(enc);//need to be string bug root gun
                //console.log(enc);
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
            enc = JSON.stringify(enc);
            //console.log(enc);
            gun.get('trust').get(pub).get(gun._.get).put(enc, cb);
        }
    }());
    return gun;
}
Gun.chain.grantkey = grantkey;
/*
    //- Recreated new salt key to share.
    //- reencrypt key value on new salt
    //user...revokekey(to);
    let user = gun.user();
    let to = gun.user(publickey);
    user.get('profile').get('alias').revokekey(to);
*/
var revokekey = Gun.User.prototype.revokekey=async function(to, cb, opt){
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
        let enc, sec, key;
        if(opt.sharekeytype == "path"){
            sec = await user.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            sec = await gun.get('trust').get(pair.pub).get(gun._.get).then();
            if(sec !=null){
                sec = JSON.parse(sec);
            }
        }

        //console.log(sec);
        //sec = "SEA"+ JSON.stringify(sec);
        sec = await SEA.decrypt(sec, pair);
        //console.log(sec);
        if(opt.sharekeytype == "path"){
            key = await gun.once().then();
        }
        if(opt.sharekeytype == "graph"){
            key = await gun.get('value').once().then();
            key = JSON.parse(key);
        }
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
            enc = JSON.stringify(enc);//need to be string bug root gun
            gun.get('trust').get(pair.pub).get(gun._.get).put(enc);
        }

        //encrypt Value
        let v = await SEA.encrypt(value, sec);
        if(opt.sharekeytype == "graph"){
            v = JSON.stringify(v);
        }
        if(opt.sharekeytype == "path"){
            gun.put(v, cb);
        }
        if(opt.sharekeytype == "graph"){
            gun.get('value').put(v, cb);
        }

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
Gun.chain.revokekey = revokekey;
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
    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;//Check sharekey type
    opt.debug = opt.debug || true;
    //console.log(gun);
    let root = gun.back(-1);
    //let KEYID = gun._.get;
    //let gunkey = root.get(KEYID);

    //let rootgun = gun.back(-1);
    //console.log(path);
    (async function(){
        //console.log("path==============",path);
        //console.log(path);
        let enc, sec;        
        //console.log("sharekeytype: ", opt.sharekeytype);
        //console.log(root);
        //console.log("===============",gunkey);
        if(opt.sharekeytype == "path"){
            sec = await user.get('trust').get(pair.pub).get(path).then();
            sec = await SEA.decrypt(sec, pair);
            if(!sec){
                //console.log("IF SALT KEY DOES NOT EXIST, CREATE IT!");
                sec = SEA.random(16).toString();
                //sec = Gun.text.random(16);
                enc = await SEA.encrypt(sec, pair);
                user.get('trust').get(pair.pub).get(path).put(enc);
            }
            enc = await SEA.encrypt(data, sec);
            gun.put(enc, cb);//PUT ENCRYPT DATA
        }
        if(opt.sharekeytype == "graph"){
            //console.log(gun._.get);
            sec = await gun.get('trust').get(pair.pub).get(gun._.get).then();
            //console.log("sec",sec);
            if(sec !=null){
                sec = JSON.parse(sec);
                sec = await SEA.decrypt(sec, pair);
            }
            //console.log("SECERT: ",sec);
            if(!sec){
                //console.log("CREATE!");
                sec = SEA.random(16).toString();
                enc = await SEA.encrypt(sec, pair);
                enc = JSON.stringify(enc);//need to be string bug root gun
                //console.log("enc",enc);
                gun.get('trust').get(pair.pub).get(gun._.get).put(enc);                
            }
            enc = await SEA.encrypt(data, sec);
            enc = JSON.stringify(enc);
            //console.log("VALUE E:",enc);
            gun.put({value:enc}, cb);//PUT ENCRYPT DATA
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

    opt.sharekeytype = opt.sharekeytype || gun._.root.opt.sharekeytype;
    //console.log(opt.sharekeytype);

    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    //console.log(path);
    (async function(){
        let sec, key;
        if(opt.sharekeytype == "path"){
            //SECRET
            sec = await user.get('trust').get(pair.pub).get(path).then();
            sec = await SEA.decrypt(sec, pair);
            key = await gun.then();
        }
        if(opt.sharekeytype == "graph"){
            //console.log("graph!");
            //SECRET
            sec = await gun.get('trust').get(pair.pub).get(gun._.get).then();
            sec = JSON.parse(sec);
            //console.log(sec);
            sec = await SEA.decrypt(sec, pair);
            //VALUE
            key = await gun.get('value').then();
            key = JSON.parse(key);
            //console.log("key",key);
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

    gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
    (async function(){
        //KEY SALT
        let enc1
        if(opt.sharekeytype == "path"){
            enc1 = await to.get('trust').get(pair.pub).get(path).then();
        }
        if(opt.sharekeytype == "graph"){
            enc1 = await gun.get('trust').get(pair.pub).get(gun._.get).then();
            if(enc1 !=null){
                enc1 = JSON.parse(enc1);
            }
            //console.log(enc1);
        }
        //console.log("enc1",enc1);
        if(!enc1){
            console.log("Error Null || Denied!");
            cb(null);
            return gun;
        }
        //enc1 = "SEA"+ JSON.stringify(enc1);
        //console.log(enc1);
        let epub = await to.get('epub').then();
        //console.log("epub",epub);
        //PAIR SHARE
        let mix = await SEA.secret(epub, pair);
        //console.log("mix",mix);
        //KEY SHARE
        let key = await SEA.decrypt(enc1, mix);
        //console.log("key",key);
        //VALUE
        let enc2 
        if(opt.sharekeytype == "path"){
            enc2 = await gun.then();
        }
        if(opt.sharekeytype == "graph"){
            enc2 = await gun.get('value').then();
            enc2 = JSON.parse(enc2);
        }
        //console.log(enc2);
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