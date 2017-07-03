'use strict';

module.exports = ({app, Controller, Middleware, Model} = params) => {
    app.get('', Controller.WelcomeController.index);
    app.get('/login', Controller.LoginController.index);
}