const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');

const UserModel = require('../models/user');
const TaskModel = require('../models/task');

exports.postSignUp = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const userName = req.body.userName;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(409).json({
			massage: 'validation faild',
			error: errors,
		});
	}

	UserModel.findOne({
		where: { [Op.or]: [{ email: email }, { userName: userName }] },
	}).then((user) => {
		if (user) {
			if (user.email === email) {
				const error = new Error('user allready exits');
				error.httpsCode = 409;
				next(error);
				return res.status(409).json({
					massage: 'This email is allready in our website!',
				});
			} else if (user.userName === userName) {
				res.status(409).json({
					massage: 'This userName is Taken!',
				});
				const error = new Error('user allready exits');
				error.httpsCode = 409;
				return next(error);
			}
		} else {
			bcrypt.hash(password, 12).then((hashedPass) => {
				UserModel.create({
					email: email,
					password: hashedPass,
					userName: userName,
				})
					.then((result) => {
						return res.status(201).json({
							massage: 'user was created',
						});
					})
					.catch((err) => {
						console.log('err');
					});
			});
		}
	});
};

exports.postLogin = (req, res, next) => {
	const userName = req.body.userName;
	const password = req.body.password;

	let loadedUser;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(409).json({
			massage: 'validation faild',
		});
	}

	UserModel.findOne({ where: { userName: userName } })
		.then((user) => {
			if (!user) {
				const error = new Error('no User was foound');
				error.httpsCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Wrong password');
				error.httpsCode = 401;
				throw error;
			}
			const token = jwt.sign(
				{
					userName: loadedUser.userName,
					userId: loadedUser.id,
					isAdmin: loadedUser.isAdmin,
				},
				'thesupperlongtokenthatimgonnaforgetinnotimelove',
				{ expiresIn: '1h' }
			);
			res.status(200).json({
				token: token,
				user: {
					userId: loadedUser.id,
					userName: loadedUser.userName,
					isAdmin: loadedUser.isAdmin,
				},
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.postTask = (req, res, next) => {
	const title = req.title;
	const decription = req.decription;
	const userId = req.userId;

	TaskModel.create({
		title: title,
		decription: decription,
		userId: userId,
	})
		.then((result) => {
			return res.status(201).json({
				massage: 'task added',
			});
		})
		.catch((err) => {
			throw new Error('task cration has been faild');
		});
};

exports.getTasks = (req, res, next) => {
	let x;
	const page = req.query.page || 1;
	const limit = 6;
	x = page - 1;
	const offset = x * limit;
	const userId = req.userId;

	console.log(req.userId);

	TaskModel.findAndCountAll({
		where: { userId },
		offset: offset,
		limit: limit,
		order: [['createdAt', 'DESC']],
	})
		.then((result) => {
			res.json({
				tasks: result.rows,
				totalTasks: result.count,
				totalPages: Math.ceil(result.count / limit),
				currentPage: page,
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
};

exports.postTask = (req, res, next) => {
	const title = req.body.title;
	const decription = req.body.description;
	const userId = req.body.userId;

	TaskModel.create({ title: title, decription: decription, userId: userId })
		.then((result) => {
			res.status(201).json({ massage: 'task created' });
		})
		.catch((err) => console.log(err));
};

exports.deleteTask = (req, res, next) => {
	const taskId = req.params.taskId;

	TaskModel.destroy({ where: { id: taskId } })
		.then((deleted) => {
			if (!deleted) {
				return res.status(400).json({ massage: 'no task was found to delete' });
			}
			return res.status(200).json({
				massage: 'task was deleted',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getUserInfo = (req, res, next) => {
	const userId = req.params.userId;
	UserModel.findOne({ where: { id: userId } })
		.then((user) => {
			if (!user) {
				throw new Error();
			} else {
				res.status(200).json({
					email: user.email,
					userName: user.userName,
					image: user.image,
				});
			}
		})
		.catch((err) => console.log(err));
};

exports.putUserData = (req, res, next) => {
	const userId = req.params.userId;
	let imageUrl;

	const email = req.body.email;
	const newPassword = req.body.newPassword;

	UserModel.findOne({ where: { email: email } }).then((exits) => {
		if (exits) {
			res.status(409).json({
				massage: 'E-mail in use',
			});
			throw new Error('the email is already in use');
		} else {
			UserModel.findOne({ where: { id: userId } }).then((user) => {
				if (!user) {
					throw new Error('ops something went wrong');
				}
				if (!req.file) {
					imageUrl = user.image;
				} else {
					imageUrl = '/' + req.file.path;
				}
				if (!newPassword || newPassword === '') {
					user.email = email;
					user.image = imageUrl;
					res.status(201).json({
						massage: 'success',
					});
					return user.save();
				} else {
					bcrypt
						.hash(newPassword, 12)
						.then((hashed) => {
							user.email = email;
							user.password = hashed;
							user.image = imageUrl;
							return user.save();
						})
						.then(() => {
							return res.status(201).json({
								massage: 'success',
							});
						})
						.catch((err) => {});
				}
			});
		}
	});
};
