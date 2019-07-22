// var Gun = require('gun'); // in NodeJS
// var Gun = require('gun/gun'); // in React
console.log("init...");
console.log(location);
var gun = Gun(location.host+"/gun");

gun.on('hi', peer => {//peer connect
  console.log('connect peer to',peer);
  //console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
});

gun.get('mark').put({
  name: "Mark",
  email: "mark@gunDB.io",
});

let doc = document.getElementById('gunjs')
console.log(doc);
console.log("data?");
gun.get('mark').on(function(data, key){
  console.log("update:", data);
  doc.innerText = data.name;
});