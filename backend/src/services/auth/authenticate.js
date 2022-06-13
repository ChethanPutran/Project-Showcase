const authenticate = async (req, res, next) => {
	try {
		if (req.user) {
			next();
		} else {
			throw new Error('');
		}
	} catch (err) {
		res.status(401).send({
			status: 'failure',
			error: { message: 'You are not authenticated!' },
		});
	}
};

module.exports = authenticate;
