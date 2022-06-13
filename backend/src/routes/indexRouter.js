const router = require('express').Router();

const authenticate = require('../services/auth/authenticate');

router.get('/', (req, res) => {
	res.status(200).send({ data: 'Welcome to Todo' });
});

router.get('/user', authenticate, (req, res) => {
	res.status(200).send({ data: req.user });
});

router.get('/logout', authenticate, async (req, res) => {
	try {
		res.session = null;
		req.logout();
		res.status(200).send({ data: 'sucess' });
	} catch (err) {
		res.status(500).send({ error: { message: err.message } });
	}
});
module.exports = router;
