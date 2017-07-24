'use strict';

module.exports = ({app, CONFIG, Controller, Middleware, Model} = params) => {
    let routes = CONFIG.routes;

    app.get(routes.home, Controller.WelcomeController.index);
    app.get(routes.login, Controller.LoginController.index);
    app.get(routes.admin.dashboard, Controller.Admin.DashboardController.index);
    app.get('/test', Controller.WelcomeController.test);
}