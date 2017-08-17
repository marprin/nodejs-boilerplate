'use strict'

let baseUrl = 'http://localhost:8200';
let superTest = require('supertest');
let server = superTest.agent(baseUrl);

require('dotenv').load();
let env = process.env;
let sequelizeConnection = {
    host: env.DB_HOST || '127.0.0.1',
    port: env.DB_PORT || 3306,
    database: env.DB_TESTING_NAME,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    dialect: env.DB_ADAPTER || 'mysql',
    pool: {
        max: 1,
        min: 0,
        idle: 10000
    }
};

let Sequelize = require('sequelize');
let sequelizeClient = new Sequelize(sequelizeConnection)

sequelizeClient.authenticate().then( () => {
    console.log('Connection to database has been established successfully.');
}).catch( (err) => {
    console.error(`ERROR WHEN CONNECTING TO DATABASE: ${err}`);
});

module.exports = {
    async: require('async'),
    baseUrl: baseUrl,
    env: env,
    Sequelize: Sequelize,
    sequelizeClient: sequelizeClient,
    server: server,
    should: require('should'),
    sinon: require('sinon'),
    superTest: superTest,
};

