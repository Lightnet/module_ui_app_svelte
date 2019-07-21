import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
//import express from 'express';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

/*
express() // or Polka, or a similar framework
  .use(
    compression({ threshold: 0 }),
    //serve('assets'),
    sirv("static", { dev }),
    //authenticationMiddleware(),
    sapper.middleware({
      session: (req, res) => ({
        user: req.user
      })
    })
  )
  .listen(PORT);
*/
