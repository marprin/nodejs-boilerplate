'use strict';

module.exports = (params) => {
    const app = params.app;
    const Middleware = params.Middleware;
    const Controller = params.Controller;

    app.get('', Controller.WelcomeController.index);
    app.get('/login', Controller.LoginController.index);
}