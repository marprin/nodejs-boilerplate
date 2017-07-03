'use strict';

module.exports = (params) => {
    return {
        index: (req, res, next) => {
            let context = {
                pageTitle: 'Login'
            };
            return res.render('login.html', context);
        }
    }
}