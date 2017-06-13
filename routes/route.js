'use strict';

module.exports = (params) => {
    const app = params.app;
    const middleware = params.middleware;
    const controller = params.controller;

    app.get('', controller.WelcomeController.index);
    app.get('/login/status', controller.LoginController.index);
}