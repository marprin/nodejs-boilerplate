'use strict';

module.exports = ({ app, Async, CONFIG, env, Limiter, Model, SequelizeOp } = params) => {
    return {
        setLanguage: (req, res, next) => {
            let language = req.query.lang || req.signedCookies['lang'] || false;

            // validate language

            if(language) {
                app.locals.lang = language;
                res.cookie('lang', language, { maxAge: 86400000, signed: true })
            }

            return next();
        },
        isBlacklistedIps: (req, res, next) => {
            let ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            Model.black_listed_ips.findOne({
                where: {
                    ip_address: {
                        [SequelizeOp.eq]: ip_address
                    }
                },
                attributes: ['id']
            }).then(ip_address => {
                if(ip_address) {
                    return res.end('Sorry please contact our admin');
                } else {
                    return next();
                }
            }).error(error => {
                return next();
            });
        },
        requestLimiter: (req, res, next) => {
            Limiter.removeTokens(1, (err, remainingRequest) => {
                if(err) {
                    return res.end('Too many request');
                } else {
                    return next();
                }
            });
        },
        flashMessage: (req, res, next) => {
            let flashMessage = req.flash();
            app.locals.flash = flashMessage;

            app.locals.validationErrors = [];
            if(flashMessage.hasOwnProperty('validationErrors')) {
                app.locals.validationErrors = flashMessage.validationErrors[0];
            }
            next();
        }
    }
}
