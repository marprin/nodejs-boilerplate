module.exports = (params) => {
    return {
        index: (req, res, next) => {
            return res.render('login.html');
        }
    }
}