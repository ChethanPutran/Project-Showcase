const mongoose = require('mongoose');

const authenticate = async (req, res, next) => {
	try {
		if (req.user) {
			next();
		} else {
			req.flash('danger', 'You are not authenticated!');
			console.log('Not authenticated!');
			res.redirect('/error');
		}
	} catch (err) {
		req.flash('danger', 'You are not authenticated!');
		res.redirect('/error');
	}
};

module.exports = authenticate;
