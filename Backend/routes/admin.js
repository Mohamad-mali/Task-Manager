const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const auth = require('../middleware/is-auth');

const adminController = require('../controllers/admin');

router.get('/users', auth, adminController.getUsers);

router.get('/user/:userId', auth, adminController.getUser);

router.get('/totalNumbers', auth, adminController.getTotalNumbers);

router.put(
	'/upDateUser/:userId',
	[
		body('email')
			.isEmail()
			.withMessage('enter a valid E-mail')
			.normalizeEmail(),
		body('userName').trim().not().isEmpty(),
	],
	auth,
	adminController.putUpdateUser
);

router.delete('/deleteUser/:userId', auth, adminController.deleteUser);

module.exports = router;
