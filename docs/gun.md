Links:
 
 * 
 * https://gun.eco/docs/Building-Storage-Adapters#hook-into-guns-io-events

```
var msg = (typeof data == 'string')? data : JSON.stringify(data);
```

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

```javascript
gun.get('list').get(id)// will get the 1 thing out of a list.

```

```
https://gun.eco/docs/RAD#lex
lib/time.js ? Yeah, it is kinda being deprecated now in favor of https://gun.eco/docs/RAD#lex (which currently has a bug on it)

var mixer;
for(let i=0;i<users.length;i++) {
mixer.push(gun.get('AppName'+'~'+users[i].pub).get(someDeterministicPath));
}
compare nodes with mix.js
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

# SEA Section:

```
SEA.random(16).toString();
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

```javascript
  var alice = await SEA.pair();
  var bob = await SEA.pair();
  var enc = await SEA.encrypt('shared data', await SEA.secret(bob.epub, alice));
  var msg = await SEA.decrypt(enc, await SEA.secret(alice.epub, bob));
  console.log(msg);
```
Create trust table.
generate key that is share able. But create encrypt top layer or root graph with pathing.


```javascript
  //https://jsbin.com/macobegopi/edit?js,console
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
    
    // this deal when create function with user sign in
    // to get from user own key
    var secret = await SEA.decrypt(enc1, alice);
    //messsage main
    var dmsg = await SEA.decrypt(emsg, secret);
    console.log(dmsg);
    
    //when accessing key from another account.
    //message share
    var mix = await SEA.secret(alice.epub, bob);
    //console.log(mix);
    var key = await SEA.decrypt(enc3, mix);
    //console.log(key);
    
    var dmsg1 = await SEA.decrypt(emsg, key);
    console.log(dmsg1);

```


```javascript
//https://gun.eco/docs/API#-a-name-opt-a-gun-opt-options-

gun.opt({
  uuid: function () {
    return Math.floor(Math.random() * 4294967296);
  }
});

```


```javascript
if(at.opt.secure){
  each.end({err: "Soul is missing public key at '" + key + "'."});
  return;
}
// TODO: Ask community if should auto-sign non user-graph data.
check['any'+soul+key] = 1;
at.on('secure', function(msg){ this.off();
  check['any'+soul+key] = 0;
  if(at.opt.secure){ msg = null }
  each.end(msg || {err: "Data cannot be modified."});
}).on.on('secure', msg);
//each.end({err: "Data cannot be modified."});
return;
```


# set share key node value //user

```javascript
  let user = gun.user();
  let pair = user._.sea;
  //console.log(pair);
  let enc, sec;
  //sec = await gun.get(keyID).get(pair.pub).then();
  //console.log("testing..???");
  sec = await user.get('trust').get(pair.pub).get(keyID).then();
  //console.log("testing..???");
  sec = await SEA.decrypt(sec, pair);
  console.log("SECRET",sec);
  if(!sec){
      sec = SEA.random(16).toString();
      enc = await SEA.encrypt(sec, pair);
      //gun.get(keyID).get(pair.pub).put(enc);
      user.get('trust').get(pair.pub).get(keyID).put(enc);
      //console.log("created finish?");
  }
  enc = await SEA.encrypt(ValueText, sec);
  console.log(enc);
  enc = JSON.stringify(enc);
  enc = window.btoa(enc);
  //console.log(enc);
  gun.get(keyID).put({value:enc});
  let v = await gun.get(keyID).get('value').then();
  console.log(v);

```

# get share key node value //user

```javascript
  let user = gun.user();
  let pair = user._.sea;
  //console.log(pair);
  let enc, sec;
  sec = await user.get('trust').get(pair.pub).get(keyID).then();
  //sec = await user.get(keyID).get('trust').get(keyID).then();
  //console.log(sec);
  sec = await SEA.decrypt(sec, pair);
  console.log("SECRET:",sec);
  let key = await gun.get(keyID).get('value').then();
  console.log(key);
  key = window.atob(key);
  //console.log(key);
  key = JSON.parse(key);
  //console.log(key);
  //console.log(typeof key);
  let mvalue = await SEA.decrypt(key, sec);
  console.log(mvalue);

```

# set key value share key //gun

```javascript
  console.log(gun);
  let user = gun.user();
  let pair = user._.sea;
  //console.log(pair);
  let enc, sec;
  sec = await gun.get(keyID).get('trust').get(pair.pub).get(keyID).then();
  console.log(sec);
  if(sec !=null){
      sec = JSON.parse(sec);
      sec = await SEA.decrypt(sec, pair);
  }
  console.log("SECRET",sec);
  if(!sec){
      sec = SEA.random(16).toString();
      enc = await SEA.encrypt(sec, pair);
      enc = JSON.stringify(enc);
      gun.get(keyID).get('trust').get(pair.pub).get(keyID).put(enc);
      //console.log("created finish?");
  }
  enc = await SEA.encrypt(ValueText, sec);
  console.log(enc);
  enc = JSON.stringify(enc);
  //enc = window.btoa(enc);
  //console.log(enc);
  gun.get(keyID).put({value:enc});
  //let v = await gun.get(keyID).get('value').then();
  //console.log(v);
```

