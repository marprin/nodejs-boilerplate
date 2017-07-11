'use strict';

module.exports = ({_, async, crypto, env, fs, helper, Logic, Model, moment, path, redisClient, request, userAgent, uuidv4} = params) => {
    return {
        index: (req, res, next) => {
            let context = {
                pageTitle: 'Welcome'
            };
            return res.render('welcome.html', context);
        },
        test: (req, res, next) => {
            return helper.notFoundResponse(res);
        }
    }
}