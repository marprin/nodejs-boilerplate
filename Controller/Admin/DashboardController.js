'use strict';

module.exports = ({_, adminTemplate, Async, Crypto, env, fs, helper, Logic, Model, Moment, path, RedisClient, Request, userAgent, uuidv4} = params) => {
    return {
        index: (req, res, next) => {
            let context = {
                pageTitle: 'Dashboard',
                view: 'admin/dashboard.html'
            };
            return res.render(adminTemplate, context);
        }
    }
}