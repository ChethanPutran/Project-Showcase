const router = require('express').Router();
const path = require('path');

const authenticate = require('../services/auth/authenticate');

router.get('/', (req, res, next) => {
	res.status(200).send({ data: 'Welcome to Todo' });
});
router.get('/error', (req, res, next) => {
	res.status(401).send({ error: req.flash('danger') });
});

router.get('/about', authenticate, (req, res, next) => {
	res.status(200).send({ message: req.flash('success'), data: req.user });
});

router.get('/logout', authenticate, async (req, res) => {
	try {
		res.session = null;
		req.logout();
		res.status(200).redirect('/');
	} catch (err) {
		res.status(500).send(err.message);
	}
});
module.exports = router;
