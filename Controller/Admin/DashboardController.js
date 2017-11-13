'use strict';

module.exports = ({_, adminTemplate, async, crypto, env, fs, helper, Logic, Model, moment, path, redisClient, request, userAgent, uuidv4} = params) => {
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