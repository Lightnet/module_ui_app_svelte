//===============================================
// init project:ue4 database rest
// server.js
// where your node app starts
//===============================================


//const path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Gun = require('gun');
require('gun/lib/then.js');
require('gun/lib/not.js');
var helmet = require('helmet');
//===============================================

require('dotenv').config();
var PORT = process.env.PORT || 8080;
//var PORT = process.env.PORT || 80;
console.log("PORT:" + PORT );

app.use(helmet());
app.use(helmet.noCache());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  //deal with img-src access and other for dev builds.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(Gun.serve);
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
//app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  //response.render('index');
//});

//=========================================================
// Init Server Host
//=========================================================

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  //http://localhost:3000/
  //console.log(listener.address());
});

//=========================================================
// Socket.IO
//=========================================================
var io = require('socket.io')(listener);
//=========================================================
// GunDB
//=========================================================
var bdatabase = process.env.BDatabase || false;
var gunconfig = {
  web:listener//server express
}
var dbFile = './data.json';
gunconfig.file=process.env.DatabaseFile || './data.json';
if(bdatabase =='true'){
  gunconfig.localStorage = false;
  gunconfig.radisk = false;
  var blocal = process.env.Blocal || false;
  if(blocal){
    gunconfig.mongo = {
      host:'localhost',
      host:'localhost',
      port: '27017',
      database: 'gun',
      collection: 'gun-mongo',
      query: ''
    }
  }else{
    gunconfig.mongo = {
      host: process.env.DBHost || 'localhost',
      host:'localhost',
      port:process.env.DBPort  || '27017',
      database: process.env.DBName  || 'gun',
      collection: process.env.DBCollection  || 'gun-mongo',
      query: ''
    }
  }
  console.log("init database setup???");
}

var gun = Gun({
  file: dbFile,
  web:listener//server express
});

var gun = Gun(gunconfig);
//console.log(gun);

gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  console.log('peer connect!');
});

gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  console.log('disconnected from peer!');
});

gun.get('random/8t5Uu3qy6').put({hello: "world"});

//assign locals variable for gun
app.use(function (req, res, next) {
  res.locals.gun = gun;
  //res.locals.user = req.user
  //res.locals.authenticated = !req.user.anonymous
  next()
})
//=========================================================
// UE4 get and post
//=========================================================

var ue4 = require('./src/server/ue4api');
app.use('/ue4', ue4);

//=========================================================
// Socket IO set up
//=========================================================
io.on('connection', function(socket){
	console.log('a user connected socket.io');
  	socket.on('chat message', (data) => {
    	console.log('msg',data)
    	io.emit('chat message', data);
    	botcmds.parsemessage(socket,data,(_txt)=>{
      		io.emit('chat message', _txt);
    	});
  	})
  	socket.on('disconnect', () => {
    	console.log('user disconnected')
  	})
});
