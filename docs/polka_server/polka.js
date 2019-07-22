// https://github.com/lukeed/polka
// https://dev.to/kvng_zeez/introducing-polka-a-micro-web-server-3p55
// https://www.npmjs.com/package/polka

const polka = require('polka');
const sirv = require('sirv');
const compression = require('compression');
const Gun = require('gun');

const uuidv4 = require('uuid/v4')
const helmet  = require('helmet');
//const csp = require('helmet-csp');
//console.log(uuidv4);
//if you did not config env it will null default
const { PORT=8080, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
//if(PORT == null){PORT = process.env.PORT || 8080;
const app = polka();

var uuid = uuidv4();
//res.locals.nonce //does not work work
//res.nonce = uuid; //works as github polka var assign
app.use(function (req, res, next) {
  //res.locals.nonce = uuid;
  res.nonce = uuid; //works as github polka
  next()
})
/*
app.use(csp({
  directives: {
    scriptSrc: [
      "'self'",
      (req, res) => `'nonce-${res.nonce}'`  // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
    ]
  }
}))
*/
//app.use(function (req, res) {
//  res.end(`<script nonce="${res.nonce}">alert(1 + 1);</script>`)
//})
app.use(
	helmet(
		{
			contentSecurityPolicy: {
				directives: {
					scriptSrc: [
						"'self'",
						( request, response ) => `'nonce-${response.nonce}'`
					]
				},
				browserSniff: false
			}
		}
	)
);
/*
async function header(req, res, next) {
  //deal with img-src access and other for dev builds.
  //console.log(res);
  //res.setHeader("Access-Control-Allow-Origin", "*");
  //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
app.use(header);
*/
//app.use(helmet());
//app.use(helmet.noCache());
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
  console.log('connect peer to',peer);
  //console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  console.log('disconnected from', peer);
  //console.log('disconnected from peer!');
});

/*
// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
*/