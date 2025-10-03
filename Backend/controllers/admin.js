const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');

const UserModel = require('../models/user');
const TaskModel = require('../models/task');

exports.getUsers = (req, res, next) => {
	let x;
	const page = req.query.page || 1;
	const limit = 12;
	x = page - 1;
	const offset = x * limit;

	UserModel.findAndCountAll({
		offset: offset,
		limit: limit,
		order: [['createdAt', 'DESC']],
	})
		.then((result) => {
			res.json({
				users: result.rows,
				totalUsers: result.count,
				totalPages: Math.ceil(result.count / limit),
				currentPage: page,
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
};

exports.getUser = (req, res, next) => {
	const userId = req.params.userId;

	UserModel.findOne({ where: { id: userId } })
		.then((user) => {
			if (!user) {
				throw new Error('internal Error, no user');
			}
			res.status(200).json({
				userId: userId,
				email: user.email,
				userName: user.userName,
				isAdmin: user.isAdmin,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.putUpdateUser = async (req, res, next) => {
	const userId = req.params.userId;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(409).json({
			massage: 'validation faild',
			erorr: errors,
		});
	}

	const ifUserEmail = await UserModel.findOne({
		where: { email: req.body.email },
	});

	const ifUserName = await UserModel.findOne({
		where: { userName: req.body.userName },
	});

	if (ifUserEmail || ifUserName) {
		res.status(409).json({
			massage: 'username or E-mail is in use',
		});
		throw new Error('userName or Email is in use');
	} else {
		UserModel.findOne({ where: { id: userId } })
			.then((user) => {
				if (!user) {
					throw new Error('Server Error 500');
				}
				console.log(req.body);
				user.email = req.body.email;
				user.userName = req.body.userName;
				user.isAdmin = req.body.isAdmin;
				return user.save();
			})
			.then((result) => {
				res.status(201).json({
					massage: 'changes was success',
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

exports.deleteUser = (req, res, next) => {
	const userId = req.params.userId;

	UserModel.destroy({ where: { id: userId } })
		.then((deleted) => {
			if (!deleted) {
				return res.status(400).json({ massage: 'user deletion has faild' });
			}
			return res.status(200).json({
				massage: 'user was deleted',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getTotalNumbers = (req, res, next) => {
	UserModel.count().then((countedUser) => {
		TaskModel.count().then((countedtask) => {
			res.status(200).json({
				usersNum: countedUser,
				taskNum: countedtask,
			});
		});
	});
};
