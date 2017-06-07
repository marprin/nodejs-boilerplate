module.exports = (params) => {
	return {
		loginUser: (req, res, next) => {
			console.log('tes from middleware');
			next();
		}
	}
}