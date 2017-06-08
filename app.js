'use strict';

console.time('Initialize Library');
	const async = require('async');
	const bodyParser = require('body-parser');
	const cookieParser = require('cookie-parser');
	const cors = require('cors');
	const ejs = require('ejs');
	const express = require('express');
	const expressSession = require('express-session');
	const fs = require('fs');
	const helmet = require('helmet');
	const limiter = require('limiter');
	const logger = require('morgan');
	const methodOverride = require('method-override');
	const moment = require('moment');
	const path = require('path');
	const pgsql = require('pg');
	const redis = require('redis');
	const request = require('request');

	const app = express();
	const router = express.Router();
	require('dotenv').load();
console.timeEnd('Initialize Library');

const env = process.env;
console.time('Initialize App');
	app.engine('html', ejs.renderFile);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'html');
	app.set('superSecret', env.APP_KEY);

	app.use(logger('short'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded( { extended:true } ));
	app.use(cookieParser(env.APP_KEY));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(cors());
	app.use(methodOverride());
	app.use(helmet());

	app.disable('x-powered-by');
console.timeEnd('Initialize App');

console.time('Initialize Redis');
	const redisOptions = {
		'host': env.REDIS_HOST,
		'port': env.REDIS_PORT,
		'prefix': env.REDIS_PREFIX
	};

	if(env.REDIS_PASSWORD){
		redisOptions.password = env.REDIS_PASSWORD;
	}

	const redisClient = redis.createClient(redisOptions);

	redisClient.on('error', (err) => {
		console.error('ERROR ON CONNECTING TO REDIS');
	});
console.timeEnd('Initialize Redis');

console.time('Initialize Database');
	
console.timeEnd('Initialize Database');

let params = {
	app, async, fs, moment, path, redisClient, request, router
};

let requireFile = (path, type) => {

	let directoryFiles = fs.readdirSync(path);
	for(let file of directoryFiles){
		let currentLoop = `${path}/${file}`;
		let checkFile = fs.lstatSync(currentLoop);

		if(checkFile.isFile()){
			if(type === 'routes'){
				let routePath = currentLoop.replace('.js', '').replace('./routes/', '').replace('index', '');
				app.use(`/${routePath}`, require(currentLoop));
			}else if(type === 'logic'){
				let trimFile = file.replace('.js', '');
				params[trimFile] = require(currentLoop);
			}
		}else if(checkFile.isDirectory()){
			requireFile(currentLoop, type);
		}
	}
};

console.time('Initialize Core');
	console.time('Initialize Middleware');
		let middleware = require('./middleware')();
		params.middleware = middleware;
	console.timeEnd('Initialize Middleware');

	console.time('Initialize Logic');
		let logicPath = './logic';
		requireFile(logicPath, 'logic');
	console.timeEnd('Initialize Logic');

	console.time('Initialize Routes');
		let routesPath = './routes';
		requireFile(routesPath, 'routes');
	console.timeEnd('Initialize Routes');
console.timeEnd('Initialize Core');

app.use((err, req, res, next) => {
	res.status(500).send({error: 'something blew up!'}).end();
});

app.get('/status', (req, res, next) => {
	res.json({'status':'Server is running', 'date': moment()});
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not found');
	err.status = 404;
	next(err);
});

// Development error handler will print stacktrace
if(env.APP_ENV === 'development'){
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error:err
		});
	});
}

// Production error handler, won't print stacktrace
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

const APP_PORT = env.APP_PORT || 8200;

app.listen(APP_PORT, () => {
	console.log(`Server running on port: ${APP_PORT}`);
});