```javascript
  //console.log(gun);
  let user = gun.user();
  let pair = user._.sea;
  //console.log(pair);
  let enc, sec;
  sec = await gun.get(keyID).get('trust').get(pair.pub).get(keyID).then();
  sec = JSON.parse(sec);
  //console.log(sec);
  sec = await SEA.decrypt(sec, pair);
  console.log("SECRET:",sec);
  gun.get(keyID).get('value').once(ack=>{
      console.log(ack);
  });
  let key = await gun.get(keyID).get('value').then();
  console.log(key);
  //key = window.atob(key);
  //console.log(key);
  key = JSON.parse(key);
  //console.log(key);
  //console.log(typeof key);
  let mvalue = await SEA.decrypt(key, sec);
  console.log(mvalue);

```

```
individual listener can be on(function(data, key, msg, event){ event.off() but not always logical to do it in the callback itself
chain.off() is to clear out everything on that chain (and below!) ideally in future chain.off(1) or chain.off(true) and waht @rm-rf-etc is saying chain.off('class') and stuff to make more finegrain removal

```
```javascript
const opt = {
    localStorage: false
};
const gun = Gun(opt);
f = gun.get('foo1').put({id: 'foo1'})
gun.get('foo-set').set(f)
gun.get('foo-set').map().on(console.log)
```


https://gun.eco/docs/FAQ#does-gun-have-some-form-of-acl-access-rights-a-name-acl-a-

Does GUN have some form of ACL (access rights)? 
Not yet. But you can add ALC yourself. If you want an example of how to implement ACL, check out this short demo video: https://youtu.be/ZiELAFqNSLQ And peek at this ~150 lines of HTML/CSS/JS that implements it: https://gist.github.com/amark/44b8110a3c848917d6c738f9c3a36e24

To restrict a group of data: (decentralized method)

One thing you could do (to keep it decentralized / P2P) is to create a user (see tutorial above), make that user be an organization (that maybe only you have the login to), and then the organization can specify OTHER users (actual user profiles) to be admins. Now your app's users all "trust" the public key of the organization, and then run fully decentralized logic where they reject (which can happen automatically in SEA) data from anybody that isn't an admin, even as admins change/add/remove over time from the organization.

To add a bit more detail: You would save an ACL table on the organization account. In that ACL table have the path (or soul) of the data that will have others write permission on it. Store on that path/soul in the ACL table, a table of pubkeys allowed to write to that data. Now write wrapper extension around a read function (or do this at a wire adapter level) that checks the ACL table for that record (actually, on 2nd thought, maybe easier to just have the organization reference the ACL table on the record itself, rather than as a separate record), then perform a read from those other pubkeys on the matching path (+org name, depending on your schema) and merge (ideally with HAM) the results before passing back the data. Achieve this in 2 ways either wire adapter that sniffs for ACL schema structures and lets matching writes pass through the firewall or chain extension that upon read of this item, just checks/does an extra lookup and merges results through Ham before returning.

To restrict a group of data: (centralized method)

You are able to write middleware hooks to restrict data - although note, they're usually speaking "the wire spec" but it isn't that bad, for example, check this sample out:

https://github.com/zrrrzzt/bullet-catcher

https://github.com/zrrrzzt/gun-restrict-examples

Again, this is more "centralized" logic which is perfectly possible in GUN, the community just mostly focuses around building tooling for P2P/decentralized logic.



```
Looks like setting an array has to be done as a loop if the items in the array are gun nodes. Here's what I mean.

const dbArray = (...arr) => Object.assign({}, arr);

const attachments = [
  [gun.get('pages').get('0'), dbArray(
    gun.get('page/1'),
    gun.get('page/2'),
  )],
];
^ this example actually works, until you try to do the same thing to set rows on pages. Gun throws Invalid graph when trying this.

But, the structure itself is not invalid, it can be done as a loop instead, like this:

const setArray = (parent, children) => {
  children.forEach((child, id) => parent.get(id).put(child));
};

setArray(gun.get('page/1').get('rows'), [
  gun.get('row/1'),
  gun.get('row/2'),
  gun.get('row/3'),
  gun.get('row/3'),
  gun.get('row/4'),
]),

Lightnet @Lightnet 21:20
@rm-rf-etc I feel there something off the code .get('0') .get('rows') are the same format ?

Rob @rm-rf-etc 21:23
@Lightnet ah, I think you found a bug. Let me try that without .get('0')
```
