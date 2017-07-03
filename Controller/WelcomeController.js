'use strict';

module.exports = (params) => {
    return {
        index: (req, res, next) => {
            let context = {
                pageTitle: 'Welcome'
            };
            return res.render('welcome.html', context);
        }
    }
}