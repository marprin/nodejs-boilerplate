# README #

### What is this repository for? ###

This is a base structure for Node JS application

### How do I get set up? ###

* Install [node](https://nodejs.org/en/)
* Install [redis](https://redis.io/)
* Install Database [mysql](https://www.mysql.com/)
* Clone this repository
* To install the package on package.json just run

    `npm install` 
    
* Copy `.env.example` to `.env` and then set the key based on need

* To run the application for development purposes

    `node app` or `npm start`
    
    This will start the application on `127.0.0.1:8200` or please check your .env file

### To run on production environment

To run on production environment please don't use `node app` or `npm start`
because when something went wrong, your app will stop and it will be a down time for you project.
To make the application available or at least nearly zero down time, please use another package
to make the app running all the time or at least restart when something went wrong.

##### Suggested Package on Production Environment
* [PM2](https://www.npmjs.com/package/pm2)
* [Forever](https://www.npmjs.com/package/forever)
* etc

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact