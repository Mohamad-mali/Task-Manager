const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');

const multer = require('multer');

const path = require('path');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const sequelize = require('./util/dataBase');

const UserModel = require('./models/user');
const TaskModel = require('./models/task');

TaskModel.belongsTo(UserModel, { onDelete: 'CASCADE', foreignKey: 'userId' });
UserModel.hasMany(TaskModel, { foreignKey: 'userId' });

const CreateAdmin = () => {
	return UserModel.findOne({ where: { userName: 'admin' } }).then((exits) => {
		if (exits) {
			return;
		}
		return bcrypt.hash('admin', 12).then((hashPass) => {
			return UserModel.create({
				userName: 'admin',
				email: 'admin@admin',
				password: hashPass,
				isAdmin: true,
			}).then((result) => {
				console.log('admin was Created');
				console.log('you see this message the first time you run the app ');
			});
		});
	});
};

const app = express();

app.use('/images', express.static('images'));

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const fileType = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

app.use(cors());

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileType }).single('image'));

app.use('/admin', adminRoutes);
app.use('', userRoutes);

sequelize
	.sync({ alter: true })
	.then(() => {
		return CreateAdmin();
	})
	.then(() => {
		console.log('server is live');
		app.listen(3030);
	})
	.catch((err) => {
		console.log(err);
	});
