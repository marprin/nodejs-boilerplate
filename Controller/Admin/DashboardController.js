'use strict';

module.exports = ({_, async, crypto, env, fs, helper, Logic, Model, moment, path, redisClient, request, userAgent, uuidv4} = params) => {
    return {
        index: (req, res, next) => {
            let context = {
                pageTitle: 'Dashboard'
            };
            return res.render('admin/dashboard.html', context);
        }
    }
}