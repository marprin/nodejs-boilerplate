'use strict';

module.exports = (params) => {
    return {
        notFoundResponse: (res, status = 404, error = {}, message = 'Not Found', title = 'Not Found') => {
            res.status(status);
            return res.render('error.html', {error, message, title});
        }
    }
}