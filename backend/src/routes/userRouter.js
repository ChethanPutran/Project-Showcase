const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../services/auth/oauth');

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/auth/google/verify',
	passport.authenticate('google', { failureRedirect: '/login' }),
	function (req, res) {
		res.redirect('http://localhost:3000');
	}
);

module.exports = router;
