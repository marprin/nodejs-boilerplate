'use strict';

module.exports = (params) => {
    return {
        index: (req, res, next) => {
            let context = {
                pageTitle: 'Login',
                view: 'login.html'
            };
            return res.render('template.html', context);
        }
    }
}