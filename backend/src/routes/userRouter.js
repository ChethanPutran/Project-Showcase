const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

require('../services/auth/oauth');

const User = require('../db/modals/user');
const authenticate = require('../services/auth/authenticate');

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/auth/google/verify',
	passport.authenticate('google', {
		successRedirect: '/users/auth/google/success',
		failureRedirect: '/users/auth/google/failure',
		failureFlash: true,
		successFlash: true,
	})
);

router.get('/auth/google/success', authenticate, (req, res, next) => {
	req.flash('sucess', 'Successfully authenticated using Google Accounts');
	res.redirect('/about');
});

router.get('/auth/google/failure', (req, res, next) => {
	req.flash('danger', 'Something went wrong! Authentication failed!');
	res.redirect('/error');
});

module.exports = router;
