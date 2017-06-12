module.exports = (params) => {
    return {
        index: (req, res, next) => {
            console.log('in index welcome controller');
            res.send('success');
        }
    }
}