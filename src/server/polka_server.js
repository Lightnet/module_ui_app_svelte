// https://github.com/lukeed/polka
// https://dev.to/kvng_zeez/introducing-polka-a-micro-web-server-3p55
// https://www.npmjs.com/package/polka

import Game from '../common/Game';
import ServerEngine from '../ServerEngine';

//import {TextImportCall} from './test';
//TextImportCall();

console.log("Polka Server Init...")
//console.log(__dirname);
//const io = require('socket.io');
const polka = require('polka');
const sirv = require('sirv');
const compression = require('compression');
//const uuidv4 = require('uuid/v4');
//const helmet  = require('helmet');
const Gun = require('gun');
//require('gun/sea');

//if you did not config env it will null default
var { PORT , NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
if(PORT == null){PORT = process.env.PORT || 8080;}
const app = polka();
app.use(compression({ threshold: 0 }));
app.use(sirv('public', { dev }));
app.use(Gun.serve);
//console.log("PORT: "+PORT);
//app.listen(PORT); //this will return polka
app.listen(PORT, err => {
    if (err) throw err;
    //console.log(app);
    console.log(`> Running on localhost:`+PORT);
});
var gunconfig = {
    file: 'data',
    web:app.server //server
};
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

//gun.on('auth', (ack)=>{// peer disconnect
  //console.log(ack);
  //console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
//});
//import {initPhysics} from './physics_framework';
//initPhysics({gun:gun});

const io = require('socket.io')(app.server);

const gameEngine = new Game({});
const serverEngine = new ServerEngine(io, gameEngine, { debug: {}, updateRate: 6 });
// start the game
serverEngine.start();

