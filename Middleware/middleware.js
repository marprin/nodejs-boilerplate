'use strict';

module.exports = ({ app, async, CONFIG, env, limiter, Model } = params) => {
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
		requestLimiter: (req, res, next) => {
	      limiter.removeTokens(1, (err, remainingRequest) => {
	          if(err) {
	              return res.end('Too many request');
	          } else {
	              return next();
	          }
	      });
	  },
	  flashMessage: (req, res, next) => {
	      app.locals.flash = req.flash();
	      next();
	  }
	}
}
