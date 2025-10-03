const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userController = require('../controllers/user');
const { body } = require('express-validator');

router.post(
	'/signUp',
	[
		body('email').isEmail().withMessage('enter a valid E-mail'),
		body('userName').trim().not().isEmpty(),
		body('password').trim().isLength({ min: 5 }),
	],
	userController.postSignUp
);

router.post(
	'/login',
	[
		body('userName').trim().not().isEmpty(),
		body('password').trim().isLength({ min: 5 }),
	],
	userController.postLogin
);

router.post('/createTask', auth, userController.postTask);

router.get('/userTask', auth, userController.getTasks);

router.get('/userinfo/:userId', auth, userController.getUserInfo);

router.put('/updateUserData/:userId', auth, userController.putUserData);

router.delete('/deleteTask/:taskId', auth, userController.deleteTask);

module.exports = router;
