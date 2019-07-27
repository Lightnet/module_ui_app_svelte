Links:



 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 


 
 * 
 * https://gun.eco/docs/Building-Storage-Adapters#hook-into-guns-io-events



# gun.on() event list: 
 * hi (peer)
 * bye (peer)
 * auth (SEA)
 * ack
 * create
 * get
 * put
 * in
 * node
 * Those tag are found in gun._.tag

```javascript

//user._.sea = pair()
```

# gun listen
```javascript
gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  console.log('disconnected from peer!');
});
```


SEA user recall
```javascript
let user = gun.user();
user.recall().then(function(ack){
  if (!ack || !ack.sea){
    //console.log(ack);
  }
});

```

# Sea User:
 * Unstable not used for prodction.
 * auth (user login)
 * leave (user logout)
 * create (create user)
 * user._.sea (key for use for pair key)
 * user.is (check user exist and pub key)
 * user._.soul (user id, can't tamper)


 * https://gun.eco/docs/API
 
SEA Auth
```javascript
gun.on('auth',ack=>{
	console.log('auth');
	console.log(ack);
});
```

```javascript
let user = gun.user();

user.recall().then(function(ack){
  if (!ack || !ack.sea){
    console.log(ack);
  }
});

```

```javascript
// now let's share private data with someone:
var alice = await SEA.pair();
var bob = await SEA.pair();
var enc = await SEA.encrypt('shared data', await SEA.secret(bob.epub, alice));
await SEA.decrypt(enc, await SEA.secret(alice.epub, bob));
// `.secret` is Elliptic-curve Diffie–Hellman
```

# Sea User Custom Module Setup
```javascript
//setup is simalar but on User.
//This base with out init (var gun = Gun())  first but setup module first.
Gun.User.prototype.cunstomfun=function(cb, opt){
  console.log("custom test");
  opt = opt || {};
  cb = cb || function(ctx) { return ctx };
  let gun = this;

  return gun;
}

```

# module setup

```javascript
(function() {
var Gun = (typeof window !== "undefined")? window.Gun : require('../gun');

Gun.chain.token=function(cb, opt){
    opt = opt || {};
    cb = cb || function(ctx) { return ctx };
    let gun = this;

    return gun;
}

}());
```




Testing...

```javascript
let peers = gun.get('peers')//?
peers.once(function(data){
    let uSet = {name: name, pub: upPub}
    //console.log("calling setu with ", uSet)
    if(data){
        //console.log("calling setu with ", uSet)
        setu(peers, uSet)
    }else{
        peers.set(uSet)
    }
});

```

 gun/sea.js
```javascript
//line:1009
User.prototype.trust = async function(user){
      // TODO: BUG!!! SEA `node` read listener needs to be async, which means core needs to be async too.
      //gun.get('alice').get('age').trust(bob);
      if (Gun.is(user)) {
        user.get('pub').get((ctx, ev) => {
          console.log(ctx, ev)
        })
      }
    }
//line:1018
//User.prototype.grant = function(to, cb)
User.prototype.grant = function(to, cb){
      console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
      var gun = this, user = gun.back(-1).user(), pair = user.pair(), path = '';
      gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
      (async function(){
      var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
      sec = await SEA.decrypt(sec, pair);
      if(!sec){
        sec = SEA.random(16).toString();
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

    User.prototype.secret = function(data, cb){
      console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
      var gun = this, user = gun.back(-1).user(), pair = user.pair(), path = '';
      gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
      (async function(){
      var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
      sec = await SEA.decrypt(sec, pair);
      if(!sec){
        sec = SEA.random(16).toString();
        enc = await SEA.encrypt(sec, pair);
        user.get('trust').get(pair.pub).get(path).put(enc);
      }
      enc = await SEA.encrypt(data, sec);
      gun.put(enc, cb);
      }());
      return gun;
    }

```