'use strict';

console.time('Initialize Library');
	const async = require('async');
	const bodyParser = require('body-parser');
	const crypto = require('crypto-js');
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
	const mysql = require('mysql2');
	const path = require('path');
	const pgsql = require('pg');
	const redis = require('redis');
	const redisSession = require('connect-redis')(expressSession);
	const request = require('request');
	const Sequelize	= require('sequelize');
	const _ = require('underscore');
	const userAgent = require('express-useragent');
	const uuidv4 = require('uuid/v4');

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
	app.use(cookieParser(env.COOKIE_SECRET));
	app.use('/public', express.static(path.join(__dirname, 'public')));
	app.use(expressSession({ store: new redisSession({ host: env.REDIS_HOST, port: env.REDIS_PORT }), secret: env.SESSION_SECRET, saveUninitialized: true, resave: true }))
	app.use(cors());
	app.use(methodOverride());
	app.use(helmet());
	app.use(userAgent.express());

	app.disable('x-powered-by');
console.timeEnd('Initialize App');

console.time('Initialize Redis');
	let redisOptions = {
		'host': env.REDIS_HOST,
		'port': env.REDIS_PORT,
		'prefix': env.REDIS_PREFIX
	};

	if(env.REDIS_PASSWORD){
		redisOptions.password = env.REDIS_PASSWORD;
	}

	let redisClient = redis.createClient(redisOptions);

	redisClient.on('error', (err) => {
		console.error('ERROR ON CONNECTING TO REDIS');
	});
console.timeEnd('Initialize Redis');

console.time('Initialize Database');
	let sequelizeConnection = {
		host: env.DB_HOST || '127.0.0.1',
		port: env.DB_PORT || 3306,
		database: env.DB_NAME,
		username: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		dialect: env.DB_ADAPTER || 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	};
	let sequelizeClient = new Sequelize(sequelizeConnection);

	sequelizeClient.authenticate().then( () => {
		console.log('Connection to database has been established successfully.');
	}).catch( (err) => {
		console.error(`ERROR WHEN CONNECTING TO DATABASE: ${err}`);
	});

	let databaseConnection = {
		host: env.DB_HOST || '127.0.0.1',
		port: env.DB_PORT || 3306,
		database: env.DB_NAME,
		user: env.DB_USERNAME,
		password: env.DB_PASSWORD,
	};

	let db = mysql.createConnection(databaseConnection);
console.timeEnd('Initialize Database');

let params = {
	_, app, async, crypto, db, env, fs, moment, path, redisClient, request, router, Sequelize, sequelizeClient, userAgent, uuidv4
};

let objectCreation = (keys, type, fullPath) => {
	let keysLength = keys.length;
	let tempObject = {};
	tempObject[keys[keysLength - 1]] = require(fullPath)(params);

	for(let i = (keysLength - 2); i >= 0; i--) {
		let newObject = {};
		newObject[keys[i]] = tempObject;
		tempObject = newObject;
	}

	if(!params.hasOwnProperty(type)) {
		params[type] = {};
	}
	_.extend(params[type], tempObject);
}

let requireFile = (path, type) => {
	let directoryFiles = fs.readdirSync(path);
	for(let file of directoryFiles) {
		let currentLoop = `${path}/${file}`;
		let checkFile = fs.lstatSync(currentLoop);

		if (checkFile.isFile()) {
			let trimPath = currentLoop.replace('.js', '').replace(type, '').split('/');
			let trimType = type.replace('./', '').replace('/', '');
			objectCreation(trimPath, trimType, currentLoop);
		} else if (checkFile.isDirectory()) {
			requireFile(currentLoop, type);
		}
	}
};

let requireOneChildFolder = (path, type) => {
	let directoryFiles = fs.readdirSync(path);
	let requiredFile = {};
	requiredFile[type] = {};

	let fileExcept = ['routes'];

	if(!params.hasOwnProperty(type)) {
		params[type] = {};
	}

	for(let file of directoryFiles) {
		let currentLoop = `${path}/${file}`;
		let trimPath = currentLoop.replace('.json', '').replace(path + '/', '');

		if(fileExcept.indexOf(trimPath ) >= 0) {
			requiredFile[type][trimPath] = require(currentLoop);
		} else {
			requiredFile[type][trimPath] = require(currentLoop)[env.APP_ENV];
		}
	}
	_.extend(params[type],requiredFile[type]);
}

console.time('Initialize Core');
	console.time('Initialize Config');
		let configPath = './config';
		requireOneChildFolder(configPath, 'CONFIG');
	console.timeEnd('Initialize Config');

	console.time('Initialize Helper');
		let helper = require('./helper/helper.js')(params);
		params.helper = helper;
	console.timeEnd('Initialize Helper');

	console.time('Initialize Middleware');
		let middleware = require('./Middleware/middleware.js')(params);
		params.Middleware = middleware;
	console.timeEnd('Initialize Middleware');

	console.time('Initialize Model');
		let modelPath = './Model';
		requireFile(modelPath, './Model/');
	console.timeEnd('Initialize Model');

	console.time('Make Model Relations');
		Object.keys(params.Model).forEach(modelName => {
			if ('associate' in params.Model[modelName]) {
				params.Model[modelName].associate(params.Model);
			}
		});
	console.timeEnd('Make Model Relations');

	console.time('Initialize Logic');
		let logicPath = './Logic';
		requireFile(logicPath, './Logic/');
	console.timeEnd('Initialize Logic');

	console.time('Initialize Controller');
		let controllerPath = './Controller';
		requireFile(controllerPath, './Controller/');
	console.timeEnd('Initialize Controller');

	console.time('Initialize Routes');
		let routesPath = './routes/route.js';
		require(routesPath)(params);
	console.timeEnd('Initialize Routes');
console.timeEnd('Initialize Core');

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send({error: 'something blew up!'}).end();
});

app.get('/status', (req, res, next) => {
	res.json({'status':'Server is running', 'date': moment()});
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not found');
	err.status = 404;
	err.title = 'Not Found';
	next(err);
});

// Error handler, won't print stacktrace on production environment
app.use((err, req, res, next) => {
	let error = (env.APP_ENV === 'production') ? {} : err;
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: error,
		title: err.title || 'Error'
	});
});

const APP_PORT = env.APP_PORT || 8432;

app.listen(APP_PORT, () => {
	console.log(`Server running on port: ${APP_PORT}`);
});